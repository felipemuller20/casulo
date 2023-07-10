import Image from 'next/image';
import { Timestamp } from 'firebase/firestore';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './news-card.module.css';
import { convertToDate } from '@/utils/dateFormat';

type NewsCardProps = {
  title: string;
  text: string;
  image?: string;
  creation?: Timestamp;
};

export default function NewsCard({ title, text, image, creation }: NewsCardProps) {
  return (
    <div className={ styles.newsCard }>
      <h2>{title}</h2>
      <section>
        { image && <Image src={ image } alt={ title } width={ 1000 } height={ 1000 } />}
        <ReactMarkdown remarkPlugins={ [remarkGfm] }>
          {text}
        </ReactMarkdown>
      </section>
      {creation && <span>{convertToDate(creation)}</span>}
    </div>
  );
}
