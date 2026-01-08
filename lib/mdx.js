// mdx.js  ——  统一导出函数
import { unified } from 'https://esm.sh/unified@11.0.4';
import remarkParse from 'https://esm.sh/remark-parse@11.0.0';
import remarkGfm from 'https://esm.sh/remark-gfm@4.0.1'
import remarkMath from 'https://esm.sh/remark-math@6.0.0';
import remarkToc from 'https://esm.sh/remark-toc@9.0.0';
import remarkRehype from 'https://esm.sh/remark-rehype@11.0.0';
import rehypeKatex from 'https://esm.sh/rehype-katex@7.0.0';
import rehypeSlug from 'https://esm.sh/rehype-slug@6.0.0';
// import rehypeAutoLink from 'https://esm.sh/rehype-autolink-headings@7.0.0';
import rehypePrism from 'https://esm.sh/rehype-prism-plus@2.0.0';
// import rehypeCopyCode from 'https://esm.sh/rehype-copy-code@0.2.1';
import rehypeStringify from 'https://esm.sh/rehype-stringify@5.0.0';

export async function renderMarkdown(source) {
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkToc, { heading: '目录', maxDepth: 3, tight: true }) // 在 Makrdown 里输入 [## 目录] 自动填充目录
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeSlug)
    // .use(rehypeAutoLink, { behavior: 'wrap' })
    .use(rehypePrism)
    // .use(rehypeCopyCode)
    .use(rehypeStringify)
    .process(source);
  return value.toString();
}