import { defineField, defineType } from "sanity";

export const supportRecordSchema = defineType({
  name: "supportRecord",
  title: "Support Archive",
  type: "document",
  fields: [
    defineField({
      name: "recipientName",
      title: "Recipient name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "recipientType",
      title: "Recipient type",
      type: "string",
      options: {
        list: [
          { title: "Charity", value: "charity" },
          { title: "Community group", value: "community-group" },
          { title: "School / Education", value: "education" },
          { title: "Individual", value: "individual" },
          { title: "Health", value: "health" },
          { title: "Youth", value: "youth" },
          { title: "International", value: "international" },
          { title: "Emergency appeal", value: "emergency" },
          { title: "Other", value: "other" },
        ],
      },
      initialValue: "charity",
    }),
    defineField({
      name: "rotaryYear",
      title: "Rotary year",
      type: "string",
      description: "Example: 2025/2026 or 2024/2025",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "note",
      title: "Short note",
      type: "text",
      rows: 3,
      description: "Optional public note. Do not include donation amounts.",
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "relatedImpactStory",
      title: "Related impact story",
      type: "reference",
      to: [{ type: "impactStory" }],
      description: "Optional link to an existing impact story.",
    }),
  ],
  preview: {
    select: {
      title: "recipientName",
      rotaryYear: "rotaryYear",
      type: "recipientType",
    },
    prepare({ title, rotaryYear, type }) {
      return {
        title,
        subtitle: `${rotaryYear ?? "No year"}${
          type ? ` · ${type}` : ""
        }`,
      };
    },
  },
  orderings: [
    {
      title: "Newest first",
      name: "newestFirst",
      by: [
        { field: "rotaryYear", direction: "desc" },
        { field: "recipientName", direction: "asc" },
      ],
    },
  ],
});
