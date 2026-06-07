import { defineField, defineType } from "sanity";

export const newsPostSchema = defineType({
  name: "newsPost",
  title: "News & Announcement",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "settings", title: "Settings" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "The public headline for this update.",
      validation: (Rule) => Rule.required().min(8).max(90),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      description: "Auto-generated URL path. Click Generate after entering the title.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short Summary",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "A short teaser shown on cards, previews and social snippets. Aim for one warm, useful sentence.",
      validation: (Rule) => Rule.required().min(40).max(180),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "settings",
      initialValue: "news",
      options: {
        layout: "radio",
        list: [
          { title: "News", value: "news" },
          { title: "Announcement", value: "announcement" },
          { title: "Event", value: "event" },
          { title: "Community Story", value: "community-story" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "settings",
      description: "Controls ordering across the website.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      description: "The full content of this post.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) =>
                      Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      group: "media",
      description: "Main image used on cards and the post page.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the image for accessibility.",
          validation: (Rule) => Rule.required().min(10).max(160),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Optional Gallery",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) => Rule.required().min(10).max(160),
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Feature on Homepage",
      type: "boolean",
      group: "settings",
      description: "Use as the large lead story in homepage/news layouts.",
      initialValue: false,
    }),
    defineField({
      name: "pinned",
      title: "Pinned Announcement",
      type: "boolean",
      group: "settings",
      description: "Keep this visible near the top for important announcements.",
      initialValue: false,
    }),
    defineField({
      name: "ctaLabel",
      title: "Call-to-action Label",
      type: "string",
      group: "settings",
      description: "Optional button text, e.g. Register interest, Join us, Learn more.",
    }),
    defineField({
      name: "ctaUrl",
      title: "Call-to-action URL",
      type: "url",
      group: "settings",
      hidden: ({ document }) => !document?.ctaLabel,
      validation: (Rule) => Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "excerpt",
      media: "image",
      category: "category",
      publishedAt: "publishedAt",
    },
    prepare({ title, subtitle, media, category, publishedAt }) {
      const date = publishedAt
        ? new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }).format(new Date(publishedAt))
        : "No date";

      return {
        title,
        subtitle: `${category ?? "news"} • ${date}${subtitle ? ` • ${subtitle}` : ""}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Published date, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
