/**
 * JSearch Job API Client (via RapidAPI)
 * 
 * Provides job search functionality using JSearch API
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

interface JSearchJobData {
  job_id?: string;
  job_title?: string;
  job_publisher?: string;
  employer_name?: string;
  job_city?: string;
  job_country?: string;
  job_description?: string;
  job_highlights?: {
    Qualifications?: string[];
  };
  job_min_salary?: number;
  job_max_salary?: number;
  job_salary_currency?: string;
  job_salary_period?: string;
  job_posted_at_timestamp?: number;
  job_posted_at_datetime_utc?: string;
  job_employment_type?: string;
  job_apply_link?: string;
  job_google_link?: string;
  job_category?: string;
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
 * Search for jobs using JSearch API
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
    const apiKey = process.env.RAPID_API_KEY?.trim();
    if (!apiKey) {
      throw new Error("RapidAPI key not configured. Please set RAPID_API_KEY environment variable.");
    }

    // Build search query
    let query = keywords.join(" ").replace(/\s+/g, " ").trim();
    
    // Fallback: If keywords extraction results in nothing, try a generic search
    if (!query || query.trim().length === 0) {
      query = "jobs"; // Generic search
    }

    // Add location to query if provided
    if (options.location) {
      query += ` in ${options.location.trim()}`;
    }

    const page = options.page || 1;
    const resultsPerPage = Math.min(options.resultsPerPage || 20, 20); // Max 20 per page

    // Build API request
    const url = new URL("https://jsearch.p.rapidapi.com/search");
    url.searchParams.set("query", query);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("num_pages", "1");
    
    // Date filter
    if (options.maxDays) {
      if (options.maxDays <= 1) {
        url.searchParams.set("date_posted", "today");
      } else if (options.maxDays <= 3) {
        url.searchParams.set("date_posted", "3days");
      } else if (options.maxDays <= 7) {
        url.searchParams.set("date_posted", "week");
      } else if (options.maxDays <= 30) {
        url.searchParams.set("date_posted", "month");
      }
    }

    // Employment type
    if (options.contractType) {
      const typeMap = {
        full_time: "FULLTIME",
        part_time: "PARTTIME",
        contract: "CONTRACTOR",
      };
      url.searchParams.set("employment_types", typeMap[options.contractType]);
    }

    console.log("Calling JSearch API:", url.toString().replace(apiKey, "KEY_HIDDEN"));

    // Make API request
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("JSearch API error:", errorText);
      throw new Error(`JSearch API error ${response.status}: ${errorText.slice(0, 200)}`);
    }

    const data = await response.json();

    // Check if API returned an error
    if (data.status === "error" || !data.data) {
      throw new Error(data.error || "JSearch API returned no results");
    }

    // Normalize jobs
    const jobs = (data.data || [])
      .slice(0, resultsPerPage)
      .map(normalizeJobData)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((job: any): job is Job => job !== null);

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
 * Normalize JSearch job data to our format
 */
function normalizeJobData(jsearchJob: JSearchJobData): Job | null {
  try {
    // Format salary
    let salary: string | null = null;
    if (jsearchJob.job_min_salary && jsearchJob.job_max_salary) {
      const min = Math.round(jsearchJob.job_min_salary);
      const max = Math.round(jsearchJob.job_max_salary);
      const currency = jsearchJob.job_salary_currency || "$";
      salary = `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()}`;
      
      if (jsearchJob.job_salary_period) {
        salary += ` (${jsearchJob.job_salary_period})`;
      }
    } else if (jsearchJob.job_min_salary) {
      const currency = jsearchJob.job_salary_currency || "$";
      salary = `${currency}${Math.round(jsearchJob.job_min_salary).toLocaleString()}+`;
    }

    // Parse posted date
    let postedDate = new Date();
    if (jsearchJob.job_posted_at_timestamp) {
      postedDate = new Date(jsearchJob.job_posted_at_timestamp * 1000);
    } else if (jsearchJob.job_posted_at_datetime_utc) {
      postedDate = new Date(jsearchJob.job_posted_at_datetime_utc);
    }

    return {
      id: jsearchJob.job_id || `job_${Date.now()}_${Math.random()}`,
      title: jsearchJob.job_title || "Untitled Position",
      company: jsearchJob.job_publisher || jsearchJob.employer_name || "Unknown Company",
      location: jsearchJob.job_city 
        ? `${jsearchJob.job_city}, ${jsearchJob.job_country}` 
        : jsearchJob.job_country || "Remote",
      description: jsearchJob.job_description || jsearchJob.job_highlights?.Qualifications?.join(", ") || "No description available",
      salary,
      postedDate,
      contractType: jsearchJob.job_employment_type || "Not specified",
      url: jsearchJob.job_apply_link || jsearchJob.job_google_link || "#",
      category: jsearchJob.job_category,
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
