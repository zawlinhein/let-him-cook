import { defineField, defineType } from "sanity";

export const recipeType = defineType({
  name: "recipe",
  title: "Recipe",
  type: "document",
  fields: [
    defineField({ name: "author", type: "reference", to: { type: "author" } }),
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(100)
          .warning("Keep titles short and descriptive"),
    },
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) =>
        Rule.max(300).warning("Try to keep the description brief"),
    },
    {
      name: "image",
      title: "Main Image",
      type: "image",
      validation: (Rule) => Rule.required().error("Image is required"),
    },
    {
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) =>
        Rule.required().min(1).error("Add at least one ingredient"),
    },
    {
      name: "instructions",
      title: "Instructions",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) =>
        Rule.required().min(1).error("Add at least one instruction step"),
    },
    {
      name: "time",
      title: "Total Time (minutes)",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(1440)
          .error("Total time must be between 1 and 1440 minutes (24 hours)"),
    },
    {
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: {
        list: ["Easy", "Medium", "Hard"],
        layout: "radio",
      },
      validation: (Rule) => Rule.required().error("Difficulty is required"),
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) =>
        Rule.required().min(0).max(5).error("Rating must be between 0 and 5"),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) =>
        Rule.required().min(1).error("Add at least one tag"),
    },
    {
      name: "servings",
      title: "Servings",
      type: "number",
      validation: (Rule) =>
        Rule.min(1).warning("Servings should be at least 1"),
    },
  ],
});
