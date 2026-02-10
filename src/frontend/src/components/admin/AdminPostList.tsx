import { usePosts } from '../../hooks/usePosts';
import { useDeletePost } from '../../hooks/usePostMutations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { getCategoryLabel } from '../../utils/postCategories';
import { toast } from 'sonner';

interface AdminPostListProps {
  onCreateNew: () => void;
  onEdit: (postId: string) => void;
}

export default function AdminPostList({ onCreateNew, onEdit }: AdminPostListProps) {
  const { data: posts, isLoading } = usePosts();
  const deletePost = useDeletePost();

  const handleDelete = async (postId: bigint) => {
    try {
      await deletePost.mutateAsync(postId);
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post');
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-serif">All Posts</CardTitle>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id.toString()}
                className="flex items-center justify-between rounded-lg border border-border/40 p-4"
              >
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="font-semibold">{post.title}</h3>
                    <Badge variant="secondary">{getCategoryLabel(post.category)}</Badge>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{post.content}</p>
                </div>
                <div className="ml-4 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(post.id.toString())} className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Post</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{post.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(post.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <p>No posts yet. Create your first post to get started!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
