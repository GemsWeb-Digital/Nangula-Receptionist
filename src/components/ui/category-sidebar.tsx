"use client";

import React from 'react';
import { Category } from '../../types';
import { SearchIcon } from '../icons/Icons';

interface CategorySidebarProps {
  categories: Category[];
  activeCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories, activeCategory, onCategorySelect }) => {
  return (
    <aside className="neuro-card-inset p-4 space-y-4 sticky top-4 h-fit">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search knowledge..." 
          className="neuro-input !pl-10"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon className="w-5 h-5" />
        </div>
      </div>

      <nav className="space-y-1.5">
        <h3 className="px-3 text-sm font-semibold text-gray-500">CATEGORIES</h3>
        {categories.map((cat) => {
          const isActive = cat.name === activeCategory;
          return (
            <button
              key={cat.name}
              onClick={() => onCategorySelect(cat.name)}
              className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out ${
                isActive 
                ? 'text-white shadow-md' 
                : 'text-gray-700 hover:bg-black/5'
              }`}
              style={isActive ? { background: 'var(--namib-gold-gradient)' } : {}}
            >
              <div className="flex items-center gap-3">
                <cat.icon />
                <span>{cat.name}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white/20' : 'bg-gray-200'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </nav>

      <button className="w-full mt-2 text-sm font-semibold text-center py-2.5 rounded-lg border-2 border-dashed border-[#F4A460]/50 text-[#F4A460] hover:border-[#F4A460] hover:bg-[#F4A460]/10 transition-colors">
        + Add Category
      </button>
    </aside>
  );
};

export default CategorySidebar;
