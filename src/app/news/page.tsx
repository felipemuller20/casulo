import styles from './news.module.css';
import { readAllNews } from '@/firebase/utils-news';
import NewsCard from '@/components/news-card';

export default async function NewsPage() {
  const news = await readAllNews();

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
