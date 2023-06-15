'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RxHamburgerMenu } from 'react-icons/rx';
import { GrClose } from 'react-icons/gr';
import { useState } from 'react';
import Image from 'next/image';
import styles from './navbar.module.css';

function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navRoutes = [
    {
      name: 'Sobre nós',
      link: '/about',
    },
    {
      name: 'Quem somos',
      link: '/who',
    },
    {
      name: 'Nossas pesquisas',
      link: '/researches',
    },
    {
      name: 'Notícias',
      link: '/news',
    },
    {
      name: 'Contato',
      link: '/contact',
    },
  ];

  function handleMenu() {
    setOpen(!open);
  }

  return (
    <div className={ `${styles.navbarPage}` }>
      <nav className={ `${styles.navbar}` }>
        <section>
          <Link href="/">
            <Image
              className={ `${styles.logo}` }
              src="/casulinho.png"
              alt="CaSulo"
              height={ 500 }
              width={ 500 }
              onClick={ () => setOpen(false) }
            />
          </Link>
        </section>
        {
          open ? (
            <GrClose
              onClick={ () => handleMenu() }
              className={ `${styles.hamburgerMenu}` }
            />
          ) : (
            <RxHamburgerMenu
              onClick={ () => handleMenu() }
              className={ `${styles.hamburgerMenu}` }
            />
          )
        }

        <ul className={ `${styles.navigation}` }>
          {
            navRoutes.map(({ name, link }) => (
              <li key={ name }>
                <Link
                  href={ link }
                  className={
                    `${pathname === link ? styles.active : ''}
                    ${styles.navlink}
                    ${styles.beforeActive}`
                  }
                >
                  {name}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
      <ul className={ `${styles.mobileNavigation} ${open && styles.show}` }>
        {
              navRoutes.map(({ name, link }) => (
                <li
                  key={ name }
                  className={ `${styles.showLi}` }
                >
                  <Link
                    onClick={ () => setOpen(false) }
                    href={ link }
                    className={
                      `${pathname === link ? styles.active : ''}
                      ${styles.navlink}`
                    }
                  >
                    {name}
                  </Link>
                </li>
              ))
            }
      </ul>
    </div>
  );
}

export default NavBar;
