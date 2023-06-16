import styles from './member-card-skeleton.module.css';

export default function MemberCardSkeleton() {
  return (
    <div className={ styles.container }>
      <div className={ styles.image } />
      <div className={ styles.info }>
        <div className={ styles.name } />
        <div className={ styles.title } />
        <div className={ styles.content } />
        <div className={ styles.content } />
        <div className={ styles.content } />
      </div>
    </div>
  );
}
