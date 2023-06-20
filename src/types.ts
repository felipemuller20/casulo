import { Timestamp } from 'firebase/firestore';

export type MemberInfo = {
  image: string;
  name: string;
  title: string;
  description: string;
  id?: string;
};

export type ResearchInfo = {
  title: string;
  link: string;
  id: string;
};

export type NewsInfo = {
  title: string;
  text: string;
  image?: string;
  id: string;
  createdAt: Timestamp;
};
