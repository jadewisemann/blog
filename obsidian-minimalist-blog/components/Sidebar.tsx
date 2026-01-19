
import React from 'react';
import { NavItem } from '../types';
import { ChevronRight, ChevronDown, FileText, Folder } from 'lucide-react';

interface SidebarProps {
  items: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, activeId, onSelect }) => {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({ 'root': true, 'posts': true });

  const toggleFolder = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderItem = (item: NavItem, depth: number = 0) => {
    const isFolder = item.type === 'folder';
    const isExpanded = expanded[item.id];
    const isActive = activeId === item.id;

    return (
      <div key={item.id}>
        <div
          className={`flex items-center py-1 px-2 cursor-pointer text-sm transition-colors duration-150 rounded-[2px] mb-[1px]
            ${isActive ? 'bg-[#d70087] text-white' : 'text-[#757575] hover:bg-[#b3e5fc] hover:text-[#444444]'}`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => isFolder ? toggleFolder(item.id) : onSelect(item.id)}
        >
          <span className="mr-1">
            {isFolder ? (
              isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
            ) : (
              <FileText size={14} className={isActive ? 'text-white' : 'text-[#9e9e9e]'} />
            )}
          </span>
          <span className="truncate">{item.name}</span>
        </div>
        {isFolder && isExpanded && item.children?.map(child => renderItem(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="w-64 h-full bg-[#eeeeee] border-r border-[#b0bec5] flex flex-col overflow-y-auto select-none">
      <div className="p-4 text-[11px] uppercase tracking-wider text-[#9e9e9e] font-bold">Explorer</div>
      <div className="flex-1 px-2">
        {items.map(item => renderItem(item))}
      </div>
    </div>
  );
};

export default Sidebar;
