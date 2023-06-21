import styles from './researches.module.css';
import RouterButton from './routerButton';

export default function Researches() {
  return (
    <div className={ styles.researchPage }>
      <h1>O que motiva nossas pesquisas?</h1>
      <p>
        Começos, recomeços, mudanças e transições fazem parte das novas concepções das carreiras,
        impulsionando a realização de discussões e estudos sobre a sustentabilidade no médio e longo prazo.
      </p>
      <RouterButton route="/researches/all">Conheça nossas pesquisas</RouterButton>
    </div>
  );
}
