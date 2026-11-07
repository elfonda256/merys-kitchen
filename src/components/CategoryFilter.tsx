import React from 'react';
import { Search, Flame, Sparkles } from 'lucide-react';
import { CategoryId } from '../types/catering';
import { CATEGORIES, SPECIFICATION_TAGS } from '../data/cateringData';

interface CategoryFilterProps {
  selectedCategory: CategoryId;
  onSelectCategory: (catId: CategoryId) => void;
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedTag,
  onSelectTag,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="space-y-4 pt-4">
      {/* Search Input & Quick Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A6F]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari menu, olahan rendang, sate maranggi, tumpeng..."
            className="w-full pl-10 pr-4 py-2.5 rounded bg-[#F3EFE6] text-sm text-[#1F2421] placeholder-[#6B7A6F] border border-transparent focus:border-[#3F704D] focus:bg-[#FFFFFF] focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B7A6F] hover:text-[#1F2421]"
            >
              Hapus
            </button>
          )}
        </div>

        <div className="text-xs text-[#6B7A6F] hidden sm:flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
          <span>Setiap hidangan dimasak segar di hari acara</span>
        </div>
      </div>

      {/* Main Culinary Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as CategoryId)}
              className={`whitespace-nowrap min-h-[40px] px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#3F704D] text-[#FFFFFF] shadow-sm'
                  : 'bg-[#F3EFE6] text-[#1F2421] hover:bg-[#ebefea]'
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-[#265737] text-[#bbf1c5]' : 'bg-[#e5e9e4] text-[#6B7A6F]'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Diet & Specification Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-[11px] font-bold text-[#6B7A6F] uppercase tracking-wider whitespace-nowrap pl-0.5 shrink-0">
          Filter Spesifikasi:
        </span>
        {SPECIFICATION_TAGS.map((tag) => {
          const isSelected = selectedTag === tag;
          const isWarningOrSpice = tag.includes('Pedas');

          let chipClass = 'bg-[#F3EFE6] text-[#1F2421] hover:bg-[#e5e9e4]';
          if (isSelected) {
            chipClass = 'bg-[#3F704D] text-[#FFFFFF] shadow-sm';
          } else if (isWarningOrSpice) {
            chipClass = 'bg-[#FDF0ED] border border-[#D9532F]/40 text-[#D9532F] hover:bg-[#fbdcd5]';
          }

          return (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className={`whitespace-nowrap min-h-[36px] px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${chipClass}`}
            >
              {isWarningOrSpice && <Flame className="w-3.5 h-3.5 text-[#D9532F]" />}
              <span>{tag}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
