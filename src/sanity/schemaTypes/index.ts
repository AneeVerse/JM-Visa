import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
// import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {tableOfContentsType} from './tableOfContentsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, postType, authorType, tableOfContentsType],
}
