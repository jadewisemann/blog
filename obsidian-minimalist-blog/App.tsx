
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MarkdownRenderer from './components/MarkdownRenderer';
import { MOCK_POSTS, NAV_ITEMS } from './constants';
import { Post } from './types';
import { Settings, Search, Menu, X, Info } from 'lucide-react';

const App: React.FC = () => {
  const [activePostId, setActivePostId] = useState<string>('python-inplace');
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const post = MOCK_POSTS.find(p => p.id === activePostId);
    if (post) {
      setActivePost(post);
    }
  }, [activePostId]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f3f3f3]">
      {/* Sidebar Toggle (Mobile) */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-4 right-4 z-50 md:hidden bg-[#d70087] text-white p-3 rounded-full shadow-lg"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 fixed md:relative z-40 h-full`}>
        <Sidebar 
          items={NAV_ITEMS} 
          activeId={activePostId} 
          onSelect={(id) => {
            setActivePostId(id);
            if (window.innerWidth < 768) setIsSidebarOpen(false);
          }} 
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar / Tabs-like Header */}
        <header className="h-10 border-b border-[#b0bec5] bg-[#eeeeee] flex items-center px-4 justify-between select-none">
          <div className="flex items-center space-x-2">
            <div className="h-7 px-3 bg-[#f3f3f3] border border-[#b0bec5] border-b-0 rounded-t-md flex items-center text-xs text-[#d70087] font-medium max-w-[200px] truncate">
              {activePost?.title || 'Untitled'}
            </div>
          </div>
          <div className="flex items-center space-x-4 text-[#444444]">
            <Search size={16} className="cursor-pointer hover:text-[#d70087]" />
            <Settings size={16} className="cursor-pointer hover:text-[#d70087]" />
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          {/* Status Bar Floating Placeholder (Obsidian style) */}
          <div className="absolute top-0 right-0 p-2 pointer-events-none">
             <div className="text-[10px] text-[#9e9e9e] font-mono bg-white/50 px-2 rounded">
               {activePost?.content.length || 0} characters
             </div>
          </div>

          {activePost ? (
            <MarkdownRenderer content={activePost.content} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-[#9e9e9e]">
               <Info size={48} className="mb-4 opacity-20" />
               <p>Select a file to view content</p>
            </div>
          )}
        </main>

        {/* Footer Status Bar */}
        <footer className="h-6 bg-[#155f87] border-t border-[#4a148c] text-[11px] text-[#eeeeee] flex items-center px-4 space-x-4">
          <div className="flex-1 truncate">Markdown Mode</div>
          <div>UTF-8</div>
          <div>Line 1, Col 1</div>
        </footer>
      </div>
    </div>
  );
};

export default App;
