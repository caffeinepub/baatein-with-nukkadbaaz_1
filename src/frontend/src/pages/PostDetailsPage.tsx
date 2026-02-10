import { useParams, Link } from '@tanstack/react-router';
import { usePost } from '../hooks/usePosts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Edit } from 'lucide-react';
import { getCategoryLabel, getCategoryIcon } from '../utils/postCategories';
import { useAdmin } from '../hooks/useAdmin';
import { getPostCoverImage } from '../utils/postMetaStorage';

export default function PostDetailsPage() {
  const { postId } = useParams({ from: '/posts/$postId' });
  const { data: post, isLoading } = usePost(BigInt(postId));
  const { isAdmin } = useAdmin();

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 h-8 w-32 animate-pulse rounded bg-muted" />
          <div className="mb-4 h-12 animate-pulse rounded bg-muted" />
          <div className="mb-8 h-96 animate-pulse rounded-lg bg-muted" />
          <div className="space-y-4">
            <div className="h-4 animate-pulse rounded bg-muted" />
            <div className="h-4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-4 font-serif text-3xl font-bold">Post Not Found</h1>
        <p className="mb-8 text-muted-foreground">The post you're looking for doesn't exist.</p>
        <Link to="/posts">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Posts
          </Button>
        </Link>
      </div>
    );
  }

  const categoryLabel = getCategoryLabel(post.category);
  const CategoryIcon = getCategoryIcon(post.category);
  const coverImage = getPostCoverImage(post.id.toString());
  const formattedDate = new Date(Number(post.timestamp) / 1000000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/posts">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Posts
          </Button>
        </Link>

        <article>
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <Badge variant="secondary" className="gap-1.5">
                <CategoryIcon className="h-3.5 w-3.5" />
                {categoryLabel}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </div>
              {isAdmin && (
                <Link to="/admin" search={{ editPostId: postId }}>
                  <Button variant="outline" size="sm" className="ml-auto gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </Link>
              )}
            </div>
            <h1 className="mb-6 font-serif text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <img
              src={coverImage}
              alt={post.title}
              className="w-full rounded-lg object-cover shadow-lg"
              style={{ maxHeight: '500px' }}
            />
          </header>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
