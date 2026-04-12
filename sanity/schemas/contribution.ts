import { defineField, defineType } from "sanity";

export const contributionSchema = defineType({
  name: "contribution",
  title: "Charitable Contribution",
  type: "document",
  fields: [
    defineField({
      name: "recipient",
      title: "Recipient",
      type: "string",
      description: "Name of the cause, charity, or initiative supported",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Auto-generated URL path. Click Generate.",
      options: { source: "recipient", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "When this contribution was made",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "amount",
      title: "Amount",
      type: "string",
      description: "e.g. '£2,000' or '50 volunteer hours'",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      description: "One-line description for listing pages",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      description: "Full story of the contribution and its impact",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Photo related to the cause or handover",
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
  ],
});
