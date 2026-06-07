import { impactStorySchema } from './impact';
import { eventSchema } from "./event";
import { newsPostSchema } from "./newsPost";
import { pageSchema } from "./page";
import { clubMemberSchema } from "./clubMember";
import { siteSettingsSchema } from "./siteSettings";
import { causeSchema } from "./cause";
import { sponsorSchema } from "./sponsor";

export const schemas = [
  eventSchema,
  newsPostSchema,
  impactStorySchema,
  pageSchema,
  clubMemberSchema,
  siteSettingsSchema,
  causeSchema,
  sponsorSchema,
];
