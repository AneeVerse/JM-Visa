import React, { useState, useCallback } from 'react';
import { Stack, Card, Text, Button, Box, Flex, TextArea } from '@sanity/ui';
import { set, unset } from 'sanity';
import { ClipboardIcon, TrashIcon, EditIcon } from '@sanity/icons';

// Generate unique key for Sanity
function generateKey() {
    return `row_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function TablePasteInput(props) {
    const { value, onChange } = props;
    const [pasteText, setPasteText] = useState('');
    const [showPasteArea, setShowPasteArea] = useState(false);
    const [editingCell, setEditingCell] = useState<{ row: number, col: number } | null>(null);
    const [editValue, setEditValue] = useState('');
    const [parseError, setParseError] = useState<string | null>(null);

    // Parse pasted table data
    const parseTable = useCallback((text: string) => {
        if (!text.trim()) return null;

        setParseError(null);

        try {
            let lines = text.trim().split('\n').map(line => line.trim()).filter(line => line);

            if (lines.length === 0) return null;

            const isMarkdown = lines[0].startsWith('|');
            let delimiter = '\t';

            if (isMarkdown) {
                lines = lines.filter(line => {
                    const cleaned = line.replace(/\|/g, '').trim();
                    return !(/^[-–—\s]+$/.test(cleaned));
                });
                delimiter = '|';
            } else if (lines[0].includes('\t')) {
                delimiter = '\t';
            } else if (lines[0].includes(',')) {
                delimiter = ',';
            }

            const rows = lines.map((line) => {
                let cells: string[];

                if (delimiter === '|') {
                    cells = line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
                } else {
                    cells = line.split(delimiter).map(cell => cell.trim());
                }

                return {
                    _key: generateKey(),
                    cells
                };
            });

            const validRows = rows.filter(row => row.cells.length > 0);

            if (validRows.length === 0) {
                setParseError('No valid rows found in the pasted data');
                return null;
            }

            const maxColumns = Math.max(...validRows.map(row => row.cells.length));
            const normalizedRows = validRows.map(row => ({
                _key: row._key,
                cells: [
                    ...row.cells,
                    ...Array(maxColumns - row.cells.length).fill('')
                ]
            }));

            return {
                _type: 'table',
                rows: normalizedRows
            };
        } catch (error) {
            console.error('Error parsing table:', error);
            setParseError('Failed to parse table. Please check the format.');
            return null;
        }
    }, []);

    const handlePaste = useCallback(() => {
        const parsedTable = parseTable(pasteText);

        if (parsedTable) {
            onChange(set(parsedTable));
            setPasteText('');
            setShowPasteArea(false);
            setParseError(null);
        }
    }, [pasteText, parseTable, onChange]);

    const handleClear = useCallback(() => {
        onChange(unset());
    }, [onChange]);

    const handleQuickPaste = useCallback(async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            const parsedTable = parseTable(clipboardText);

            if (parsedTable) {
                onChange(set(parsedTable));
                setParseError(null);
            } else {
                setPasteText(clipboardText);
                setShowPasteArea(true);
            }
        } catch (err) {
            console.error('Failed to read clipboard:', err);
            setPasteText('');
            setShowPasteArea(true);
        }
    }, [parseTable, onChange]);

    const handleCellClick = useCallback((rowIdx: number, colIdx: number, currentValue: string) => {
        setEditingCell({ row: rowIdx, col: colIdx });
        setEditValue(currentValue);
    }, []);

    const handleCellSave = useCallback(() => {
        if (!editingCell || !value) return;

        const newRows = [...value.rows];
        newRows[editingCell.row].cells[editingCell.col] = editValue;

        onChange(set({
            _type: 'table',
            ...value,
            rows: newRows
        }));
        setEditingCell(null);
        setEditValue('');
    }, [editingCell, editValue, value, onChange]);

    const handleCellCancel = useCallback(() => {
        setEditingCell(null);
        setEditValue('');
    }, []);

    const handleAddRow = useCallback(() => {
        if (!value || !value.rows || value.rows.length === 0) return;

        const columnCount = value.rows[0].cells.length;
        const newRow = {
            _key: generateKey(),
            cells: Array(columnCount).fill('')
        };

        onChange(set({
            _type: 'table',
            ...value,
            rows: [...value.rows, newRow]
        }));
    }, [value, onChange]);

    const handleDeleteRow = useCallback((rowIdx: number) => {
        if (!value || !value.rows) return;

        const newRows = value.rows.filter((_, idx) => idx !== rowIdx);

        if (newRows.length === 0) {
            onChange(unset());
        } else {
            onChange(set({
                _type: 'table',
                ...value,
                rows: newRows
            }));
        }
    }, [value, onChange]);

    const handleFixKeys = useCallback(() => {
        if (!value || !value.rows) return;

        const fixedRows = value.rows.map(row => ({
            ...row,
            _key: row._key || generateKey()
        }));

        onChange(set({
            _type: 'table',
            ...value,
            rows: fixedRows
        }));
    }, [value, onChange]);

    const hasMissingKeys = value?.rows?.some(row => !row._key) || !value?._type;

    return (
        <Stack space={3}>
            {hasMissingKeys && (
                <Card padding={3} tone="caution" radius={2}>
                    <Flex align="center" justify="space-between">
                        <Text size={1}>⚠️ Table has validation issues (missing keys or type)</Text>
                        <Button
                            text="Fix Table Issues"
                            tone="primary"
                            onClick={handleFixKeys}
                            fontSize={1}
                        />
                    </Flex>
                </Card>
            )}

            <Flex gap={2} wrap="wrap">
                <Button
                    icon={ClipboardIcon}
                    text="Quick Paste from Clipboard"
                    tone="primary"
                    onClick={handleQuickPaste}
                    mode="default"
                />
                {value && (
                    <>
                        <Button
                            icon={EditIcon}
                            text="Add Row"
                            tone="positive"
                            onClick={handleAddRow}
                            mode="ghost"
                        />
                        <Button
                            icon={TrashIcon}
                            text="Clear Table"
                            tone="critical"
                            onClick={handleClear}
                            mode="ghost"
                        />
                    </>
                )}
                <Button
                    text={showPasteArea ? "Hide Paste Area" : "Manual Paste"}
                    onClick={() => setShowPasteArea(!showPasteArea)}
                    mode="ghost"
                />
            </Flex>

            {parseError && (
                <Card padding={3} tone="critical" radius={2}>
                    <Text size={1}>⚠️ {parseError}</Text>
                </Card>
            )}

            {showPasteArea && (
                <Card padding={3} tone="primary" radius={2}>
                    <Stack space={3}>
                        <Text size={1} weight="semibold">
                            📋 Paste Your Table Data
                        </Text>
                        <Text size={1} muted>
                            Supports: Markdown tables (| ... |), Tab-separated, Comma-separated (CSV)
                        </Text>
                        <TextArea
                            value={pasteText}
                            onChange={(e) => setPasteText(e.currentTarget.value)}
                            placeholder="Paste table here...

Example Markdown:
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |

Or tab/comma-separated data"
                            rows={10}
                            style={{ fontFamily: 'monospace', fontSize: '12px' }}
                        />
                        <Flex gap={2}>
                            <Button
                                text="Parse & Insert Table"
                                tone="positive"
                                onClick={handlePaste}
                                disabled={!pasteText.trim()}
                            />
                            <Button
                                text="Cancel"
                                mode="ghost"
                                onClick={() => {
                                    setShowPasteArea(false);
                                    setPasteText('');
                                    setParseError(null);
                                }}
                            />
                        </Flex>
                    </Stack>
                </Card>
            )}

            {value && value.rows && value.rows.length > 0 && (
                <Card padding={3} radius={2} tone="transparent" border>
                    <Stack space={2}>
                        <Flex justify="space-between" align="center">
                            <Text size={1} weight="semibold">
                                ✓ Table Ready ({value.rows.length} rows × {value.rows[0]?.cells?.length || 0} columns)
                            </Text>
                            <Text size={1} muted>
                                Click any cell to edit
                            </Text>
                        </Flex>

                        <Box style={{ overflowX: 'auto' }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                fontSize: '13px',
                            }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#2276fc', color: 'white' }}>
                                        {value.rows[0]?.cells?.map((cell: string, idx: number) => (
                                            <th
                                                key={idx}
                                                style={{
                                                    padding: '10px',
                                                    border: '1px solid #1d4ed8',
                                                    textAlign: 'left',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleCellClick(0, idx, cell)}
                                            >
                                                {editingCell?.row === 0 && editingCell?.col === idx ? (
                                                    <div style={{ display: 'flex', gap: '4px' }}>
                                                        <input
                                                            type="text"
                                                            value={editValue}
                                                            onChange={(e) => setEditValue(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') handleCellSave();
                                                                if (e.key === 'Escape') handleCellCancel();
                                                            }}
                                                            autoFocus
                                                            style={{
                                                                flex: 1,
                                                                padding: '6px',
                                                                border: '2px solid #fbbf24',
                                                                borderRadius: '4px',
                                                                fontSize: '13px',
                                                            }}
                                                        />
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleCellSave();
                                                            }}
                                                            style={{
                                                                padding: '4px 10px',
                                                                background: '#10b981',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '4px',
                                                                cursor: 'pointer',
                                                                fontSize: '12px',
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            ✓
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleCellCancel();
                                                            }}
                                                            style={{
                                                                padding: '4px 10px',
                                                                background: '#ef4444',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '4px',
                                                                cursor: 'pointer',
                                                                fontSize: '12px',
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            ✗
                                                        </button>
                                                    </div>
                                                ) : (
                                                    cell || '(empty)'
                                                )}
                                            </th>
                                        ))}
                                        <th style={{ padding: '10px', border: '1px solid #1d4ed8', width: '70px', textAlign: 'center' }}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {value.rows.slice(1).map((row: any, rowIdx: number) => (
                                        <tr key={row._key || rowIdx} style={{ backgroundColor: rowIdx % 2 === 0 ? '#f9fafb' : 'white' }}>
                                            {row.cells?.map((cell: string, cellIdx: number) => (
                                                <td
                                                    key={cellIdx}
                                                    style={{
                                                        padding: '10px',
                                                        border: '1px solid #e5e7eb',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => handleCellClick(rowIdx + 1, cellIdx, cell)}
                                                >
                                                    {editingCell?.row === rowIdx + 1 && editingCell?.col === cellIdx ? (
                                                        <div style={{ display: 'flex', gap: '4px' }}>
                                                            <input
                                                                type="text"
                                                                value={editValue}
                                                                onChange={(e) => setEditValue(e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') handleCellSave();
                                                                    if (e.key === 'Escape') handleCellCancel();
                                                                }}
                                                                autoFocus
                                                                style={{
                                                                    flex: 1,
                                                                    padding: '6px',
                                                                    border: '2px solid #2276fc',
                                                                    borderRadius: '4px',
                                                                    fontSize: '13px',
                                                                }}
                                                            />
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleCellSave();
                                                                }}
                                                                style={{
                                                                    padding: '4px 10px',
                                                                    background: '#10b981',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: '4px',
                                                                    cursor: 'pointer',
                                                                    fontSize: '12px',
                                                                    fontWeight: 'bold',
                                                                }}
                                                            >
                                                                ✓
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleCellCancel();
                                                                }}
                                                                style={{
                                                                    padding: '4px 10px',
                                                                    background: '#ef4444',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: '4px',
                                                                    cursor: 'pointer',
                                                                    fontSize: '12px',
                                                                    fontWeight: 'bold',
                                                                }}
                                                            >
                                                                ✗
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        cell || '(empty)'
                                                    )}
                                                </td>
                                            ))}
                                            <td style={{ padding: '10px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                                                <button
                                                    onClick={() => handleDeleteRow(rowIdx + 1)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: '#fee2e2',
                                                        color: '#dc2626',
                                                        border: '1px solid #fecaca',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                        fontWeight: 'bold',
                                                    }}
                                                    title="Delete this row"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Box>
                    </Stack>
                </Card>
            )}
        </Stack>
    );
}
