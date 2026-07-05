import type { CollectionEntry } from 'astro:content';

export function getBlogSlug(post: CollectionEntry<'blog'>) {
	return post.id.replace(/\.mdx?$/, '');
}
