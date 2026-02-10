import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useAdmin } from '../hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import AdminPostList from '../components/admin/AdminPostList';
import PostEditor from '../components/admin/PostEditor';
import { useState } from 'react';

export default function AdminPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  if (!identity) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-16">
        <div className="text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold">Admin Access Required</h1>
          <p className="mb-8 text-muted-foreground">Please sign in to access the admin panel.</p>
          <Button onClick={login} disabled={loginStatus === 'logging-in'} className="gap-2">
            <LogIn className="h-4 w-4" />
            {loginStatus === 'logging-in' ? 'Logging in...' : 'Sign In'}
          </Button>
        </div>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">Checking permissions...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-16">
        <div className="text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-serif text-3xl font-bold md:text-4xl">Admin Panel</h1>
        <p className="text-muted-foreground">Manage your theatre blog posts.</p>
      </div>

      {(isCreating || editingPostId) && (
        <div className="mb-8">
          <PostEditor
            postId={editingPostId}
            onClose={() => {
              setIsCreating(false);
              setEditingPostId(null);
            }}
          />
        </div>
      )}

      {!isCreating && !editingPostId && (
        <AdminPostList
          onCreateNew={() => setIsCreating(true)}
          onEdit={(postId) => setEditingPostId(postId)}
        />
      )}
    </div>
  );
}
