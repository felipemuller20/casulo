import { collection, getDocs, query, orderBy, where, addDoc, serverTimestamp,
  doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '.';
import { NewsInfo } from '@/types';
import { successAlert, errorAlert } from '@/utils/alerts';

export async function readAllNews() {
  const docs: NewsInfo[] = [];
  const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
    docs.push({ ...(document.data() as NewsInfo), id: document.id });
  });
  return docs;
}

export async function createNew(title: string, text: string, image: string): Promise<void> {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (!title || !text) return reject(new Error('Insira um título e um texto.'));

        try {
          const newsRef = collection(db, 'news');
          const q = query(newsRef, where('title', '==', title)); // verifica se não existe outro com o mesmo título
          const querySnapshot = await getDocs(q);

          if (querySnapshot.size === 0) {
            const docRef = await addDoc(newsRef, { title, text, image, createdAt: serverTimestamp() });
            successAlert('Feito!', `Notícia criado com ID: ${docRef.id}`);
            resolve();
          } else {
            reject(new Error(`A notícia ${title} já foi cadastrada anteriormente.`));
          }
        } catch (e: any) {
          reject(new Error(`Erro ao criar o documento: ${e.message}`));
        }
      } else {
        errorAlert('Usuário não autenticado!', 'Faça o login para continuar.');
        reject(new Error('Usuário não autenticado! Faça o login para continuar.'));
      }
    });
  });
}

export async function deleteNew(id: string) {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const docRef = doc(db, 'news', id);
        await deleteDoc(docRef);
        successAlert('Feito!', `Notícia com id ${id} deletada com sucesso.`);
      } catch (e: any) {
        errorAlert('Oopss..', `Erro ao deletar: ${e.message}`);
      }
    } else {
      errorAlert('Usuário não autenticado!', 'Faça o login para continuar.');
    }
  });
}
