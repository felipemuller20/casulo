import MemberCard from '@/components/member-card';
import styles from './members.module.css';
import { readAllMembers } from '@/firebase/utils-members';
import { sortByAngela } from '@/utils/angelaAlwaysFirst';

export default async function Members() {
  const allMembers = await readAllMembers();
  const members = sortByAngela(allMembers);

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
