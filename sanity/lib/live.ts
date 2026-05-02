import { defineLive } from "next-sanity/live";
import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";

const live = defineLive({
  client,
  serverToken: false,
  browserToken: false,
});

export async function sanityFetch<T = unknown>(
  options: Parameters<typeof live.sanityFetch>[0]
): Promise<{ data: T | null }> {
  if (!isSanityConfigured) {
    return { data: null };
  }
  try {
    return await live.sanityFetch(options) as { data: T | null };
  } catch (error) {
    console.warn("Sanity fetch failed, returning empty data:", error);
    return { data: null };
  }
}

export const SanityLive = isSanityConfigured ? live.SanityLive : () => null;
