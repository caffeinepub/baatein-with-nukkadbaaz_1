import { useState, useEffect } from 'react';
import { usePost } from '../../hooks/usePosts';
import { useCreatePost, useUpdatePost } from '../../hooks/usePostMutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PostCategory } from '../../backend';
import { getCategoryLabel } from '../../utils/postCategories';
import { Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { setPostCoverImage, setPostExcerpt, getPostCoverImage, getPostExcerpt } from '../../utils/postMetaStorage';

interface PostEditorProps {
  postId: string | null;
  onClose: () => void;
}

const coverImageOptions = [
  { value: '/assets/generated/baatein-post-placeholder.dim_1200x630.png', label: 'Default Theatre' },
  { value: '/assets/generated/baatein-hero.dim_1600x600.png', label: 'Stage Curtains' },
];

export default function PostEditor({ postId, onClose }: PostEditorProps) {
  const { data: existingPost } = usePost(postId ? BigInt(postId) : null);
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PostCategory>(PostCategory.theatreNews);
  const [coverImage, setCoverImage] = useState(coverImageOptions[0].value);
  const [excerpt, setExcerpt] = useState('');

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
      setCategory(existingPost.category);
      setCoverImage(getPostCoverImage(existingPost.id.toString()));
      setExcerpt(getPostExcerpt(existingPost.id.toString(), existingPost.content));
    }
  }, [existingPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (postId && existingPost) {
        await updatePost.mutateAsync({
          id: existingPost.id,
          title,
          content,
          category,
        });
        setPostCoverImage(postId, coverImage);
        setPostExcerpt(postId, excerpt);
        toast.success('Post updated successfully');
      } else {
        const newPostId = await createPost.mutateAsync({
          title,
          content,
          category,
        });
        setPostCoverImage(newPostId.toString(), coverImage);
        setPostExcerpt(newPostId.toString(), excerpt);
        toast.success('Post created successfully');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save post');
      console.error(error);
    }
  };

  const isLoading = createPost.isPending || updatePost.isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">{postId ? 'Edit Post' : 'Create New Post'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as PostCategory)}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(PostCategory).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {getCategoryLabel(cat)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image</Label>
            <Select value={coverImage} onValueChange={setCoverImage}>
              <SelectTrigger id="coverImage">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {coverImageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <img src={coverImage} alt="Preview" className="mt-2 h-32 w-full rounded object-cover" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary of the post (optional)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              rows={12}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button type="submit" disabled={isLoading} className="gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? 'Saving...' : 'Save Post'}
          </Button>
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading} className="gap-2">
            <X className="h-4 w-4" />
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
