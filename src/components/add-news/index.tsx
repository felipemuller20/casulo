'use client';

import { useRef, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import styles from './add-news.module.css';
import { createNew, deleteNew, readAllNews } from '@/firebase/utils-news';
import { errorAlert } from '@/utils/alerts';
import { storage } from '@/firebase';
import { NewsInfo } from '@/types';

export default function AddNews() {
  const formRef = useRef<HTMLFormElement>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [newsIsOpen, setNewsIsOpen] = useState(false);
  const [allNews, setAllNews] = useState<NewsInfo[]>([]);
  const [selectedNew, setSelectedNew] = useState('');

  async function publishImage() {
    if (imageUpload) {
      const imageRef = ref(storage, `news/covers/${imageUpload.name + v4()}`);
      try {
        const uploadedImage = await uploadBytes(imageRef, imageUpload);
        const imageUrl = await getDownloadURL(uploadedImage.ref);
        return imageUrl;
      } catch (e: any) {
        console.error(e.message);
      }
    }
  }

  function resetEntries() {
    setContent('');
    setTitle('');
    setImageUpload(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      if (!imageUpload) {
        await createNew(title, content, '');
      } else {
        const publishedImage = await publishImage() as string;
        await createNew(title, content, publishedImage);
      }
      formRef.current?.reset();
      resetEntries();
      setLoading(false);
    } catch (e: any) {
      errorAlert('Oops..', e.message);
      setLoading(false);
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setImageUpload(event.target.files[0]);
    }
  }

  async function handleDeleteNews() {
    try {
      setLoading(true);
      const toDelete = allNews.find((news) => news.title === selectedNew);
      if (toDelete) {
        await deleteNew(toDelete.id);
      }
      setLoading(false);
    } catch (e: any) {
      errorAlert('Oops!', e.message);
    }
  }

  async function handleResearchSelect() {
    if (!newsIsOpen) {
      setNewsIsOpen(true);
      const getNews = await readAllNews();
      setAllNews(getNews);
    }
  }

  return (
    <div className={ styles.addNews }>
      <h2>Criar notícia:</h2>
      <form ref={ formRef } onSubmit={ handleSubmit }>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          value={ title }
          onChange={ ({ target }) => setTitle(target.value) }
        />
        <label htmlFor="text">Conteúdo</label>
        <textarea
          id="text"
          value={ content }
          onChange={ ({ target }) => setContent(target.value) }
        />
        <input type="file" accept="image/*" onChange={ handleImageChange } />
        <button disabled={ loading }>Criar notícia</button>
      </form>
      <h2>Deletar notícia:</h2>
      <div>
        <select
          onClick={ handleResearchSelect }
          value={ selectedNew }
          onChange={ ({ target }) => setSelectedNew(target.value) }
        >
          <option value="">Selecione uma notícia</option>
          {newsIsOpen && allNews.map((news) => (
            <option key={ news.id } value={ news.title }>
              {news.title}
            </option>
          ))}
        </select>
        <button onClick={ handleDeleteNews } disabled={ loading }>Deletar</button>
      </div>
    </div>
  );
}
