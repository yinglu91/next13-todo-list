import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Todo App',
  description: 'Generated CRUD todo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        
      >
        <main 
        className={`${inter.className} container mx-auto p-4`}
        >
        {children}
        </main>
      </body>
    </html>
  );
}
