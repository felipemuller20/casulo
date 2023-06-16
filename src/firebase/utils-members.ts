import { collection, getDocs, query, orderBy, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '.';
import { MemberInfo } from '@/types';
import { successAlert, errorAlert } from '@/utils/alerts';

export async function readAllMembers() {
  const docs: MemberInfo[] = [];
  const q = query(collection(db, 'members'), orderBy('name'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
    docs.push({ ...(document.data() as MemberInfo), id: document.id });
  });
  return docs;
}

export async function createMember(name: string, title: string, description: string, image: string): Promise<void> {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (!name || !title || !description) return reject(new Error('Todas as informações devem ser preenchidas.'));
        if (!image) return reject(new Error('Adicione uma imagem.'));

        try {
          const memberRef = collection(db, 'members');
          const q = query(collection(db, 'members'), where('name', '==', name)); // verifica se a pessoa já não está registrada
          const querySnapshot = await getDocs(q);

          if (querySnapshot.size === 0) {
            const docRef = await addDoc(memberRef, { name, image, title, description, createdAt: serverTimestamp() });
            successAlert('Feito!', `Membro criado com ID: ${docRef.id}`);
            resolve();
          } else {
            reject(new Error(`Já existe um membro com o nome ${name}`));
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
