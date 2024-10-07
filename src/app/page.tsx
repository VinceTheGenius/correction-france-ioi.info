"use client";

import { useState, useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image"; // Import de la balise Image
import Link from 'next/link'; // Import du lien mailto

// Interface pour le contenu
interface Arborescence {
    [key: string]: Record<string, string> | null;
}

const Explorer = () => {
    const [arborescence, setArborescence] = useState<Arborescence>({});
    const [contenuFichier, setContenuFichier] = useState<string | null>(null);
    const [dossiersOuverts, setDossiersOuverts] = useState<Record<string, boolean>>({});
    const [copied, setCopied] = useState<boolean>(false);
    const contenuSectionRef = useRef<HTMLDivElement | null>(null); // Ref pour la section du contenu

    useEffect(() => {
        const fetchArborescence = async () => {
            const response = await fetch("/api/niveau1");
            const data: Arborescence = await response.json();
            setArborescence(data);
        };

        fetchArborescence();
    }, []);

    const handleClickFichier = async (cheminFichier: string) => {
        const response = await fetch(`/niveau1/${cheminFichier}`);
        if (response.ok) {
            const contenu = await response.text();
            setContenuFichier(contenu);

            // Déclencher le scroll après avoir chargé le contenu
            setTimeout(() => {
                if (contenuSectionRef.current) {
                    const rect = contenuSectionRef.current.getBoundingClientRect();
                    const screenHeight = window.innerHeight;

                    // Si le contenu est long, défiler jusqu'à afficher la section en haut
                    if (rect.height > screenHeight) {
                        window.scrollTo({
                            top: contenuSectionRef.current.offsetTop,
                            behavior: "smooth",
                        });
                    } else {
                        // Sinon, faire défiler pour centrer
                        const scrollOffset = screenHeight - rect.height;
                        window.scrollTo({
                            top: contenuSectionRef.current.offsetTop - scrollOffset / 2,
                            behavior: "smooth",
                        });
                    }
                }
            }, 100); // Légère attente pour être sûr que tout est chargé
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

    const renderArborescence = (arbo: Arborescence) => {
        return Object.entries(arbo).map(([nom, contenu]) => (
            <div key={nom} className="mb-2">
                <h3
                    className="font-semibold flex items-center cursor-pointer"
                    onClick={() => {
                        if (typeof contenu === "object" && contenu !== null) {
                            toggleDossier(nom);
                        }
                    }}
                >
                    <Image
                        src={
                            dossiersOuverts[nom]
                                ? "/icons/folder-open.png"
                                : "/icons/folder-close.png"
                        }
                        alt={dossiersOuverts[nom] ? "Dossier ouvert" : "Dossier fermé"}
                        width={20}
                        height={20}
                        className="mr-2"
                    />
                    {nom}
                </h3>
                {dossiersOuverts[nom] && contenu && (
                    <ul className="list-disc pl-5">
                        {Object.keys(contenu).map((item) => (
                            <li
                                key={item}
                                onClick={() => handleClickFichier(`${nom}/${item}`)}
                                className="cursor-pointer py-1 flex items-center transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-contentBg dark:hover:text-white"
                            >
                                <Image
                                    src="/icons/file-python.png"
                                    alt="Fichier Python"
                                    width={20}
                                    height={20}
                                    className="mr-2"
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
            <div className="bg-yellow-300 text-center py-2 font-bold text-black">
                Correction du Niveau 1 de France IOI (niveau obligatoire) <br />
                Les corrigés des autres niveaux arrivent très prochainement.
                <div className="flex items-center justify-center mt-2">
                    <Image
                        src="/icons/warning.png"
                        alt="Avertissement"
                        width={16}
                        height={16}
                        className="mr-2"
                    />
                    <span className="opacity-70 text-black">
                        Nb : il est très fortement conseillé de faire les exercices
                        soi-même. Ces corrigés sont uniquement là pour vous débloquer sur
                        certains exercices.
                    </span>
                </div>
            </div>
            <div className="flex flex-col md:flex-row flex-grow">
                <div className="w-full md:w-1/3 p-4 bg-sidebarBg rounded-lg shadow-lg overflow-y-auto">
                    <h2 className="text-lg font-bold mb-4">Arborescence</h2>
                    {renderArborescence(arborescence)}
                </div>
                <div
                    ref={contenuSectionRef} // Référence pour le scroll
                    className="w-full md:w-2/3 p-4 bg-contentBg rounded-lg shadow-lg overflow-y-auto"
                >
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
            {/* Footer */}
            <footer className="bg-gray-200 text-center py-2 text-black">
                <span>
                    Pour toute question ou demande d&apos;ajout d&apos;autre langage (C++), veuillez nous contacter :{' '}
                    <Link href="mailto:contact@correction-france-ioi.site" className="underline text-blue-600">
                        contact@correction-france-ioi.site
                    </Link>
                </span>
            </footer>
        </div>
    );
};

export default Explorer;