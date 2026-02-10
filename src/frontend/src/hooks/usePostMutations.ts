import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { PostCategory } from '../backend';

interface CreatePostParams {
  title: string;
  content: string;
  category: PostCategory;
}

interface UpdatePostParams {
  id: bigint;
  title: string;
  content: string;
  category: PostCategory;
}

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreatePostParams) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createPost(params.title, params.content, params.category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useUpdatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UpdatePostParams) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updatePost(params.id, params.title, params.content, params.category);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', variables.id.toString()] });
    },
  });
}

export function useDeletePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deletePost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
