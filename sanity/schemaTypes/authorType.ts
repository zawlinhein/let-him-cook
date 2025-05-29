import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "familyName", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "image", type: "url" }),
  ],
});
