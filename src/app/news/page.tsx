'use client';

import { useEffect, useState } from 'react';
import styles from './news.module.css';
import { readAllNews } from '@/firebase/utils-news';
import { NewsInfo } from '@/types';
import NewsCard from '@/components/news-card';
import NewSkeleton from '@/components/news-card-skeleton';

export default function NewsPage() {
  const [news, setNews] = useState<NewsInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      const allNews = await readAllNews();
      setNews(allNews);
      setLoading(false);
    }
    fetchNews();
  }, []);

  if (loading) {
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

  return (
    <div className={ styles.newsPage }>
      <h1>Notícias</h1>
      <main>
        {
          news.map((n) => (
            <NewsCard
              creation={ n.createdAt }
              title={ n.title }
              text={ n.text }
              key={ n.id }
              image={ n.image }
            />
          ))
        }
      </main>
    </div>
  );
}
