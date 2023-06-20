import styles from './news-skeleton-card.module.css';

export default function NewSkeleton() {
  return (
    <div className={ styles.container }>
      <div className={ styles.title } />
      <div className={ styles.image } />
      <div className={ styles.content } />
      <div className={ styles.content } />
      <div className={ styles.content } />
      <div className={ styles.content } />
    </div>
  );
}
