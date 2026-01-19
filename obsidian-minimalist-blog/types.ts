
export interface Post {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
  category: string;
}

export interface NavItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: NavItem[];
}
