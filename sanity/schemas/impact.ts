import { defineField, defineType } from "sanity";

export const impactStorySchema = defineType({
  name: "impactStory",
  title: "Impact Story",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Story Title",
      type: "string",
      description: "Public-facing title of the impact story",
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
      name: "recipient",
      title: "Organisation / Cause",
      type: "string",
      description:
        "Name of the charity, school, group, or initiative supported",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "When this support or activity took place",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Impact Category",
      type: "string",
      options: {
        list: [
          { title: "Community", value: "community" },
          { title: "Youth", value: "youth" },
          { title: "Health", value: "health" },
          { title: "Education", value: "education" },
          { title: "International", value: "international" },
          { title: "Environment", value: "environment" },
        ],
      },
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      description: "One-line description for cards and listing pages",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "story",
      title: "Impact Story",
      type: "array",
      description:
        "The full story: what was done, who benefited, and why it mattered",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Optional Quote",
      type: "text",
      description:
        "A short quote from the organisation, beneficiary, or Rotary member",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Photo related to the cause, event, or handover",
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
