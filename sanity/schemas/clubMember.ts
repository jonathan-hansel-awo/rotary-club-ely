import { defineField, defineType } from "sanity";

export const clubMemberSchema = defineType({
  name: "clubMember",
  title: "Club Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "e.g. 'President', 'Secretary'",
    }),
    defineField({
      name: "photo",
      title: "Photo",
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
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 3,
      description: "Short biography",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
});
