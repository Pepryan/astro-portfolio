import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderOgImage } from '../../lib/og';

/** One social preview image per post: /og/<slug>.png */
export const getStaticPaths = (async () => {
  const posts = await getCollection('posts', (post) => !post.data.draft);
  return posts.map((post) => ({ params: { slug: post.slug }, props: { post } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { data } = props.post as Awaited<ReturnType<typeof getStaticPaths>>[number]['props']['post'];
  const png = await renderOgImage({
    title: data.title,
    eyebrow: data.series ? `${data.series.name} · Part ${data.series.part}` : data.category,
    tags: data.tags,
    date: data.date,
  });

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
