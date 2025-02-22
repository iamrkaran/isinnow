import React, { useState } from 'react';
import { Wand2, Copy, Check } from 'lucide-react';
import { generateISIN } from '../utils/isinValidator';

export const ISINGenerator: React.FC = () => {
  const [countryCode, setCountryCode] = useState('US');
  const [securityType, setSecurityType] = useState('EQUITY');
  const [generatedISIN, setGeneratedISIN] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    try {
      const newISIN = generateISIN(countryCode, securityType);
      setGeneratedISIN(newISIN);
    } catch (error) {
      console.error('Error generating ISIN:', error);
    }
  };

  const handleCopy = async () => {
    if (generatedISIN) {
      await navigator.clipboard.writeText(generatedISIN);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-md space-y-4 ">
      <div className="grid grid-cols-2 gap-4">
        <div>
          {/* <label className="block text-sm font-medium text-gray-700">Country Code</label> */}
          <input
            type="text"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
            className=" w-full px-3 py-2 border rounded-md"
            maxLength={2}
          />
        </div>
        <div>
          {/* <label className="block text-sm font-medium text-gray-700">Security Type</label> */}
          <select
            value={securityType}
            onChange={(e) => setSecurityType(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md"
          >
            <option value="EQUITY">Equity</option>
            <option value="BOND">Bond</option>
            <option value="FUND">Fund</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleGenerate}
        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <Wand2 size={20} className="mr-2" />
        Generate ISIN
      </button>

      {generatedISIN && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium text-blue-700">Generated ISIN</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="mt-1 font-mono">{generatedISIN}</p>
        </div>
      )}
    </div>
  );
};