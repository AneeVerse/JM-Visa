/**
 * =========================================================================
 * SCRIPT 2: JM VISA VISITOR & PINCODE TRACKING (DEDICATED)
 * =========================================================================
 * 1. Open Google Sheets -> Create new sheet: "JM_Visa_Visitor_Tracking"
 * 2. Go to Extensions -> Apps Script
 * 3. Replace all content in Code.gs with this code.
 * 4. Click "Deploy" -> "New deployment" -> Select "Web app"
 *    - Description: JM Visa Visitor Tracking Webhook
 *    - Execute as: Me (<your-email>)
 *    - Who has access: Anyone
 * 5. Click "Deploy", copy the Web App URL, and paste it into .env.local as:
 *    NEXT_PUBLIC_VISITOR_TRACKING_WEBHOOK_URL="<your-url>"
 * =========================================================================
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Visit Time (IST)",
        "IP Address",
        "Pincode",
        "City",
        "Region / State",
        "Country",
        "Page URL",
        "Referrer",
        "Browser User-Agent"
      ]);
      
      var headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setBackground("#059669");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
    }

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.ip || "Unknown",
      data.pincode || "Unknown",
      data.city || "Unknown",
      data.region || "Unknown",
      data.country || "Unknown",
      data.pageUrl || "",
      data.referrer || "Direct",
      data.userAgent || ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Visitor tracked successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
