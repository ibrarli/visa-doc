// app/visa-checklists/page.tsx
'use client';

import { useState } from 'react';
import Navbar from '../components/global/Navbar';
import Sidebar from '../components/global/Sidebar';
import { VISA_CHECKLISTS_DATA } from '../data/visaChecklists';

export default function VisaChecklists() {
  const [selectedCountry, setSelectedCountry] = useState('australia');
  const [selectedSubclass, setSelectedSubclass] = useState('309');

  const currentCountryData = VISA_CHECKLISTS_DATA[selectedCountry];
  const currentSubclassData = currentCountryData?.subclasses.find(
    (sub) => sub.id === selectedSubclass
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1  p-4 sm:p-8 flex flex-col gap-6 max-w-5xl mx-auto w-full">
          {/* Feature Intro */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 tracking-tight">
              Community Visa Checklists
            </h1>
            <p className="text-sm text-gray-500">
              Select your path to view crowd-sourced document frameworks recommended by visa success stories.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-5 bg-white border border-gray-100 rounded-xl shadow-xs">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Target Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  // Automatically fallback default selection to first available subitem index trace
                  const firstSub = VISA_CHECKLISTS_DATA[e.target.value]?.subclasses[0]?.id;
                  setSelectedSubclass(firstSub || '');
                }}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 bg-white text-gray-700 font-medium focus:outline-none focus:border-gray-400 text-sm"
              >
                {Object.entries(VISA_CHECKLISTS_DATA).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.flag} {value.countryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Visa Category / Subclass
              </label>
              <select
                value={selectedSubclass}
                onChange={(e) => setSelectedSubclass(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 bg-white text-gray-700 font-medium focus:outline-none focus:border-gray-400 text-sm"
              >
                {currentCountryData?.subclasses.map((subclass) => (
                  <option key={subclass.id} value={subclass.id}>
                    {subclass.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Requirements Render Workspace */}
          {currentSubclassData ? (
            <div className="flex flex-col gap-8">
              {/* Active description box panel */}
              <div className="p-4 bg-gray-900 text-white rounded-xl shadow-xs flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  Active Framework
                </span>
                <h2 className="text-lg font-bold">{currentSubclassData.name}</h2>
                <p className="text-xs text-gray-300 font-medium">{currentSubclassData.description}</p>
              </div>

              {/* Loop through sections */}
              {currentSubclassData.sections.map((section, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {section.sectionTitle}
                    </h3>
                    {section.sectionDescription && (
                      <p className="text-xs text-gray-400">{section.sectionDescription}</p>
                    )}
                  </div>

                  {/* Responsive Table Design wrapper */}
                  <div className="w-full overflow-x-auto border border-gray-100 rounded-xl bg-white shadow-xs">
                    <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-400">
                          <th className="px-5 py-3.5 w-1/4">Required Evidence</th>
                          <th className="px-5 py-3.5 w-5/12">Standard Definition</th>
                          <th className="px-5 py-3.5 w-1/4">Community Insight Tips</th>
                          <th className="px-5 py-3.5 w-1/12 text-center">Priority</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                        {section.items.map((item, itemIdx) => (
                          <tr key={itemIdx} className="hover:bg-gray-50/50 transition">
                            <td className="px-5 py-4 font-bold text-gray-900">
                              {item.document}
                            </td>
                            <td className="px-5 py-4 text-xs text-gray-500 leading-relaxed">
                              {item.description}
                            </td>
                            <td className="px-5 py-4 text-xs text-amber-600 bg-amber-50/30 font-medium italic leading-normal">
                              {item.communityTip ? (
                                <span>💡 {item.communityTip}</span>
                              ) : (
                                <span className="text-gray-300 not-italic">No custom tip added yet.</span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-center">
                              <span
                                className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md
                                  ${item.priority === 'High' 
                                    ? 'bg-red-50 text-red-600' 
                                    : item.priority === 'Medium'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'bg-gray-100 text-gray-500'
                                  }
                                `}
                              >
                                {item.priority}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400 border border-dashed border-gray-200 rounded-xl text-sm font-medium">
              No checklist framework structured for this combination yet.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}