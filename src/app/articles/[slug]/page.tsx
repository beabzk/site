import { getArticleBySlug, getAllArticles } from "../../../lib/articles";
import MainLayout from "../../../components/layout/MainLayout";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "../../../mdx-components";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ArticlePageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const articles = getAllArticles();
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
    const { slug } = params;
    const article = getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const formattedDate = new Date(article.metadata.date).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    return (
        <MainLayout>
            <div className="pb-20">
                {/* Back Link */}
                <Link
                    href="/articles"
                    className="group mb-12 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
                >
                    <ArrowLeft
                        size={16}
                        className="transition-transform group-hover:-translate-x-1"
                    />
                    <span>Back to articles</span>
                </Link>

                {/* Header */}
                <header className="mb-12 space-y-6">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5 font-mono">
                            <Calendar size={14} className="text-[var(--accent-primary)]" />
                            <span>{formattedDate}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 font-mono">
                            {article.metadata.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-gray-900 px-2 py-0.5 text-xs text-gray-400 border border-gray-800"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        {article.metadata.title}
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        {article.metadata.description}
                    </p>
                </header>

                {/* Content */}
                <div className="prose prose-invert prose-emerald max-w-none">
                    <MDXRemote source={article.content} components={components} />
                </div>
            </div>
        </MainLayout>
    );
}
