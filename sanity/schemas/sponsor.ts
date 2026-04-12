import { defineField, defineType } from "sanity";

export const sponsorSchema = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Sponsor Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Sponsor logo — ideally SVG or high-res PNG",
      options: { hotspot: false },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "websiteUrl",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
});
