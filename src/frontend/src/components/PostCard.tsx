import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { Post } from '../backend';
import { getCategoryLabel, getCategoryIcon } from '../utils/postCategories';
import { getPostCoverImage, getPostExcerpt } from '../utils/postMetaStorage';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const categoryLabel = getCategoryLabel(post.category);
  const CategoryIcon = getCategoryIcon(post.category);
  const coverImage = getPostCoverImage(post.id.toString());
  const excerpt = getPostExcerpt(post.id.toString(), post.content);
  const formattedDate = new Date(Number(post.timestamp) / 1000000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link to="/posts/$postId" params={{ postId: post.id.toString() }}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-video overflow-hidden">
          <img
            src={coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="secondary" className="gap-1.5">
              <CategoryIcon className="h-3 w-3" />
              {categoryLabel}
            </Badge>
          </div>
          <h3 className="line-clamp-2 font-serif text-xl font-semibold leading-tight transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">{excerpt}</p>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {formattedDate}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
