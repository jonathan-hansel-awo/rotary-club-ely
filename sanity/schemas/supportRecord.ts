import { defineField, defineType } from "sanity";

export const supportRecord = defineType({
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
      name: "month",
      title: "Month",
      type: "number",
      description: "Optional. Use 1 for January, 2 for February, etc.",
      validation: (Rule) => Rule.min(1).max(12),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required().min(1900).max(2100),
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
      to: [{ type: "impact" }],
      description: "Optional link to an existing impact story.",
    }),
  ],
  preview: {
    select: {
      title: "recipientName",
      year: "year",
      month: "month",
      type: "recipientType",
    },
    prepare({ title, year, month, type }) {
      return {
        title,
        subtitle: `${month ? `${month}/` : ""}${year ?? "No year"}${
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
        { field: "year", direction: "desc" },
        { field: "month", direction: "desc" },
        { field: "recipientName", direction: "asc" },
      ],
    },
  ],
});
