import { Inter } from 'next/font/google';
import NavBar from '@/components/navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CaSulo',
  description: 'Laboratório de Estudos em Carreiras e Sustentabilidade',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
