import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Submit a contest entry
export const submitEntry = mutation({
  args: {
    contestId: v.string(),
    email: v.string(),
    userAgent: v.optional(v.string()),
    referrer: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if email already exists for this contest
    const existing = await ctx.db
      .query("winEntries")
      .withIndex("by_email_contest", (q) =>
        q.eq("email", args.email).eq("contestId", args.contestId),
      )
      .first();

    if (existing) {
      // Return duplicate status (don't throw, let component handle it)
      return { success: false, duplicate: true, id: existing._id };
    }

    // Insert new entry
    const id = await ctx.db.insert("winEntries", {
      contestId: args.contestId,
      email: args.email,
      submittedAt: Date.now(),
      userAgent: args.userAgent,
      referrer: args.referrer,
    });

    return { success: true, duplicate: false, id };
  },
});

// Get total count of entries for a contest
export const getTotalCount = query({
  args: {
    contestId: v.string(),
  },
  handler: async (ctx, args) => {
    const entries = await ctx.db
      .query("winEntries")
      .withIndex("by_contest", (q) => q.eq("contestId", args.contestId))
      .collect();

    return entries.length;
  },
});

// Check if email already exists for a contest
export const checkEmailExists = query({
  args: {
    contestId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Validate inputs
      if (!args.email || !args.contestId) {
        return false;
      }

      const existing = await ctx.db
        .query("winEntries")
        .withIndex("by_email_contest", (q) =>
          q.eq("email", args.email).eq("contestId", args.contestId),
        )
        .first();

      return existing !== null;
    } catch (error) {
      // Return false on error instead of throwing
      console.error("[checkEmailExists] Error:", error);
      return false;
    }
  },
});

// Get all entries for a contest (for admin dashboard)
export const getEntries = query({
  args: {
    contestId: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 100;
    const entries = await ctx.db
      .query("winEntries")
      .withIndex("by_contest", (q) => q.eq("contestId", args.contestId))
      .order("desc")
      .take(limit);

    return entries;
  },
});

// Get referrer distribution for campaign analytics
export const getReferrerDistribution = query({
  args: {
    contestId: v.string(),
  },
  handler: async (ctx, args) => {
    const entries = await ctx.db
      .query("winEntries")
      .withIndex("by_contest", (q) => q.eq("contestId", args.contestId))
      .collect();

    const distribution: Record<string, number> = {};

    for (const entry of entries) {
      const referrer = entry.referrer || "direct";
      distribution[referrer] = (distribution[referrer] || 0) + 1;
    }

    return distribution;
  },
});

// Get aggregate stats for a contest
export const getContestStats = query({
  args: {
    contestId: v.string(),
  },
  handler: async (ctx, args) => {
    const entries = await ctx.db
      .query("winEntries")
      .withIndex("by_contest", (q) => q.eq("contestId", args.contestId))
      .collect();

    // Calculate referrer distribution
    const referrerDistribution: Record<string, number> = {};
    for (const entry of entries) {
      const referrer = entry.referrer || "direct";
      referrerDistribution[referrer] =
        (referrerDistribution[referrer] || 0) + 1;
    }

    // Get recent entries (last 24 hours)
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recentEntries = entries.filter(
      (entry) => entry.submittedAt > oneDayAgo,
    ).length;

    return {
      totalEntries: entries.length,
      referrerDistribution,
      recentEntries24h: recentEntries,
    };
  },
});
