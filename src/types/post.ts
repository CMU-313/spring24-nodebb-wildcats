import { CategoryObject } from './category';
import { TopicObject } from './topic';
import { UserObjectSlim } from './user';

export type PostObject = {
  pid: number;
  tid: number;
  content: string;
  uid: number;
  timestamp: number;
  deleted: boolean;
  upvotes: number;
  downvotes: number;
  votes: number;
  timestampISO: string;
  user: UserObjectSlim;
  topic: TopicObject;
  category: CategoryObject;
  isMainPost: boolean;
  isAnonymous: boolean | null;
  replies: number;
  isEnglish: boolean;
  translatedContent: string | null | undefined;
};
