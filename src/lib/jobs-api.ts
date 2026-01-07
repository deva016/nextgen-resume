/**
 * API-Ninjas Jobs API Client
 * 
 * Provides job search functionality using API-Ninjas
 * Includes caching, error handling, and data normalization
 */

// Types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string | null;
  postedDate: Date;
  contractType: string;
  url: string;
  category?: string;
}

export interface SearchOptions {
  location?: string;
  page?: number;
  resultsPerPage?: number;
  maxDays?: number;
  minSalary?: number;
  maxSalary?: number;
  contractType?: "full_time" | "part_time" | "contract";
  category?: string;
  countryCode?: string;
}

// Simple in-memory cache
interface CacheEntry {
  data: Job[];
  timestamp: number;
  count: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

/**
 * Search for jobs using API-Ninjas Jobs API
 */
export async function searchJobs(
  keywords: string[],
  options: SearchOptions = {}
): Promise<{ jobs: Job[]; totalCount: number }> {
  try {
    // Build cache key
    const cacheKey = JSON.stringify({ keywords, options });
    
    // Check cache
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log("Using cached job results");
      return { jobs: cached.data, totalCount: cached.count };
    }

    // Get API key
    const apiKey = process.env.API_NINJAS_KEY?.trim();
    if (!apiKey) {
      throw new Error("API-Ninjas key not configured. Please set API_NINJAS_KEY environment variable.");
    }

    // Build search query
    const query = keywords.join(" ").replace(/\s+/g, " ").trim() || "jobs";
    
    // Build API request URL params
    const params = new URLSearchParams();
    params.set("query", query);
    
    if (options.location) {
      params.set("location", options.location.trim());
    }

    const url = `https://api.api-ninjas.com/v1/jobs?${params}`;
    
    console.log("Calling API-Ninjas Jobs API:", url.replace(apiKey, "KEY_HIDDEN"));

    // Make API request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API-Ninjas error:", errorText);
      throw new Error(`API-Ninjas error ${response.status}: ${errorText.slice(0, 200)}`);
    }

    const data = await response.json();

    // API-Ninjas returns an array of jobs directly
    if (!Array.isArray(data)) {
      throw new Error("API-Ninjas returned unexpected format");
    }

    // Normalize and filter jobs
    const jobs = data
      .map(normalizeJobData)
      .filter((job): job is Job => job !== null)
      .slice(0, options.resultsPerPage || 20);

    // Cache results
    cache.set(cacheKey, {
      data: jobs,
      timestamp: Date.now(),
      count: jobs.length,
    });

    return {
      jobs,
      totalCount: jobs.length,
    };
  } catch (error) {
    console.error("Job search error:", error);
    throw error;
  }
}

/**
 * Normalize API-Ninjas job data to our format
 */
interface APINinjasJob {
  title?: string;
  company?: string;
  location?: string;
  description?: string;
  salary?: string;
  date_posted?: string;
  employment_type?: string;
  url?: string;
}

function normalizeJobData(job: APINinjasJob): Job | null {
  try {
    if (!job.title || !job.company) {
      return null; // Skip jobs without basic info
    }

    return {
      id: `${job.company}_${job.title}_${Date.now()}`.replace(/\s+/g, "_"),
      title: job.title,
      company: job.company,
      location: job.location || "Remote",
      description: job.description || "No description available",
      salary: job.salary || null,
      postedDate: job.date_posted ? new Date(job.date_posted) : new Date(),
      contractType: job.employment_type || "Not specified",
      url: job.url || "#",
      category: undefined,
    };
  } catch (error) {
    console.error("Error normalizing job data:", error);
    return null;
  }
}

/**
 * Clear job search cache
 */
export function clearJobCache(): void {
  cache.clear();
}

/**
 * Extract keywords from text
 */
export function extractKeywordsFromText(text: string): string[] {
  // Remove common words and extract meaningful keywords
  const commonWords = new Set([
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "up", "about", "into", "through", "during",
    "is", "are", "was", "were", "be", "been", "being", "have", "has", "had",
    "will", "would", "should", "could", "can", "may", "might", "must",
    // HTML tags often left in text
    "p", "li", "ul", "ol", "br", "div", "span", "strong", "em", "b", "i", "u",
  ]);

  // Strip HTML tags
  const plainText = text.replace(/<[^>]*>/g, " ");

  const words = plainText
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !commonWords.has(word));

  // Return unique keywords
  return Array.from(new Set(words));
}
