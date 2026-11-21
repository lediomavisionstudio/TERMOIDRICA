import type { MetadataRoute } from "next";
import { SITE_URL, NAV_LINKS } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  };

  // Le sezioni della single page come entries (anchor)
  const sections: MetadataRoute.Sitemap = NAV_LINKS.map((link) => ({
    url: `${SITE_URL}/${link.href}`, // es. https://.../#servizi
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [home, ...sections];
}
