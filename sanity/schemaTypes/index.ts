import { type SchemaTypeDefinition } from "sanity";

import { postType } from "./postType";
import { authorType } from "./authorType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, authorType],
};
