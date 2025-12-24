---
description: how to create a new article for the blog
---

# Creating a New Article

The website uses a file-based MDX system for articles. To create a new article:

1. **Create a new `.mdx` file** in `content/articles/`.
2. **Add the required frontmatter**:
   ```markdown
   ---
   title: "Your Article Title"
   description: "A short summary of the article"
   date: "YYYY-MM-DD"
   tags: ["Tag1", "Tag2"]
   featured: false
   ---
   ```
3. **Write your content** using standard Markdown or MDX components.
4. **Available Components**:
   - `Callout`: For highlighting notes/warnings.
   - `EnhancedCodeBlock`: For code examples with syntax highlighting.
   - `ImageGallery`: For displaying multiple images.

5. **Verification**:
   - The article will automatically appear in the `/articles` listing page.
   - Check the detail page at `/articles/your-file-name` to ensure rendering is correct.
