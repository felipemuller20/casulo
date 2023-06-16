'use client';

import { useState } from 'react';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { storage } from '@/firebase';
import styles from './add-member.module.css';
import MemberCard from '@/components/member-card';
import { errorAlert } from '@/utils/alerts';
import { createMember } from '@/firebase/utils-members';

export default function AddMemberPage() {
  const [name, setName] = useState('Nome');
  const [title, setTitle] = useState('Título');
  const [description, setDescription] = useState('Aqui vai uma descrição');
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const url = URL.createObjectURL(event.target.files[0]);
      setPreviewUrl(url);
      setImageUpload(event.target.files[0]);
    }
  };

  async function publishImage() {
    if (!imageUpload) return errorAlert('Oops..', 'Selecione uma imagem');
    const imageRef = ref(storage, `posts/cover/${imageUpload.name + v4()}`);
    try {
      const uploadedImage = await uploadBytes(imageRef, imageUpload);
      const imageUrl = await getDownloadURL(uploadedImage.ref);
      return imageUrl;
    } catch (e: any) {
      console.error(e.message);
    }
  }

  const handlePublish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const publishedImage = await publishImage() as string;
      await createMember(name, title, description, publishedImage);
      setLoading(false);
      router.push('/members');
    } catch (e: any) {
      errorAlert('Oops..', e.message);
      setLoading(false);
    }
  };

  return (
    <div className={ styles.addMember }>
      <form onSubmit={ handlePublish }>
        <label htmlFor="name">Nome</label>
        <input id="name" onChange={ ({ target }) => setName(target.value) } />
        <label htmlFor="title">Título</label>
        <input id="title" onChange={ ({ target }) => setTitle(target.value) } />
        <label htmlFor="description">Descrição</label>
        <textarea id="description" onChange={ ({ target }) => setDescription(target.value) } />
        <input type="file" accept="image/*" onChange={ handleImageChange } />
        <button disabled={ loading }>Salvar</button>
      </form>
      <MemberCard name={ name } title={ title } description={ description } image={ previewUrl } />
    </div>
  );
}
