import { MemberInfo } from '../../types';
import styles from './member-card.module.css';

export default function MemberCard({ image, name, title, description }: MemberInfo) {
  return (
    <div className={ styles.cardContainer }>
      <img src={ image } alt={ name } />
      <h2>{name}</h2>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
