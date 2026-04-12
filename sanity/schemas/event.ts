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
      description: "The name of the event e.g. 'Ely Aquafest 2026'",
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
      name: "dateStart",
      title: "Start Date & Time",
      type: "datetime",
      description: "When the event begins",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateEnd",
      title: "End Date & Time",
      type: "datetime",
      description: "When the event ends (optional for single-day events)",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Venue or area name e.g. 'Riverside, Ely'",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "The type of event",
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
      description: "Full event description with formatting",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description: "Main event image. Recommended size: 1600x900px",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the image for screen readers",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Photo Gallery",
      type: "array",
      description: "Additional event photos",
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
      description: "Pin this event to the homepage",
      initialValue: false,
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      description: "Link to an external event website e.g. Aquafest website",
    }),
    defineField({
      name: "sponsors",
      title: "Sponsors",
      type: "array",
      description: "Sponsors associated with this event",
      of: [{ type: "reference", to: [{ type: "sponsor" }] }],
    }),
  ],
  orderings: [
    {
      title: "Date (Newest First)",
      name: "dateDesc",
      by: [{ field: "dateStart", direction: "desc" }],
    },
  ],
});
