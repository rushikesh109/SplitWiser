import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    const fullName =
      identity.name ||
      `${identity.firstName || ""} ${identity.lastName || ""}`.trim() ||
      "Anonymous";

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (existingUser) {
      if (existingUser.name !== fullName) {
        await ctx.db.patch(existingUser._id, { name: fullName });
      }
      return existingUser._id;
    }

    return await ctx.db.insert("users", {
      name: fullName,
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email,
      imageUrl: identity.pictureUrl,
    });
  },
});

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
});

export const searchUsers = query({
    args:{query:v.string()},
    handler:async(ctx, args) =>{
      const currentUser = await ctx.runQuery(internal.users.getCurrentUser);

      //Dont search if query is too short
      if(args.query.length <2){
        return [];

      }

      // Search by name using search index
      const nameResults =await ctx.db 
      .query("users")
      .withSearchIndex("search_name", (q) => q.search("name", args.query))
      .collect();

      //search by email using search index
      const emailResults = await ctx.db
      .query("users")
      .withSearchIndex("search_email", (q)=> q.search("email", args.query))
      .collect();

      // Combine results (removing duplicates)
      const users = [
        ...nameResults,
        ...emailResults.filter(
          (email) => !nameResults.some((name)=> name._id === email._id)
        ),
      ];

      return users 
      .filter((user)=> user._id !== currentUser._id)
      .map((user)=> ({
        id:user._id,
        name:user.name,
        email:user.email,
        imageUrl: user.imageUrl,
      }))
    },
});
