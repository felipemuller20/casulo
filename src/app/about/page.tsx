import styles from './about.module.css';

export default function About() {
  return (
    <div className={ styles.about }>
      <h1>O que somos?</h1>
      <p>
        Somos um laboratório de estudos e pesquisas em carreiras,
        um centro de inovação com ênfase na sustentabilidade.
      </p>
      <p>
        O CaSuLo é ponto de encontro entre a academia,
        mercado e profissionais para análise das tendências na construção das carreiras contemporâneas.
      </p>
      <h1>Por que "CaSuLo" ?</h1>
      <p>
        O CaSuLo representa um movimento para a transformação e desenvolvimento. Assim como as experiências das trajetórias de carreira, as pesquisas também são dinâmicas,
        passando por momentos de incubação, maturação e transformação.
      </p>
    </div>
  );
}
