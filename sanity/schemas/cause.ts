import { defineField, defineType } from "sanity";

export const causeSchema = defineType({
  name: "cause",
  title: "Cause",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Cause Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      description: "One-line description for cards",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      description: "Link to the cause's own website (optional)",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Only active causes appear on the site",
      initialValue: true,
    }),
  ],
});
