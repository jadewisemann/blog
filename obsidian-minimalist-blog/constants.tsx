
import { Post, NavItem } from './types';

export const MOCK_POSTS: Post[] = [
  {
    id: 'python-inplace',
    title: '(python) a += ... != a = a + ...',
    date: '2024-03-20',
    tags: ['python', 'programming', 'memory'],
    category: 'Development',
    content: `
# 개요

\`\`\`python
a = [1, 2]
print(f'id of a is {id(a)}')
b = a
a += [3]
print(f'b is {b}')  # b is [1, 2, 3]

c = [1, 2]
d = c
c = c + [3]
print(f'd is {d}')  # d is [1, 2]
\`\`\`

왜?

\`a += ...\` 는 \`a = a + ...\` 가 아님
- 동일하게 동작하는 것 같지만 엄밀하게 말하면 다르다.

## in-place, 제자리 연산
- 새로운 메모리를 만들지 않고 기존에 데이터가 있는 메모리 공간 덮어쓰는 연산
- 피연산자, 원본이 변경됨
- 재 할당이 아니라 **갱신**
- \`list.sort()\`
  - 그저 대상으로 하는 \`list\` 가 변경됨

## out-of-place, 비제자리/외부 연산
- 연산 결과물을 새로운 공간에 할당
- 피연산자, 원본이 변경되지 않음
- \`sorted(list)\`
  - 정렬된 \`list\` 가 반환됨

## a = a + ...
- 그냥 \`+\` operator, \`__add__\` 를 호출하고 다른 메모리 공간에 재할당.

## +=
- \`__iadd__\` 를 호출함
- 파이썬에서는 \`__iadd__\` 가 있어야만 제자리 연산이 됨
- <없으면>
  - \`__add__\` 를 호출하고 동일한 변수를 재할당
  - 외부 연산을 함
    `
  },
  {
    id: 'welcome',
    title: 'Welcome to my Minimalist Blog',
    date: '2024-01-01',
    tags: ['intro', 'blog'],
    category: 'Home',
    content: `# Welcome
    
이 블로그는 Obsidian의 VSCode Light Theme를 기반으로 제작되었습니다.
미니멀한 디자인과 깔끔한 타이포그래피를 지향합니다.

## 특징
- **VSCode Light** 색상 체계 적용
- [React](https://reactjs.org)와 Tailwind CSS 사용
- 정적 사이트 느낌의 네비게이션
    `
  }
];

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'root',
    name: 'Vault',
    type: 'folder',
    children: [
      {
        id: 'posts',
        name: 'Posts',
        type: 'folder',
        children: [
          { id: 'python-inplace', name: '(python) a += ...', type: 'file' },
          { id: 'welcome', name: 'Welcome', type: 'file' },
        ]
      },
      {
        id: 'about',
        name: 'About',
        type: 'file'
      }
    ]
  }
];
