import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export interface ArticleMetadata {
    title: string;
    description: string;
    date: string;
    tags: string[];
    featured?: boolean;
}

export interface Article {
    slug: string;
    metadata: ArticleMetadata;
    content: string;
}

export function getAllArticles(): Article[] {
    if (!fs.existsSync(articlesDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(articlesDirectory);
    const allArticlesData = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const fullPath = path.join(articlesDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);

            return {
                slug,
                metadata: data as ArticleMetadata,
                content,
            };
        });

    // Sort articles by date
    return allArticlesData.sort((a, b) => {
        if (a.metadata.date < b.metadata.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getArticleBySlug(slug: string): Article | null {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        metadata: data as ArticleMetadata,
        content,
    };
}

export function getAllTags(): string[] {
    const articles = getAllArticles();
    const tags = new Set<string>();
    articles.forEach((article) => {
        article.metadata.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
}
