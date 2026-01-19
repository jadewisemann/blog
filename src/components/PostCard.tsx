import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
    post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className="group py-3">
            <Link href={`/posts/${post.slug}`} className="block">
                <time
                    className="text-xs"
                    style={{ color: 'var(--text-faint)' }}
                >
                    {formatDate(post.date)}
                </time>
                <h2
                    className="mt-1 font-medium group-hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--h1-color)' }}
                >
                    {post.title}
                </h2>
                {post.description && (
                    <p
                        className="mt-1 text-sm line-clamp-2"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {post.description}
                    </p>
                )}
            </Link>
        </article>
    );
}

function formatDate(dateString: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
