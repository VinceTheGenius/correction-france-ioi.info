// app/404.tsx

import Link from 'next/link';
import { FC } from 'react';

const Custom404: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl mb-4">Page introuvable</h2>
      <p className="mb-6">Désolé, la page que vous cherchez n'existe pas.</p>
      <Link href="/">
        <a className="text-blue-500 hover:underline">Retour à l'accueil</a>
      </Link>
    </div>
  );
};

export default Custom404;