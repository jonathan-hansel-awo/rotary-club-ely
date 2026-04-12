import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemas } from "./schemas";

export default defineConfig({
  name: "rotary-club-ely",
  title: "Rotary Club of Ely",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Events")
              .child(S.documentTypeList("event").title("Events")),
            S.listItem()
              .title("Latest")
              .child(S.documentTypeList("newsPost").title("News Posts")),
            S.listItem()
              .title("Our Impact")
              .child(S.documentTypeList("contribution").title("Contributions")),
            S.listItem()
              .title("Our Causes")
              .child(S.documentTypeList("cause").title("Causes")),
            S.listItem()
              .title("Pages")
              .child(S.documentTypeList("page").title("Pages")),
            S.listItem()
              .title("Members")
              .child(S.documentTypeList("clubMember").title("Club Members")),
            S.listItem()
              .title("Sponsors")
              .child(S.documentTypeList("sponsor").title("Sponsors")),
            S.divider(),
            S.listItem()
              .title("Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemas },
});
