import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Fonction asynchrone pour obtenir la structure des fichiers et dossiers
const getFiles = async (dir: string): Promise<Record<string, unknown>> => {
  const files = await fs.readdir(dir);
  const structure: Record<string, unknown> = {};

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = await fs.stat(fullPath);
    
    if (stat.isDirectory()) {
      // Récursion pour les dossiers
      structure[file] = await getFiles(fullPath);
    } else {
      // Les fichiers sont ajoutés directement
      structure[file] = null;
    }
  }

  return structure;
};

export async function GET() {
  try {
    const niveau1Dir = path.join(process.cwd(), 'public', 'niveau1');
    const fileTree = await getFiles(niveau1Dir);
    return NextResponse.json(fileTree);
  } catch (error) {
    console.error('Erreur lors de la récupération de l’arborescence :', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des fichiers' }, { status: 500 });
  }
}