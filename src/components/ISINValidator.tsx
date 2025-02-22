import React, { useState } from 'react';
import { Search, Copy, Check, Wrench } from 'lucide-react';
import { validateISIN, fixISIN } from '../utils/isinValidator';

export const ISINValidator: React.FC = () => {
  const [isin, setIsin] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    isin: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleValidation = async () => {
    setIsChecking(true);
    const isValid = validateISIN(isin);
    setValidationResult({ isValid, isin });
    setIsChecking(false);
  };

  const handleFix = () => {
    const fixedISIN = fixISIN(isin);
    if (fixedISIN) {
      setIsin(fixedISIN);
      setValidationResult({ isValid: true, isin: fixedISIN });
    }
  };

  const handleCopy = async () => {
    if (validationResult?.isin) {
      await navigator.clipboard.writeText(validationResult.isin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div>
        <input
          type="text"
          value={isin}
          onChange={(e) => setIsin(e.target.value.toUpperCase())}
          placeholder="Enter ISIN"
          className="w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:outline-none"
          maxLength={12}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleValidation}
          disabled={isChecking || isin.length !== 12}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search size={20} className="mr-2" />
          Validate ISIN
        </button>
        {isin.length >= 11 && (
          <button
            onClick={handleFix}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            <Wrench size={20} className="mr-2" />
            Fix ISIN
          </button>
        )}
      </div>

      {validationResult && (
        <div className={`p-4 rounded-lg ${
          validationResult.isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`font-medium ${
              validationResult.isValid ? 'text-green-700' : 'text-red-700'
            }`}>
              {validationResult.isValid ? 'Valid ISIN' : 'Invalid ISIN'}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="mt-1 font-mono">{validationResult.isin}</p>
        </div>
      )}
    </div>
  );
};