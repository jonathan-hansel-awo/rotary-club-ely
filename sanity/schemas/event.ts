import { defineField, defineType } from "sanity";

export const eventSchema = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateStart",
      title: "Exact Start Date & Time",
      type: "datetime",
      description:
        "Use this only when the exact day/time is known. Leave blank for events advertised by month/season, e.g. December 2026.",
    }),
    defineField({
      name: "dateEnd",
      title: "Exact End Date & Time",
      type: "datetime",
      description: "Optional.",
    }),
    defineField({
      name: "dateLabel",
      title: "Public Date Label",
      type: "string",
      description:
        "Shown on the website. Examples: 'Sunday 6 July 2026', 'December 2026', 'Date to be confirmed'. Required if exact date is blank.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { dateStart?: string };
          if (!parent?.dateStart && !value) {
            return "Add a public date label when no exact start date is set.";
          }
          return true;
        }),
    }),
    defineField({
      name: "eventStatus",
      title: "Event Status",
      type: "string",
      description:
        "Use this to keep approximate-date events visible as upcoming or past.",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Past", value: "past" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Aquafest", value: "aquafest" },
          { title: "Fireworks", value: "fireworks" },
          { title: "Community", value: "community" },
          { title: "Social", value: "social" },
          { title: "Fundraising", value: "fundraising" },
          { title: "Other", value: "other" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
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
      name: "gallery",
      title: "Photo Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
    }),
    defineField({
      name: "sponsors",
      title: "Sponsors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "sponsor" }] }],
    }),
  ],
  orderings: [
    {
      title: "Exact Date",
      name: "dateAsc",
      by: [{ field: "dateStart", direction: "asc" }],
    },
  ],
});
