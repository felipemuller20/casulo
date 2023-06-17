'use client';

import { useEffect, useState } from 'react';
import styles from './all-researches.module.css';
import { readAllResearches } from '@/firebase/utils-researches';
import { ResearchInfo } from '@/types';

export default function AllResearches() {
  const [researches, setResearches] = useState<ResearchInfo[]>([]);
  useEffect(() => {
    async function fetchResearches() {
      const getAll = await readAllResearches();
      setResearches(getAll);
    }
    fetchResearches();
  }, []);

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
