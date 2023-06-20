import { BsInstagram, BsLinkedin } from 'react-icons/bs';
import styles from './contact.module.css';

export default function ContactPage() {
  return (
    <div className={ `${styles.contact}` }>
      <h1>Conheça nossas redes sociais</h1>
      <main className={ `${styles.main}` }>
        <div className={ `${styles.container}` }>
          <a className={ `${styles.a}` } href="https://www.instagram.com/casulocarreiras/" target="_blank" rel="noreferrer">
            <BsInstagram className={ `${styles.icon} ${styles.instagram}` } />
            <span>@casulocarreiras</span>
          </a>
        </div>
        <div className={ `${styles.container}` }>
          <a className={ `${styles.a}` } href="https://www.linkedin.com/company/casulo-carreiras/" target="_blank" rel="noreferrer">
            <BsLinkedin className={ `${styles.icon} ${styles.fb}` } />
            <span>Casulo Carreiras</span>
          </a>
        </div>
      </main>
    </div>
  );
}
