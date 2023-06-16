import MemberCard from '@/components/member-card';
import styles from './who.module.css';
import data from '@/data.json';

export default function Who() {
  return (
    <div className={ styles.who }>
      <section>
        <h1>Quem somos</h1>
        <main>
          {
          data.map((member, index) => (
            <MemberCard
              key={ index }
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
