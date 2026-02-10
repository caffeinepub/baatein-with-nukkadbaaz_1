import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Post, PostCategory } from '../backend';

export function usePosts() {
  const { actor, isFetching } = useActor();

  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePost(postId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Post | null>({
    queryKey: ['post', postId?.toString()],
    queryFn: async () => {
      if (!actor || !postId) return null;
      try {
        return await actor.getPost(postId);
      } catch (error) {
        console.error('Error fetching post:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!postId,
  });
}

export function useFilteredPosts(category: PostCategory | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Post[]>({
    queryKey: ['posts', 'filtered', category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.filterPostsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}
