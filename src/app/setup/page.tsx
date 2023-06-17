'use client';

import { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import styles from './setup.module.css';
import AddMemberPage from '@/components/add-member';
import AddResearch from '@/components/add-research';

export default function Setup() {
  const [toggleResearch, setToggleReasearch] = useState(false);
  const [toggleMembers, setToggleMembers] = useState(false);

  return (
    <div className={ styles.setupContainer }>

      <button className={ styles.researchToggler } onClick={ () => setToggleReasearch(!toggleResearch) }>
        Pesquisas
        {' '}
        <AiFillCaretDown />
      </button>
      {
        toggleResearch && (<AddResearch />)
      }

      <button className={ styles.researchToggler } onClick={ () => setToggleMembers(!toggleMembers) }>
        Gerenciar membros
        {' '}
        <AiFillCaretDown />
      </button>
      {
        toggleMembers && (<AddMemberPage />)
      }
    </div>
  );
}
