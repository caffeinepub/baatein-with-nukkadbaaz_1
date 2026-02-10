import { useState } from 'react';
import { usePosts, useFilteredPosts } from '../hooks/usePosts';
import PostCard from '../components/PostCard';
import CategoryFilter from '../components/CategoryFilter';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAdmin } from '../hooks/useAdmin';
import { Link } from '@tanstack/react-router';
import { PostCategory } from '../backend';

export default function PostsPage() {
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | null>(null);
  const { data: allPosts, isLoading: allLoading } = usePosts();
  const { data: filteredPosts, isLoading: filteredLoading } = useFilteredPosts(selectedCategory);
  const { isAdmin } = useAdmin();

  const posts = selectedCategory ? filteredPosts : allPosts;
  const isLoading = selectedCategory ? filteredLoading : allLoading;

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-2 font-serif text-3xl font-bold md:text-4xl">Theatre Posts</h1>
          <p className="text-muted-foreground">
            Explore the latest news, workshops, shows, and interviews from the world of theatre.
          </p>
        </div>
        {isAdmin && (
          <Link to="/admin">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Post
            </Button>
          </Link>
        )}
      </div>

      <div className="mb-8">
        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id.toString()} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No posts found in this category.</p>
        </div>
      )}
    </div>
  );
}
