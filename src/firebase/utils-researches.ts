import { collection, getDocs, query, orderBy, where, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '.';
import { ResearchInfo } from '@/types';
import { successAlert, errorAlert } from '@/utils/alerts';

export async function readAllResearches() {
  const docs: ResearchInfo[] = [];
  const q = query(collection(db, 'researches'), orderBy('title'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
    docs.push({ ...(document.data() as ResearchInfo), id: document.id });
  });
  return docs;
}

export async function createResearch(title: string, link: string): Promise<void> {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (!title || !link) return reject(new Error('Todas as informações devem ser preenchidas.'));
        try {
          const researchRef = collection(db, 'researches');
          const q = query(collection(db, 'researches'), where('title', '==', title)); // verifica se não existe outra pesquisa com o mesmo título
          const querySnapshot = await getDocs(q);

          if (querySnapshot.size === 0) {
            const docRef = await addDoc(researchRef, { title, link });
            successAlert('Feito!', `Pesquisa criada com ID: ${docRef.id}`);
            resolve();
          } else {
            reject(new Error(`A pesquisa ${title} já está registrada.`));
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

export async function deleteResearch(id: string) {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const docRef = doc(db, 'researches', id);
        await deleteDoc(docRef);
        successAlert('Feito!', `Pesquisa com id ${id} deletada com sucesso.`);
      } catch (e: any) {
        errorAlert('Oopss..', `Erro ao deletar: ${e.message}`);
      }
    } else {
      errorAlert('Usuário não autenticado!', 'Faça o login para continuar.');
    }
  });
}
