'use client';

import { useState, useEffect } from 'react';
import MemberCard from '@/components/member-card';
import styles from './members.module.css';
import { readAllMembers } from '@/firebase/utils-members';
import { MemberInfo } from '@/types';
import MemberCardSkeleton from '@/components/member-card-skeleton';
import { sortByAngela } from '@/utils/angelaAlwaysFirst';

export default function Members() {
  const [members, setMembers] = useState<MemberInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      const allMembers = await readAllMembers();
      const newList = sortByAngela(allMembers);
      setMembers(newList);
      setLoading(false);
    }
    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className={ styles.loading }>
        <MemberCardSkeleton />
        <MemberCardSkeleton />
        <MemberCardSkeleton />
        <MemberCardSkeleton />
      </div>
    );
  }

  return (
    <div className={ styles.member }>
      <section>
        <h1>Quem somos</h1>
        <main>
          {
          members.map((member) => (
            <MemberCard
              key={ member.id }
              name={ member.name }
              title={ member.title }
              image={ member.image }
              description={ member.description }
            />
          ))
        }
        </main>
      </section>
    </div>
  );
}
