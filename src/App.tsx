import { useState } from "react";
import { ISINValidator } from "./components/ISINValidator";
import { ISINGenerator } from "./components/ISINGenerator";


function App() {
  const [activeTab, setActiveTab] = useState("isin");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center  bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text font-semibold text-lg">
            ISIN 
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab("isin")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "isin"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                ISIN Tools
              </button>
              
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "isin" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                <div>
                  <h2 className="text-lg font-semibold mb-4">ISIN Validator</h2>
                  <ISINValidator />
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-4">ISIN Generator</h2>
                  <ISINGenerator />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                

                
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center  bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text font-semibold text-lg">
            Created by @Ram Karan
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
