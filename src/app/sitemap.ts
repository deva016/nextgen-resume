import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nextgen-resume.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/resumes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tos`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    // Add other known routes here if they exist, e.g. /sign-in, /sign-up if we want them indexed
    {
       url: `${baseUrl}/sign-in`,
       lastModified: new Date(),
       changeFrequency: 'monthly',
       priority: 0.5,
    },
     {
       url: `${baseUrl}/sign-up`,
       lastModified: new Date(),
       changeFrequency: 'monthly',
       priority: 0.5,
    },
  ];
}
