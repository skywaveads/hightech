export interface BlogPost {
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  content: string;
  contentAr: string;
  publishedAt: string; // ISO date string
  updatedAt?: string; // ISO date string
  coverImage: string;
  authorId: string;
  tags: string[];
  tagsAr: string[];
  draft: boolean;
  readingTime?: number; // in minutes
  relatedSlugs?: string[];
}

export interface BlogPostWithAuthor extends BlogPost {
  author: {
    id: string;
    name: string;
    nameAr: string;
    title: string;
    titleAr: string;
    bio: string;
    bioAr: string;
    image: string;
    linkedin?: string;
    twitter?: string;
    sameAs?: string[];
  };
} 