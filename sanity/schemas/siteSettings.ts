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
    {
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
    },
  ],
});
