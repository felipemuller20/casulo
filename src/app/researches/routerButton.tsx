'use client';

import { useRouter } from 'next/navigation';

type RouterButtonProps = {
  route: string;
  children: React.ReactNode;
};

export default function RouterButton({ route, children }: RouterButtonProps) {
  const router = useRouter();
  return (
    <button onClick={ () => router.push(route) }>{children}</button>
  );
}
