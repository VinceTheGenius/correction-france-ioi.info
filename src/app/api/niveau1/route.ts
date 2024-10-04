import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Fonction pour obtenir la structure des fichiers et dossiers
const getFiles = (dir: string): Record<string, any> => {
  const files = fs.readdirSync(dir);
  const structure: Record<string, any> = {};

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const isDirectory = fs.statSync(fullPath).isDirectory();

    if (isDirectory) {
      // Récursion pour les dossiers
      structure[file] = getFiles(fullPath);
    } else {
      // Les fichiers sont ajoutés directement
      structure[file] = null; // ou vous pouvez mettre le chemin relatif du fichier
    }
  });

  return structure;
};

export async function GET() {
  const niveau1Dir = path.join(process.cwd(), 'public', 'niveau1');
  const fileTree = getFiles(niveau1Dir);
  return NextResponse.json(fileTree);
}