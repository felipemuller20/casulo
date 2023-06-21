import { MemberInfo } from '@/types';

export function sortByAngela(list: MemberInfo[]) {
  const newList = list.sort((a, b) => {
    if (a.name === 'Angela Beatriz Busato Scheffer') {
      return -1; // a deve aparecer antes de b
    } if (b.name === 'Angela Beatriz Busato Scheffer') {
      return 1; // b deve aparecer antes de a
    }
    return 0; // a ordem não importa
  });
  return newList;
}
