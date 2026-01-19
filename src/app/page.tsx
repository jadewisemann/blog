import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-8">
        <h1
          className="text-xl font-semibold tracking-tight mb-2 pb-2"
          style={{
            color: 'var(--h1-color)',
            borderBottom: '1px solid var(--background-modifier-border)'
          }}
        >
          Blog
        </h1>
        <p style={{ color: 'var(--text-muted)' }} className="text-sm">
          개발, 기술, 그리고 생각들을 기록합니다.
        </p>
      </section>

      <section>
        {posts.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>
            아직 작성된 글이 없습니다.
          </p>
        ) : (
          <div
            className="divide-y"
            style={{ borderColor: 'var(--background-modifier-border)' }}
          >
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
