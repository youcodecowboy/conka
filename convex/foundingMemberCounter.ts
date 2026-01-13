import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get the current founding member counter
export const getCounter = query({
  args: {},
  handler: async (ctx) => {
    // Get the single counter document (should only be one)
    const counter = await ctx.db.query("foundingMemberCounter").first();

    // If no counter exists, return default values
    if (!counter) {
      return {
        totalLimit: 200,
        spotsTaken: 42,
        spotsRemaining: 158,
        updatedAt: Date.now(),
      };
    }

    const spotsRemaining = counter.totalLimit - counter.spotsTaken;

    return {
      totalLimit: counter.totalLimit,
      spotsTaken: counter.spotsTaken,
      spotsRemaining: Math.max(0, spotsRemaining),
      updatedAt: counter.updatedAt,
    };
  },
});

// Initialize the counter (run once to set initial value)
export const initializeCounter = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if counter already exists
    const existing = await ctx.db.query("foundingMemberCounter").first();

    if (existing) {
      return {
        success: false,
        message: "Counter already initialized",
        id: existing._id,
      };
    }

    // Create initial counter with 42 spots taken
    const id = await ctx.db.insert("foundingMemberCounter", {
      totalLimit: 200,
      spotsTaken: 42,
      updatedAt: Date.now(),
    });

    return {
      success: true,
      message: "Counter initialized with 42 spots taken (158 remaining)",
      id,
    };
  },
});

// Update the counter (admin only - for manual updates)
export const updateCounter = mutation({
  args: {
    spotsTaken: v.number(),
    totalLimit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Get existing counter
    const counter = await ctx.db.query("foundingMemberCounter").first();

    if (counter) {
      // Update existing counter
      const updateData: { spotsTaken: number; updatedAt: number; totalLimit?: number } = {
        spotsTaken: args.spotsTaken,
        updatedAt: Date.now(),
      };
      if (args.totalLimit !== undefined) {
        updateData.totalLimit = args.totalLimit;
      }
      await ctx.db.patch(counter._id, updateData);
      return counter._id;
    } else {
      // Create new counter with default limit
      const id = await ctx.db.insert("foundingMemberCounter", {
        totalLimit: args.totalLimit ?? 200,
        spotsTaken: args.spotsTaken,
        updatedAt: Date.now(),
      });
      return id;
    }
  },
});
