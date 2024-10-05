import React from "react";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div>
      <h1>404 - Page non trouvée</h1>
      <p>Cette page n&apos;existe pas.</p>
      <Link href="/">Retour à la page principale</Link>
    </div>
  );
};

export default Custom404;