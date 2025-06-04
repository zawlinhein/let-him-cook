import { type SchemaTypeDefinition } from "sanity";

import { authorType } from "./authorType";
import { recipeType } from "./recipeType";
import { recipeRating } from "./recipeRating";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authorType, recipeType, recipeRating],
};
