import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Configure the file extensions that Next.js will process
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

  // Performance optimizations
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

// Simplified MDX configuration to avoid serialization issues
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
