/**
 * Adzuna Job Search API Client
 * 
 * Provides job search functionality using Adzuna API
 * Includes caching, error handling, and data normalization
 */

// Types
export interface AdzunaJob {
  id: string;
  title: string;
  company: {
    display_name: string;
  };
  location: {
    display_name: string;
    area: string[];
  };
  description: string;
  created: string;
  salary_min?: number;
  salary_max?: number;
  salary_is_predicted?: string;
  contract_type?: string;
  redirect_url: string;
  category?: {
    label: string;
    tag: string;
  };
}

export interface AdzunaResponse {
  results: AdzunaJob[];
  count: number;
  mean?: number;
}

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
  maxDays?: number; // Only show jobs posted in last X days
  minSalary?: number;
  maxSalary?: number;
  contractType?: "full_time" | "part_time" | "contract";
  category?: string;
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
 * Build Adzuna API URL
 */
function buildAdzunaUrl(
  endpoint: string,
  params: Record<string, string | number>
): string {
  const baseUrl = "https://api.adzuna.com/v1/api/jobs";
  const country = "us"; // Can be made configurable
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    throw new Error("Adzuna API credentials not configured");
  }

  const queryParams = new URLSearchParams({
    app_id: appId,
    app_key: appKey,
    ...Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ),
  });

  return `${baseUrl}/${country}/${endpoint}?${queryParams}`;
}

/**
 * Normalize Adzuna job data to our format
 */
export function normalizeJobData(adzunaJob: AdzunaJob): Job {
  // Format salary
  let salary: string | null = null;
  if (adzunaJob.salary_min && adzunaJob.salary_max) {
    const min = Math.round(adzunaJob.salary_min);
    const max = Math.round(adzunaJob.salary_max);
    salary = `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    
    if (adzunaJob.salary_is_predicted === "1") {
      salary += " (estimated)";
    }
  } else if (adzunaJob.salary_min) {
    salary = `$${Math.round(adzunaJob.salary_min).toLocaleString()}+`;
  }

  return {
    id: adzunaJob.id,
    title: adzunaJob.title,
    company: adzunaJob.company.display_name,
    location: adzunaJob.location.display_name,
    description: adzunaJob.description,
    salary,
    postedDate: new Date(adzunaJob.created),
    contractType: adzunaJob.contract_type || "Not specified",
    url: adzunaJob.redirect_url,
    category: adzunaJob.category?.label,
  };
}

/**
 * Search for jobs using Adzuna API
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

    // Build search query
    const query = keywords.join(" ");
    const page = options.page || 1;
    const resultsPerPage = options.resultsPerPage || 20;

    // Build API params
    const params: Record<string, string | number> = {
      what: query,
      results_per_page: resultsPerPage,
      page,
    };

    if (options.location) {
      params.where = options.location;
    }

    if (options.maxDays) {
      params.max_days_old = options.maxDays;
    }

    if (options.minSalary) {
      params.salary_min = options.minSalary;
    }

    if (options.maxSalary) {
      params.salary_max = options.maxSalary;
    }

    if (options.contractType) {
      params.full_time = options.contractType === "full_time" ? "1" : "0";
      params.part_time = options.contractType === "part_time" ? "1" : "0";
      params.contract = options.contractType === "contract" ? "1" : "0";
    }

    if (options.category) {
      params.category = options.category;
    }

    // Make API request
    const url = buildAdzunaUrl("search/1", params);
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.text();
      console.error("Adzuna API error:", error);
      throw new Error(`Adzuna API error: ${response.status}`);
    }

    const data: AdzunaResponse = await response.json();

    // Normalize jobs
    const jobs = data.results.map(normalizeJobData);

    // Cache results
    cache.set(cacheKey, {
      data: jobs,
      timestamp: Date.now(),
      count: data.count,
    });

    return {
      jobs,
      totalCount: data.count,
    };
  } catch (error) {
    console.error("Job search error:", error);
    throw error;
  }
}

/**
 * Get job details by ID
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getJobDetails(_jobId: string): Promise<Job | null> {
  try {
    // Adzuna doesn't have a direct "get by ID" endpoint
    // We'd need to search and filter, or use the redirect URL
    // For now, return null and handle at API route level
    return null;
  } catch (error) {
    console.error("Get job details error:", error);
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
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !commonWords.has(word));

  // Return unique keywords
  return Array.from(new Set(words));
}
