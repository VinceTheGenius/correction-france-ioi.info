"use client";

import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Explorer = () => {
  const [arborescence, setArborescence] = useState<{ [key: string]: any }>({});
  const [fichierSelectionné, setFichierSelectionné] = useState<string | null>(null);
  const [contenuFichier, setContenuFichier] = useState<string | null>(null);
  const [dossiersOuverts, setDossiersOuverts] = useState<{ [key: string]: boolean }>({});
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const fetchArborescence = async () => {
      const response = await fetch("/api/niveau1");
      const data = await response.json();
      setArborescence(data);
    };

    fetchArborescence();
  }, []);

  const handleClickFichier = async (cheminFichier: string) => {
    const response = await fetch(`/niveau1/${cheminFichier}`);
    if (response.ok) {
      const contenu = await response.text();
      setContenuFichier(contenu);
      setFichierSelectionné(cheminFichier);
    } else {
      console.error("Erreur lors du chargement du fichier:", cheminFichier);
    }
  };

  const toggleDossier = (dossier: string) => {
    setDossiersOuverts((prev) => ({
      ...prev,
      [dossier]: !prev[dossier],
    }));
  };

  const renderArborescence = (arborescence: { [key: string]: any }) => {
    return Object.entries(arborescence).map(([nom, contenu]) => (
      <div key={nom} className="mb-2">
        <h3
          className="font-semibold flex items-center cursor-pointer"
          onClick={() => {
            if (typeof contenu === 'object') {
              toggleDossier(nom);
            }
          }}
        >
          <img
            src={
              dossiersOuverts[nom]
                ? "/icons/folder-open.png"
                : "/icons/folder-close.png"
            }
            alt={dossiersOuverts[nom] ? "Dossier ouvert" : "Dossier fermé"}
            className="mr-2 w-5 h-5"
          />
          {nom}
        </h3>
        {dossiersOuverts[nom] && contenu && (
          <ul className="list-disc pl-5">
            {Object.keys(contenu).map((item) => (
              <li
                key={item}
                onClick={() => handleClickFichier(`${nom}/${item}`)}
                className="cursor-pointer hover:bg-gray-200 flex items-center py-1"
              >
                <img
                  src="/icons/file-python.png"
                  alt="Fichier Python"
                  className="mr-2 w-5 h-5"
                />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    ));
  };

  const copyCodeToClipboard = async () => {
    if (contenuFichier) {
      await navigator.clipboard.writeText(contenuFichier);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Bannière en haut */}
      <div className="bg-yellow-300 text-center py-2 font-bold">
        Corrigés du Niveau 1 de France IOI (niveau obligatoire)  
        <div className="flex items-center justify-center mt-2">
          <img
            src="/icons/warning.png"
            alt="Avertissement"
            className="mr-2 w-4 h-4"
          />
          <span className="opacity-75">
            Nb : il est très fortement conseillé de faire les exercices soi-même. Ces corrigés sont uniquement là pour vous débloquer sur certains exercices.
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded-lg shadow-lg overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Arborescence</h2>
          {renderArborescence(arborescence)}
        </div>
        <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow-lg overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Contenu du fichier</h3>
            <button
              onClick={copyCodeToClipboard}
              className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {copied ? "Copié !" : "Copier le code"}
            </button>
          </div>
          {contenuFichier ? (
            <SyntaxHighlighter language="python" style={tomorrow}>
              {contenuFichier}
            </SyntaxHighlighter>
          ) : (
            <div className="text-center text-gray-500">
              Sélectionnez un fichier pour voir le contenu.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explorer;