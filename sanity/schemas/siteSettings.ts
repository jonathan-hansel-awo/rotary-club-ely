import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "clubName",
      title: "Club Name",
      type: "string",
      initialValue: "Rotary Club of Ely",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "meetingDay",
      title: "Meeting Day",
      type: "string",
      description: "e.g. 'Every Thursday'",
    }),
    defineField({
      name: "meetingTime",
      title: "Meeting Time",
      type: "string",
      description: "e.g. '7:00 PM'",
    }),
    defineField({
      name: "meetingLocation",
      title: "Meeting Location",
      type: "string",
      description: "Venue name and address",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
            }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        },
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "string",
      description: "Copyright or additional footer content",
    }),
    defineField({
      name: "heroImages",
      title: "Hero Images",
      type: "array",
      description:
        "Images that cycle in the homepage hero. Add 2–5 for best effect.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption (optional)",
              description: 'Short label shown on the card e.g. "Aquafest 2024"',
            },
          ],
        },
      ],
    }),
    defineField({
      name: "activityTiles",
      title: "Activity Tiles",
      type: "array",
      description:
        "The four activity tiles shown on the homepage grid. Recommended: 4 tiles.",
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: "object",
          title: "Activity Tile",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "href",
              title: "Link",
              type: "string",
              description: "Internal path e.g. /events or /impact",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "badge",
              title: "Badge Text",
              type: "string",
              description: 'Short label e.g. "Annual Event", "Year Round"',
            },
            {
              name: "image",
              title: "Background Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  title: "Alt text",
                  type: "string",
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "description",
              media: "image",
            },
          },
        },
      ],
    }),
  ],
});
