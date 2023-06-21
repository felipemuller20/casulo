import NewSkeleton from '@/components/news-card-skeleton';
import styles from './news.module.css';

export default function Loading() {
  return (
    <div className={ styles.newsPage }>
      <main>
        <NewSkeleton />
        <NewSkeleton />
        <NewSkeleton />
      </main>
    </div>
  );
}
