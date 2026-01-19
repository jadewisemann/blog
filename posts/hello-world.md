---
title: "Next.js SSG 블로그 시작하기"
date: "2026-01-19"
description: "Next.js와 Markdown으로 고성능 정적 블로그를 만드는 방법을 알아봅니다."
---

# Next.js SSG 블로그에 오신 것을 환영합니다!

이 블로그는 **Next.js의 Static Site Generation(SSG)** 기능을 활용하여 빌드 시점에 모든 페이지를 미리 생성합니다.

## 주요 특징

- ⚡ **빠른 로딩 속도** - 정적 HTML로 즉시 렌더링
- 📝 **Markdown 지원** - 간편한 콘텐츠 작성
- 🌙 **다크 모드** - 눈이 편한 읽기 경험
- 📱 **반응형 디자인** - 모든 기기에서 최적화

## 코드 예시

```typescript
// 정적 페이지 생성 예시
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

## 시작하기

1. `posts/` 폴더에 새 `.md` 파일을 생성합니다.
2. Frontmatter에 title, date, description을 작성합니다.
3. GitHub에 push하면 자동으로 배포됩니다!

즐거운 블로깅 되세요! 🎉
