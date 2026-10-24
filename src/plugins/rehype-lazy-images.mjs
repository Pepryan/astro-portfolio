import { visit } from 'unist-util-visit';

/**
 * Adds native lazy loading + async decoding to every <img> in markdown/MDX,
 * so long tutorials don't download all screenshots up front.
 */
export default function rehypeLazyImages() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'img') return;
      node.properties.loading ??= 'lazy';
      node.properties.decoding ??= 'async';
    });
  };
}
