import { defineType, defineField } from "sanity";

export const recipeRating = defineType({
  name: "recipeRating",
  title: "Recipe Rating",
  type: "document",
  fields: [
    defineField({
      name: "recipe",
      type: "reference",
      to: [{ type: "recipe" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "user",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      type: "number",
      validation: (Rule) =>
        Rule.required().min(0).max(5).error("Rating must be between 0 and 5"),
    }),
  ],
});
