import React from "react";
import Link from "next/link";

function SubCard({ href, children }) {
  return (
    <Link href={href} className="boton-link">
      <div
        className={`p-4 rounded shadow-lg dark:bg-gray-800 dark:text-white text-black transition-all hover:brightness-75 hover:dark:brightness-125 `}
      >
        {children}
      </div>
    </Link>
  );
}

export default SubCard;
