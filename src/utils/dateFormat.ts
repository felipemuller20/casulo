import { Timestamp } from 'firebase/firestore';

export function convertToDate(date: Timestamp) {
  const newDate = date.toDate();
  const ddmmyyyy = newDate.toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
  return ddmmyyyy;
}
