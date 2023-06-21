import MemberCardSkeleton from '@/components/member-card-skeleton';
import styles from './members.module.css';

export default function Loading() {
  return (
    <div className={ styles.loading }>
      <MemberCardSkeleton />
      <MemberCardSkeleton />
      <MemberCardSkeleton />
      <MemberCardSkeleton />
    </div>
  );
}
