import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/posts';
import type { APIContext } from 'astro';
import { seoConfig } from '../config/components';

export async function GET(context: APIContext) {
  const publishedPosts = await getPublishedPosts();
  const { author } = seoConfig;

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
      author: `${author.email} (${author.name})`,
    })),
    customData: `
      <language>${seoConfig.site.language}</language>
      <managingEditor>${author.email} (${author.name})</managingEditor>
      <webMaster>${author.email} (${author.name})</webMaster>
      <copyright>Copyright ${new Date().getFullYear()} Febryan Ramadhan</copyright>
      <category>Technology</category>
      <category>Cloud Engineering</category>
      <category>DevOps</category>
      <category>Web Development</category>
      <ttl>60</ttl>
    `,
  });
}
