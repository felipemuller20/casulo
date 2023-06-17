'use client';

import { useState } from 'react';
import styles from './add-research.module.css';
import { createResearch, deleteResearch, readAllResearches } from '@/firebase/utils-researches';
import { errorAlert } from '@/utils/alerts';
import { ResearchInfo } from '@/types';

export default function AddResearch() {
  const [loading, setLoading] = useState(false);
  const [researchTitle, setResearchTitle] = useState('');
  const [researchLink, setResearchLink] = useState('');
  const [allResearches, setAllResearches] = useState<ResearchInfo[]>([]);
  const [researchIsOpen, setResearchIsOpen] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState('');

  async function publishNewResearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      await createResearch(researchTitle, researchLink);
      setLoading(false);
      setResearchTitle('');
      setResearchLink('');
    } catch (e: any) {
      errorAlert('Erro!', e.message);
      setLoading(false);
    }
  }

  async function handleResearchSelect() {
    if (!researchIsOpen) {
      setResearchIsOpen(true);
      const getResearches = await readAllResearches();
      setAllResearches(getResearches);
    }
  }

  async function handleDeleteResearch() {
    try {
      setLoading(true);
      const toDelete = allResearches.find((research) => research.title === selectedResearch);
      if (toDelete) {
        await deleteResearch(toDelete.id);
      }
      setLoading(false);
    } catch (e: any) {
      errorAlert('Oops!', e.message);
    }
  }

  return (
    <div className={ styles.setupContainer }>
      <div className={ styles.researchesContainer }>
        <h2>Criar pesquisa:</h2>
        <form onSubmit={ publishNewResearch }>
          <label htmlFor="researchTitle">Título da pesquisa</label>
          <input
            id="researchTitle"
            value={ researchTitle }
            onChange={ ({ target }) => setResearchTitle(target.value) }
          />
          <label htmlFor="researchLink">Link para a pesquisa</label>
          <input
            id="researchLink"
            value={ researchLink }
            onChange={ ({ target }) => setResearchLink(target.value) }
            placeholder="https://www..."
          />
          <button disabled={ loading }>Cadastrar pesquisa</button>
        </form>
        <h2>Deletar pesquisa:</h2>
        <div>
          <select
            onClick={ handleResearchSelect }
            value={ selectedResearch }
            onChange={ ({ target }) => setSelectedResearch(target.value) }
          >
            <option value="">Selecione uma pesquisa</option>
            {researchIsOpen && allResearches.map((research) => (
              <option key={ research.id } value={ research.title }>
                {research.title}
              </option>
            ))}
          </select>
          <button onClick={ handleDeleteResearch } disabled={ loading }>Deletar</button>
        </div>
      </div>
    </div>
  );
}
