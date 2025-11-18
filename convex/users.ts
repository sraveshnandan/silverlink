import { mutation } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    //checking the user auth state
    if (!identity) {
      throw new Error("Called store without authentication present");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .unique();

    if (user !== null) {
      await ctx.db.patch(user?._id, {
        first_name: identity.givenName!,
        last_name: identity.familyName!,
        email: identity.email!,
        token_identifier: identity.tokenIdentifier,
        image: identity.pictureUrl,
        isVerified: true,
      });
      return user._id;
    }

    return await ctx.db.insert("users", {
      first_name: identity.givenName!,
      last_name: identity.familyName!,
      email: identity.email!,
      token_identifier: identity.tokenIdentifier,
      image: identity.pictureUrl,
      isVerified: true,
    });
  },
});
