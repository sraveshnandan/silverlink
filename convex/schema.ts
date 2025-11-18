import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    first_name: v.string(),
    last_name: v.string(),
    email: v.string(),
    password: v.optional(v.string()),
    image: v.optional(v.string()),
    role: v.optional(v.string()),
    isVerified: v.optional(v.boolean()),
    token_identifier: v.optional(v.string()),
  }).index("by_email", ["email"]),
});
