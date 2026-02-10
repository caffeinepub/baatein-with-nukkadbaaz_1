const COVER_IMAGE_PREFIX = 'post_cover_';
const EXCERPT_PREFIX = 'post_excerpt_';

export function setPostCoverImage(postId: string, imageUrl: string): void {
  try {
    localStorage.setItem(`${COVER_IMAGE_PREFIX}${postId}`, imageUrl);
  } catch (error) {
    console.warn('Failed to store cover image:', error);
  }
}

export function getPostCoverImage(postId: string): string {
  try {
    const stored = localStorage.getItem(`${COVER_IMAGE_PREFIX}${postId}`);
    return stored || '/assets/generated/baatein-post-placeholder.dim_1200x630.png';
  } catch (error) {
    console.warn('Failed to retrieve cover image:', error);
    return '/assets/generated/baatein-post-placeholder.dim_1200x630.png';
  }
}

export function setPostExcerpt(postId: string, excerpt: string): void {
  try {
    localStorage.setItem(`${EXCERPT_PREFIX}${postId}`, excerpt);
  } catch (error) {
    console.warn('Failed to store excerpt:', error);
  }
}

export function getPostExcerpt(postId: string, fallbackContent: string): string {
  try {
    const stored = localStorage.getItem(`${EXCERPT_PREFIX}${postId}`);
    if (stored) return stored;
    
    // Generate excerpt from content (first 150 characters)
    return fallbackContent.substring(0, 150) + (fallbackContent.length > 150 ? '...' : '');
  } catch (error) {
    console.warn('Failed to retrieve excerpt:', error);
    return fallbackContent.substring(0, 150) + (fallbackContent.length > 150 ? '...' : '');
  }
}
