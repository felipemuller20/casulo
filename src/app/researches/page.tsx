'use client';

import { useRouter } from 'next/navigation';
import styles from './researches.module.css';

export default function Researches() {
  const router = useRouter();
  return (
    <div className={ styles.researchPage }>
      <h1>O que motiva nossas pesquisas?</h1>
      <p>
        Começos, recomeços, mudanças e transições fazem parte das novas concepções das carreiras,
        impulsionando a realização de discussões e estudos sobre a sustentabilidade no médio e longo prazo.
      </p>
      <button onClick={ () => router.push('/researches/all') }>Conheça nossas pesquisas</button>
    </div>
  );
}
