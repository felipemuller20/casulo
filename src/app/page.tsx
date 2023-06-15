import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={ styles.container }>
      <Image
        className={ styles.escrito }
        src="/casulo-azul-escrito.png"
        alt="CaSulo"
        width={ 1000 }
        height={ 1000 }
      />
    </div>
  );
}
