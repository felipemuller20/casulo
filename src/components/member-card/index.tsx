import styles from './member-card.module.css';

type MemberCardProps = {
  image: string;
  name: string;
  title: string;
  description: string;
};

export default function MemberCard({ image, name, title, description }: MemberCardProps) {
  return (
    <div className={ styles.cardContainer }>
      <img src={ image } alt={ name } />
      <h2>{name}</h2>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
