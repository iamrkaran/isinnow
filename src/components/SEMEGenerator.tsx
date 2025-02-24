import React, { useState } from "react";
import { Wand2, Copy, Check, Plus, X } from "lucide-react";

interface CustomCurrency {
  code: string;
  name: string;
}

export const SEMEGenerator: React.FC = () => {
  const [currency, setCurrency] = useState("USD");
  const [generatedSEME, setGeneratedSEME] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customCurrencies, setCustomCurrencies] = useState<CustomCurrency[]>(
    []
  );
  const [newCurrencyCode, setNewCurrencyCode] = useState("");
  const [newCurrencyName, setNewCurrencyName] = useState("");

  const defaultCurrencies = [
    { code: "USD", name: "US Dollar" },
    { code: "GHS", name: "Ghana Cedi" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "INR", name: "Indian Rupee" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "ZAR", name: "South African Rand" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "KES", name: "Kenyan Shilling" },
    { code: "TZS", name: "Tanzanian Shilling" },
    { code: "ZMW", name: "Zambian Kwacha" },
    { code: "MWK", name: "Malawian Kwacha" },
    { code: "ZWL", name: "Zimbabwean Dollar" },
    { code: "MAD", name: "Moroccan Dirham" },
    { code: "DZD", name: "Algerian Dinar" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "GMD", name: "Gambian Dalasi" },
    { code: "GHS", name: "Ghanaian Cedi" },
    { code: "KES", name: "Kenyan Shilling" },
    { code: "NAD", name: "Namibian Dollar" },
    { code: "NGN", name: "Nigerian Naira" }
    
  ];

  const generateRandomString = (length: number): string => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  const handleGenerate = () => {
    
    const time = generateRandomString(4);
    const randomPart = generateRandomString(4);
    const seme = `SEME${currency}${time}${randomPart}`;
    setGeneratedSEME(seme);
  };

  const handleCopy = async () => {
    if (generatedSEME) {
      await navigator.clipboard.writeText(generatedSEME);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddCustomCurrency = () => {
    if (newCurrencyCode && newCurrencyName) {
      setCustomCurrencies([
        ...customCurrencies,
        { code: newCurrencyCode.toUpperCase(), name: newCurrencyName },
      ]);
      setNewCurrencyCode("");
      setNewCurrencyName("");
      setShowCustomForm(false);
    }
  };

  const handleRemoveCustomCurrency = (code: string) => {
    setCustomCurrencies(customCurrencies.filter((c) => c.code !== code));
    if (currency === code) {
      setCurrency("USD");
    }
  };

  return (
    <div >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <optgroup label="Default Currencies">
                {defaultCurrencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} - {curr.name}
                  </option>
                ))}
              </optgroup>
              {customCurrencies.length > 0 && (
                <optgroup label="Custom Currencies">
                  {customCurrencies.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.code} - {curr.name}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Wand2 size={20} className="mr-2" />
            Generate SEME
          </button>

          {generatedSEME && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium text-blue-700">
                  Generated SEME
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="mt-1 font-mono">{generatedSEME}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Custom Currencies
            </h3>

            {customCurrencies.map((curr) => (
              <div
                key={curr.code}
                className="flex items-center justify-between py-2"
              >
                <span className="text-sm text-gray-600">
                  {curr.code} - {curr.name}
                </span>
                <button
                  onClick={() => handleRemoveCustomCurrency(curr.code)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {!showCustomForm ? (
              <button
                onClick={() => setShowCustomForm(true)}
                className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <Plus size={16} className="mr-1" />
                Add Custom Currency
              </button>
            ) : (
              <div className="mt-3 space-y-3">
                <div>
                  <input
                    type="text"
                    value={newCurrencyCode}
                    onChange={(e) =>
                      setNewCurrencyCode(e.target.value.toUpperCase())
                    }
                    placeholder="Currency Code (e.g., EUR)"
                    maxLength={3}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={newCurrencyName}
                    onChange={(e) => setNewCurrencyName(e.target.value)}
                    placeholder="Currency Name (e.g., Euro)"
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddCustomCurrency}
                    disabled={!newCurrencyCode || !newCurrencyName}
                    className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowCustomForm(false);
                      setNewCurrencyCode("");
                      setNewCurrencyName("");
                    }}
                    className="flex-1 px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
