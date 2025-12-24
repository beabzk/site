import MainLayout from "../../components/layout/MainLayout";
import { getAllArticles } from "../../lib/articles";
import Link from "next/link";
import { H2, P } from "../../components/ui/Typography";
import { Calendar, Tag, ArrowRight } from "lucide-react";

export default function ArticlesPage() {
    const articles = getAllArticles();

    return (
        <MainLayout>
            <div className="space-y-12 pb-10">
                <section className="space-y-4">
                    <H2>Articles</H2>
                    <P className="max-w-2xl text-gray-400">
                        Thoughts on software development, design, and building things.
                        Occasionally I write about my learning journey and technical discoveries.
                    </P>
                </section>

                <div className="grid gap-12 lg:grid-cols-1">
                    {articles.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/articles/${article.slug}`}
                            className="group block"
                        >
                            <article className="space-y-4 rounded-2xl border border-transparent p-6 transition-all hover:border-gray-800 hover:bg-gray-950/50">
                                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} className="text-[var(--accent-primary)]" />
                                        <span>{new Date(article.metadata.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {article.metadata.tags.map(tag => (
                                            <span key={tag} className="flex items-center gap-1">
                                                <Tag size={12} className="text-gray-600" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-[var(--accent-primary)]">
                                        {article.metadata.title}
                                    </h3>
                                    <p className="line-clamp-2 text-gray-400 leading-relaxed">
                                        {article.metadata.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--accent-primary)] opacity-0 transition-opacity group-hover:opacity-100">
                                    <span>Read full article</span>
                                    <ArrowRight size={16} />
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {articles.length === 0 && (
                    <div className="py-20 text-center text-gray-500">
                        <p>No articles found yet. Check back soon!</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
