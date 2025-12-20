import { cache } from "react";

export type SubscriptionLevel = "free" | "pro" | "pro_plus";

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    // Stripe integration removed - all users are on free tier
    return "free";
  },
);
