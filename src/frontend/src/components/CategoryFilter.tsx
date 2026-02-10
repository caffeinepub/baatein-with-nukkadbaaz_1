import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PostCategory } from '../backend';
import { getCategoryLabel, getCategoryIcon } from '../utils/postCategories';

interface CategoryFilterProps {
  selectedCategory: PostCategory | null;
  onCategoryChange: (category: PostCategory | null) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories: Array<{ value: PostCategory | null; label: string }> = [
    { value: null, label: 'All' },
    { value: PostCategory.workshops, label: getCategoryLabel(PostCategory.workshops) },
    { value: PostCategory.stageShows, label: getCategoryLabel(PostCategory.stageShows) },
    { value: PostCategory.interviews, label: getCategoryLabel(PostCategory.interviews) },
    { value: PostCategory.theatreNews, label: getCategoryLabel(PostCategory.theatreNews) },
  ];

  return (
    <Tabs
      value={selectedCategory || 'all'}
      onValueChange={(value) => onCategoryChange(value === 'all' ? null : (value as PostCategory))}
    >
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
        {categories.map((category) => {
          const Icon = category.value ? getCategoryIcon(category.value) : null;
          return (
            <TabsTrigger key={category.value || 'all'} value={category.value || 'all'} className="gap-2">
              {Icon && <Icon className="h-4 w-4" />}
              {category.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
