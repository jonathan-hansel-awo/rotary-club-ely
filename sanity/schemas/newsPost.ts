import { defineField, defineType } from "sanity";

export const newsPostSchema = defineType({
  name: "newsPost",
  title: "News Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The headline of this news post",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Auto-generated URL path. Click Generate.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Publication Date",
      type: "date",
      description: "When this post was published",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      description: "The full content of this post",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Optional accompanying image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "pinned",
      title: "Pinned",
      type: "boolean",
      description: "Show this post at the top of the list and on the homepage",
      initialValue: false,
    }),
  ],
});
