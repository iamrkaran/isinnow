import { useState } from "react";
import { ISINValidator } from "./components/ISINValidator";
import { ISINGenerator } from "./components/ISINGenerator";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [activeTab, setActiveTab] = useState("isin");

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Glass UI wrapper for main content */}
        <div className="backdrop-blur-md bg-white/30 shadow-lg border border-white/20 rounded-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-white/20">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab("isin")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition ${
                  activeTab === "isin"
                    ? "border-violet-500 text-violet-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                ISIN Tools
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {activeTab === "isin" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">ISIN Validator</h2>
                  <ISINValidator />
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">ISIN Generator</h2>
                  <ISINGenerator />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Add more tabs here if needed */}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
