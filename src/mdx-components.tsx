import type { MDXComponents } from "mdx/types";
import { H1, H2, H3, H4, H5, H6, P } from "./components/ui/Typography";
import EnhancedCodeBlock, {
  InlineCode,
} from "./components/mdx/EnhancedCodeBlock";
import Callout from "./components/mdx/Callout";
import TechStack, { TechGrid } from "./components/mdx/TechStack";
import ProjectLinks, {
  CompactProjectLinks,
} from "./components/mdx/ProjectLinks";
import ImageGallery, { ProjectImage } from "./components/mdx/ImageGallery";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Typography
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    p: P,

    // Code
    pre: EnhancedCodeBlock,
    code: InlineCode,

    // Custom components
    Callout,
    TechStack,
    TechGrid,
    ProjectLinks,
    CompactProjectLinks,
    ImageGallery,
    ProjectImage,

    // Override default components with our styled versions
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-6 rounded-r-lg border-l-4 border-green-400 bg-gray-900/50 py-4 pl-4 text-gray-300 italic"
        {...props}
      >
        {children}
      </blockquote>
    ),

    ul: ({ children, ...props }) => (
      <ul
        className="my-4 list-inside list-disc space-y-2 text-gray-300"
        {...props}
      >
        {children}
      </ul>
    ),

    ol: ({ children, ...props }) => (
      <ol
        className="my-4 list-inside list-decimal space-y-2 text-gray-300"
        {...props}
      >
        {children}
      </ol>
    ),

    li: ({ children, ...props }) => (
      <li className="text-gray-300" {...props}>
        {children}
      </li>
    ),

    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-green-400 underline transition-colors hover:text-green-300"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    ),

    hr: (props) => <hr className="my-8 border-gray-700" {...props} />,

    table: ({ children, ...props }) => (
      <div className="my-6 overflow-x-auto">
        <table
          className="w-full border-collapse border border-gray-700"
          {...props}
        >
          {children}
        </table>
      </div>
    ),

    th: ({ children, ...props }) => (
      <th
        className="border border-gray-700 bg-gray-800 px-4 py-2 text-left font-mono text-sm text-gray-200"
        {...props}
      >
        {children}
      </th>
    ),

    td: ({ children, ...props }) => (
      <td
        className="border border-gray-700 px-4 py-2 text-sm text-gray-300"
        {...props}
      >
        {children}
      </td>
    ),

    ...components,
  };
}
