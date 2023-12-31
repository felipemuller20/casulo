import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { successAlert, errorAlert } from '@/utils/alerts';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log('Tipo de persistência da sessão definido com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao definir o tipo de persistência da sessão: ', error);
  });

export function isAuthenticated() {
  return !!auth.currentUser; // retorna bool com certeza
}

export async function authenticateLogin(event: React.FormEvent<HTMLFormElement>, email: string, password: string, router: AppRouterInstance) {
  event.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    successAlert('Feito!', 'Login realizado com sucesso');
    router.push('/setup');
  } catch (e: any) {
    errorAlert('Erro ao realizar o login', 'Usuário ou senha incorretos.');
  }
}
