import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/posts';
import type { APIContext } from 'astro';
import { seoConfig } from '../config/components';

export async function GET(context: APIContext) {
  const publishedPosts = await getPublishedPosts();
  const { author } = seoConfig;

  return rss({
    title: 'Febryan Ramadhan Blog',
    description: seoConfig.blog.description,
    xmlns: { dc: 'http://purl.org/dc/elements/1.1/' },
    site: context.site ?? 'https://febryan.web.id',
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary || post.data.description || '',
      link: `/blog/${post.slug}/`,
      categories: post.data.tags || [],
      customData: `<dc:creator>${author.name}</dc:creator>`,
    })),
    customData: `
      <language>${seoConfig.site.language}</language>
      <copyright>Copyright ${new Date().getFullYear()} Febryan Ramadhan</copyright>
      <category>Linux</category>
      <category>System Administration</category>
      <category>AI</category>
      <category>DevOps</category>
      <ttl>60</ttl>
    `,
  });
}
