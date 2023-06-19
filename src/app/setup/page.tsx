'use client';

import { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import styles from './setup.module.css';
import AddMemberPage from '@/components/add-member';
import AddResearch from '@/components/add-research';
import AddNews from '@/components/add-news';

export default function Setup() {
  const [toggleResearch, setToggleReasearch] = useState(false);
  const [toggleMembers, setToggleMembers] = useState(false);
  const [toggleNews, setToggleNews] = useState(false);

  return (
    <div className={ styles.setupContainer }>

      <button className={ styles.toggler } onClick={ () => setToggleReasearch(!toggleResearch) }>
        Gerenciar pesquisas
        {' '}
        <AiFillCaretDown />
      </button>
      {toggleResearch && (<AddResearch />)}

      <button className={ styles.toggler } onClick={ () => setToggleMembers(!toggleMembers) }>
        Gerenciar membros
        {' '}
        <AiFillCaretDown />
      </button>
      {toggleMembers && (<AddMemberPage />)}

      <button className={ styles.toggler } onClick={ () => setToggleNews(!toggleNews) }>
        Gerenciar notícias
        {' '}
        <AiFillCaretDown />
      </button>
      {toggleNews && <AddNews />}
    </div>
  );
}
