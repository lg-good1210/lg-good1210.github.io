// mdx.js  ——  统一导出函数
import { unified } from 'https://esm.sh/unified@11.0.4';
// import { remark } from 'https://esm.sh/remark@15.0.1';
import { visit } from 'https://esm.sh/unist-util-visit@5.0.0';
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
import remarkFrontmatter from 'https://esm.sh/remark-frontmatter@5.0.0';
import yaml from 'https://esm.sh/js-yaml@4.1.0';   // 解析 YAML 用

// 去掉 --- 包裹的整块 YAML（含前后换行）
function stripYaml(md) {
  return md.replace(/^---[\s\S]*?---\r?\n?/m, '');
}

export async function renderMarkdown(source) {
  var clean = stripYaml(source);   // 先扔块
  clean = `## 目录\n` + clean;  // 强制加目录头
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkToc, { heading: '目录', maxDepth: 4, tight: true }) // 4 级深度的目录
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeSlug)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(clean);                 // 处理已删块的文本
  return value.toString();
}

export function getYamlMeta(md) {
  const file = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .parse(md);                      // 用 parse 而不是 processSync

  const node = file.children.find(n => n.type === 'yaml');
  if (!node) return null;
  try {
    return yaml.load(node.value);
  } catch {
    return null;
  }
}
