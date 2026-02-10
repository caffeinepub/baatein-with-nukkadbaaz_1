import { PostCategory } from '../backend';
import { Theater, Users, Mic, Newspaper, LucideIcon } from 'lucide-react';

export function getCategoryLabel(category: PostCategory): string {
  switch (category) {
    case PostCategory.workshops:
      return 'Workshops';
    case PostCategory.stageShows:
      return 'Stage Shows';
    case PostCategory.interviews:
      return 'Interviews';
    case PostCategory.theatreNews:
      return 'Theatre News';
    default:
      return 'Unknown';
  }
}

export function getCategoryIcon(category: PostCategory): LucideIcon {
  switch (category) {
    case PostCategory.workshops:
      return Theater;
    case PostCategory.stageShows:
      return Users;
    case PostCategory.interviews:
      return Mic;
    case PostCategory.theatreNews:
      return Newspaper;
    default:
      return Newspaper;
  }
}
