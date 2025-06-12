import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  
  // Filter and sort posts
  const publishedPosts = posts
    .filter(post => !post.data.draft && !post.data.hidden)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: 'Febryan Ramadhan Blog',
    description: 'Technical articles about cloud engineering, DevOps, infrastructure, automation, and modern web development.',
    site: context.site ?? 'https://febryan.web.id',
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary || post.data.description || '',
      link: `/blog/${post.slug}/`,
      categories: post.data.tags || [],
      author: 'Febryan Ramadhan',
      customData: post.data.updated 
        ? `<lastBuildDate>${post.data.updated.toUTCString()}</lastBuildDate>`
        : undefined,
    })),
    customData: `
      <language>en-us</language>
      <managingEditor>febryan.ramadhan@example.com (Febryan Ramadhan)</managingEditor>
      <webMaster>febryan.ramadhan@example.com (Febryan Ramadhan)</webMaster>
      <copyright>Copyright ${new Date().getFullYear()} Febryan Ramadhan</copyright>
      <category>Technology</category>
      <category>Cloud Engineering</category>
      <category>DevOps</category>
      <category>Web Development</category>
      <ttl>60</ttl>
    `,
  });
}
