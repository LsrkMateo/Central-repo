import React, { useState } from "react";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CodeBlock = ({ code, language = "", copyable = true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mb-4 dark:bg-gray-900 p-4 rounded-md bg-gray-300">
      {language && (
        <div className="mb-2">
          <span className="font-semibold text-gray-600">{language}</span>
        </div>
      )}

      <div className="relative">
        {copyable && (
          <CopyToClipboard text={code} onCopy={handleCopy}>
            <button
              className="absolute top-1 right-1 p-1 text-xs text-white bg-blue-500 hover:bg-blue-600 rounded-md cursor-pointer"
              title="Copiar código"
            >
              {copied ? "Copiado" : "Copiar"}
            </button>
          </CopyToClipboard>
        )}

        <code className="xs:text-xs sm:text-sm block lg:text-lg xl:text-3xl dark:bg-gray-950 dark:text-white bg-gray-200 p-2 rounded-md ">
          {code}
        </code>
      </div>
    </div>
  );
};

CodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  copyable: PropTypes.bool,
};

export default CodeBlock;
