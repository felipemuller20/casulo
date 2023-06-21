import styles from './all-researches.module.css';
import { readAllResearches } from '@/firebase/utils-researches';

export default async function AllResearches() {
  const researches = await readAllResearches();

  return (
    <div className={ styles.allContainer }>
      <h1>Nossas pesquisas</h1>
      <ul>
        {
        researches.map((research) => (
          <li
            key={ research.id }
          >
            <a href={ research.link } target="_blank" rel="noreferrer">
              { research.title }
            </a>
          </li>
        ))
      }
      </ul>
    </div>
  );
}
