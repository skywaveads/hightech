import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import { BlogPost, BlogPostWithAuthor } from '@/types/blog';
import { Author, authors } from '@/data/authors';

// Mock data directory (in a real app, this would be a real directory)
const POSTS_DIRECTORY = path.join(process.cwd(), 'src/data/blog-posts');

// For dev purposes, mock some posts if the directory doesn't exist
const MOCK_POSTS: BlogPost[] = [
  {
    slug: 'what-is-a-cutter-plotter-complete-guide', // Matches an existing markdown file
    title: 'What is a Cutter Plotter? Your Complete Guide',
    titleAr: 'ما هو الكتر بلوتر؟ دليلك الشامل',
    description: 'A comprehensive guide to understanding vinyl cutting technology.',
    descriptionAr: 'دليل شامل لفهم تقنية قص الفينيل، والميزات التي يجب البحث عنها.',
    content: '# What is a Cutter Plotter?\n\n...',
    contentAr: '# ما هو الكتر بلوتر؟\n\n...',
    publishedAt: '2025-05-01T10:00:00Z',
    updatedAt: '2025-05-03T12:30:00Z',
    coverImage: '/images/blog/what_is_a_cutter_plotter_complete_guide.png', // Assuming this image exists in public/images/blog/
    authorId: 'admin', // Make sure this authorId exists in your src/data/authors.ts
    tags: ['cutter plotter', 'vinyl cutter', 'guide'],
    tagsAr: ['كتر بلوتر', 'قاطع فينيل', 'دليل'],
    draft: false,
    readingTime: 18,
    relatedSlugs: ['cutter-plotter-vs-laser-cutter', 'how-to-cut-professional-stickers-with-a-cutter-plotter']
  },
  {
    slug: 'best-cutter-plotter-for-small-businesses-saudi-2025', // Matches an existing markdown file
    title: 'Best Cutter Plotters for Small Businesses in KSA 2025',
    titleAr: 'أفضل أنواع كتر بلوتر للمشاريع الصغيرة في السعودية 2025',
    description: 'Comparison of vinyl cutting machines in Saudi Arabia for small businesses.',
    descriptionAr: 'مقارنة شاملة لأفضل ماكينات قص الفينيل المتوفرة في المملكة العربية السعودية.',
    content: '# Best Cutter Plotters KSA\n\n...',
    contentAr: '# أفضل كتر بلوتر السعودية\n\n...',
    publishedAt: '2025-06-10T09:00:00Z',
    coverImage: '/images/blog/best_cutter_plotter_for_small_businesses_saudi_2025.png', // Assuming this image exists
    authorId: 'mohamed-saleh', // Make sure this authorId exists
    tags: ['cutter plotter', 'small business', 'Saudi Arabia'],
    tagsAr: ['كتر بلوتر', 'مشاريع صغيرة', 'السعودية'],
    draft: false,
    readingTime: 16,
    relatedSlugs: ['start-t-shirt-printing-business-with-htv-and-cutter-plotter', 'cutter-plotter-maintenance-common-mistakes']
  },
  {
    slug: 't-shirt-printing-business-guide-saudi-arabia', // Matches an existing markdown file
    title: 'Profitable T-shirt Printing Business in KSA',
    titleAr: 'دليل الربح من مشاريع الطباعة على الملابس في السعودية',
    description: 'A guide to launching a t-shirt printing business in Saudi Arabia.',
    descriptionAr: 'دليل كامل لإطلاق مشروع ناجح للطباعة على الملابس في المملكة العربية السعودية.',
    content: '# T-shirt Printing KSA\n\n...',
    contentAr: '# طباعة تيشيرتات السعودية\n\n...',
    publishedAt: '2025-06-18T11:00:00Z',
    coverImage: '/images/blog/t_shirt_printing_business_guide_saudi_arabia.png', // Assuming this image exists
    authorId: 'sara-elsayed', // Make sure this authorId exists
    tags: ['t-shirt printing', 'Saudi Arabia', 'business guide'],
    tagsAr: ['طباعة تيشيرتات', 'السعودية', 'دليل مشاريع'],
    draft: false,
    readingTime: 18,
    relatedSlugs: ['best-cutter-plotter-for-small-businesses-saudi-2025', 'choosing-the-right-htv-for-sportswear']
  }
];

/**
 * Get all blog posts
 */
export async function getAllPosts(includeDrafts = false): Promise<BlogPost[]> {
  try {
    // FS operations should only run in Node.js environment (server-side, build time)
    if (typeof window !== 'undefined') {
      console.warn('Attempted to access filesystem on client-side. Returning mock posts for BlogSection.');
      return includeDrafts
        ? MOCK_POSTS
        : MOCK_POSTS.filter(post => !post.draft);
    }

    // Check if the directory exists - this will now only run server-side
    if (!fs.existsSync(POSTS_DIRECTORY)) {
      console.warn('Posts directory does not exist on server. Using mock data instead.');
      return includeDrafts
        ? MOCK_POSTS
        : MOCK_POSTS.filter(post => !post.draft);
    }

    const fileNames = fs.readdirSync(POSTS_DIRECTORY);
    const allPostsData = fileNames
      .filter(fileName => {
        return fileName.endsWith('.md') || fileName.endsWith('.mdx');
      })
      .map(fileName => {
        // Remove ".md" or ".mdx" from file name to get id
        const slug = fileName.replace(/\.mdx?$/, '');

        // Read markdown file as string
        const fullPath = path.join(POSTS_DIRECTORY, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Convert publish date to ISO string if it's a Date object
        const publishedAt = matterResult.data.publishedAt instanceof Date 
          ? matterResult.data.publishedAt.toISOString()
          : matterResult.data.publishedAt;

        // Convert update date to ISO string if it exists and is a Date object
        const updatedAt = matterResult.data.updatedAt instanceof Date 
          ? matterResult.data.updatedAt.toISOString()
          : matterResult.data.updatedAt;

        // Combine the data with the id
        return {
          slug,
          content: matterResult.content,
          contentAr: matterResult.data.contentAr || '',
          publishedAt,
          updatedAt,
          draft: matterResult.data.draft || false,
          ...matterResult.data
        } as BlogPost;
      })
      .sort((a, b) => {
        if (new Date(a.publishedAt) < new Date(b.publishedAt)) {
          return 1;
        } else {
          return -1;
        }
      });

    return includeDrafts 
      ? allPostsData 
      : allPostsData.filter(post => !post.draft);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return includeDrafts 
      ? MOCK_POSTS 
      : MOCK_POSTS.filter(post => !post.draft);
  }
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // First try to find the post in the file system
    if (fs.existsSync(POSTS_DIRECTORY)) {
      const fullPath = path.join(POSTS_DIRECTORY, `${slug}.md`);
      const mdxPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
      
      // Check if either MD or MDX file exists
      if (fs.existsSync(fullPath) || fs.existsSync(mdxPath)) {
        const filePath = fs.existsSync(fullPath) ? fullPath : mdxPath;
        const fileContents = fs.readFileSync(filePath, 'utf8');
        
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);
        
        // Convert publish date to ISO string if it's a Date object
        const publishedAt = matterResult.data.publishedAt instanceof Date 
          ? matterResult.data.publishedAt.toISOString()
          : matterResult.data.publishedAt;

        // Convert update date to ISO string if it exists and is a Date object
        const updatedAt = matterResult.data.updatedAt instanceof Date 
          ? matterResult.data.updatedAt.toISOString()
          : matterResult.data.updatedAt;
        
        return {
          slug,
          content: matterResult.content,
          contentAr: matterResult.data.contentAr || '',
          publishedAt,
          updatedAt,
          draft: matterResult.data.draft || false,
          ...matterResult.data
        } as BlogPost;
      }
    }
    
    // If not found, look in mock data
    const post = MOCK_POSTS.find(post => post.slug === slug);
    return post || null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    const post = MOCK_POSTS.find(post => post.slug === slug);
    return post || null;
  }
}

/**
 * Get all blog post slugs
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(POSTS_DIRECTORY)) {
      console.warn('Posts directory does not exist. Using mock data instead.');
      return MOCK_POSTS.map(post => post.slug);
    }

    const fileNames = fs.readdirSync(POSTS_DIRECTORY);
    return fileNames
      .filter(fileName => {
        return fileName.endsWith('.md') || fileName.endsWith('.mdx');
      })
      .map(fileName => {
        return fileName.replace(/\.mdx?$/, '');
      });
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return MOCK_POSTS.map(post => post.slug);
  }
}

/**
 * Convert markdown to HTML with enhanced formatting
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  try {
    // Process markdown content to enhance formatting before processing
    const enhancedMarkdown = enhanceMarkdownFormatting(markdown);
    
    const result = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSlug) // Add IDs to headings
      .use(rehypeAutolinkHeadings, { // Add anchor links to headings
        behavior: 'append',
        properties: { className: ['anchor-link'] },
        content: {
          type: 'element',
          tagName: 'span',
          properties: { className: ['anchor-icon'] },
          children: [{ type: 'text', value: '#' }]
        }
      })
      .use(rehypePrism, { ignoreMissing: true }) // Syntax highlighting
      .use(rehypeStringify)
      .process(enhancedMarkdown);
    
    let htmlContent = result.toString();
    
    // Add classes to HTML elements after processing
    htmlContent = addClassesToElements(htmlContent);
    
    return htmlContent;
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    const result = await remark()
      .use(html)
      .process(markdown);
    return result.toString();
  }
}

/**
 * Enhance markdown content before processing
 */
function enhanceMarkdownFormatting(markdown: string): string {
  let enhancedContent = markdown;
  
  // Add section dividers between major headings for better visual separation
  enhancedContent = enhancedContent.replace(/^(## .*?)$/gm, '\n<div class="blog-section-divider"></div>\n\n$1');
  
  // Add call-to-action boxes
  enhancedContent = enhancedContent.replace(/^\[!TIP\]([\s\S]*?)(?=\n\n|\n[#]|$)/gm, '<div class="blog-tip-box">$1</div>');
  enhancedContent = enhancedContent.replace(/^\[!NOTE\]([\s\S]*?)(?=\n\n|\n[#]|$)/gm, '<div class="blog-note-box">$1</div>');
  enhancedContent = enhancedContent.replace(/^\[!WARNING\]([\s\S]*?)(?=\n\n|\n[#]|$)/gm, '<div class="blog-warning-box">$1</div>');
  
  // Convert tables to have better structure with headers
  enhancedContent = enhancedContent.replace(/(\n\|[^\n]+\|[^\n]*\n\|[-|]+\|[^\n]*\n)/g, 
    (match) => `\n<div class="blog-table-container">\n${match}`);
  enhancedContent = enhancedContent.replace(/(\n\|[^\n]+\|[^\n]*\n)(?!\|)/g, 
    (match) => `${match}</div>\n`);
  
  return enhancedContent;
}

/**
 * Add classes to HTML elements after processing
 */
function addClassesToElements(html: string): string {
  let enhancedHtml = html;
  
  // Style headings
  enhancedHtml = enhancedHtml.replace(/<h1(.*?)>(.*?)<\/h1>/g, '<h1$1 class="blog-heading blog-h1 heading-style-1"><span class="heading-decoration"></span>$2</h1>');
  enhancedHtml = enhancedHtml.replace(/<h2(.*?)>(.*?)<\/h2>/g, '<h2$1 class="blog-heading blog-h2 heading-style-2">$2</h2>');
  enhancedHtml = enhancedHtml.replace(/<h3(.*?)>(.*?)<\/h3>/g, '<h3$1 class="blog-heading blog-h3 heading-style-3">$2</h3>');
  enhancedHtml = enhancedHtml.replace(/<h4(.*?)>(.*?)<\/h4>/g, '<h4$1 class="blog-heading blog-h4 heading-style-4">$2</h4>');
  
  // Style paragraphs
  enhancedHtml = enhancedHtml.replace(/<p>(.*?)<\/p>/g, '<p class="blog-paragraph">$1</p>');
  
  // Find first paragraph after h1 and make it an intro paragraph
  const h1Regex = new RegExp('<h1.*?</h1>\\s*?<p class="blog-paragraph">((?:.|\\n)*?)</p>');
  const h1Match = enhancedHtml.match(h1Regex);
  if (h1Match && h1Match[1]) {
    enhancedHtml = enhancedHtml.replace(
      `<p class="blog-paragraph">${h1Match[1]}</p>`,
      `<p class="blog-paragraph blog-intro-paragraph">${h1Match[1]}</p>`
    );
  }
  
  // Make the first paragraph after each h2 a lead paragraph
  enhancedHtml = enhancedHtml.replace(/<h2.*?<\/h2>(\s*?)<p class="blog-paragraph">((?:.|[\r\n])*?)<\/p>/g, 
    function(match, space, p1) {
      return match.replace(
        `<p class="blog-paragraph">${p1}</p>`, 
        `<p class="blog-paragraph blog-lead-paragraph">${p1}</p>`
      );
    }
  );
  
  // Style lists
  enhancedHtml = enhancedHtml.replace(/<ul>/g, '<ul class="blog-unordered-list">');
  enhancedHtml = enhancedHtml.replace(/<ol>/g, '<ol class="blog-ordered-list">');
  enhancedHtml = enhancedHtml.replace(/<li>/g, '<li class="blog-list-item">');
  
  // Style tables
  enhancedHtml = enhancedHtml.replace(/<table>/g, '<table class="blog-table">');
  enhancedHtml = enhancedHtml.replace(/<tr>/g, '<tr class="blog-table-row">');
  enhancedHtml = enhancedHtml.replace(/<th>/g, '<th class="blog-table-th">');
  enhancedHtml = enhancedHtml.replace(/<td>/g, '<td class="blog-table-td">');
  
  // Add figure styling to images
  enhancedHtml = enhancedHtml.replace(/<p class="blog-paragraph"><img (.*?)><\/p>/g,
    '<figure class="blog-figure"><img $1><figcaption class="blog-figcaption"></figcaption></figure>');
  
  return enhancedHtml;
}

/**
 * Add author details to a post
 */
export function addAuthorToPost(post: BlogPost): BlogPostWithAuthor {
  const author = authors.find(a => a.id === post.authorId);
  if (!author) {
    throw new Error(`Author with ID ${post.authorId} not found`);
  }
  return {
    ...post,
    author
  };
}

/**
 * Get related posts for a given post
 */
export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  // If post has predefined related slugs, use those
  if (post.relatedSlugs && post.relatedSlugs.length > 0) {
    const relatedPosts = await Promise.all(
      post.relatedSlugs.slice(0, limit).map(slug => getPostBySlug(slug))
    );
    return relatedPosts.filter(Boolean) as BlogPost[];
  }
  
  // Otherwise, find posts with the most tag overlap
  const allPosts = await getAllPosts(false); // Exclude drafts
  
  return allPosts
    .filter(p => p.slug !== post.slug) // Exclude current post
    .map(p => {
      // Count matching tags
      const matchingTagsCount = p.tags.filter(tag => post.tags.includes(tag)).length;
      return { post: p, matchCount: matchingTagsCount };
    })
    .sort((a, b) => b.matchCount - a.matchCount) // Sort by number of matching tags
    .slice(0, limit) // Take only the top matches
    .map(item => item.post);
} 