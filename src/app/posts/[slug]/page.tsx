import { notFound } from "next/navigation";
import { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import Link from "next/link";
import rehypePrettyCode from "rehype-pretty-code";
import CopyCodeButtons from "@/components/CopyCodeButtons";
import { formatDate } from "@/lib/utils";

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getAllSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    return {
        title: post.title,
        description: post.description,
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const { content } = await compileMDX({
        source: post.content,
        options: {
            mdxOptions: {
                rehypePlugins: [
                    [
                        rehypePrettyCode,
                        {
                            theme: "github-light",
                            keepBackground: true,
                        },
                    ],
                ],
            },
        },
    });

    return (
        <article>
            <header className="mb-6">
                <Link
                    href="/"
                    className="text-sm hover:underline mb-4 inline-block"
                    style={{ color: 'var(--link-color)', fontStyle: 'italic' }}
                >
                    ← 목록으로
                </Link>
                <h1
                    className="text-2xl font-semibold tracking-tight mt-4 mb-2 pb-2"
                    style={{
                        color: 'var(--h1-color)',
                        borderBottom: '1px solid var(--background-modifier-border)'
                    }}
                >
                    {post.title}
                </h1>
                <time style={{ color: 'var(--text-faint)' }} className="text-sm">
                    {formatDate(post.date)}
                </time>
            </header>

            <div className="prose prose-gray max-w-none">
                {content}
            </div>

            {/* Client component to add copy buttons after hydration */}
            <CopyCodeButtons />
        </article>
    );
}


