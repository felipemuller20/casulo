'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import windowOrGlobal from 'window-or-global';
import styles from './page.module.css';

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(windowOrGlobal.innerWidth);
      setIsImageLoaded(true);
    }

    handleResize();

    windowOrGlobal.addEventListener('resize', handleResize);
    return () => windowOrGlobal.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={ styles.container }>
      { isImageLoaded && (
        <Image
          className={ styles.escrito }
          src={ windowWidth < 700 ? '/full-logo.png' : '/casulo-azul-escrito.png' }
          alt="CaSulo"
          width={ 1000 }
          height={ 1000 }
          key={ windowWidth }
        />
      ) }
    </div>
  );
}
