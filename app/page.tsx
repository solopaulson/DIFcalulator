'use client';

import { useState } from 'react';

export default function DecisionTree() {
  const [inputs, setInputs] = useState({
    difficulty: '',
    importance: '',
    frequency: ''
  });
  const [output, setOutput] = useState('');

  const processDecisionTree = (
    difficulty: string,
    importance: string,
    frequency: string
  ): string => {
    // Convert inputs to numbers
    const d = parseFloat(difficulty);
    const i = parseFloat(importance);
    const f = parseFloat(frequency);

    // First level - Difficulty
    if (d >= 3.5) { // Very
      if (i >= 2.5) { // Yes
        if (f >= 3.5) return 'TRAIN';
        if (f >= 2.5) return 'OVERTRAIN';
        return 'OVERTRAIN';
      } else { // No
        if (f >= 3.5) return 'NO TRAIN';
        if (f >= 2.5) return 'TRAIN';
        return 'TRAIN';
      }
    } else if (d >= 2.5) { // Moderate
      if (i >= 2.5) { // Yes
        if (f >= 3.5) return 'TRAIN';
        if (f >= 2.5) return 'OVERTRAIN';
        return 'OVERTRAIN';
      } else { // No
        if (f >= 3.5) return 'NO TRAIN';
        if (f >= 2.5) return 'NO TRAIN';
        return 'TRAIN';
      }
    } else { // No
      if (i >= 2.5) { // Yes
        if (f >= 3.5) return 'NO TRAIN';
        if (f >= 2.5) return 'NO TRAIN';
        return 'TRAIN';
      } else { // No
        return 'NO TRAIN';
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Run the decision tree twice
    const result1 = processDecisionTree(
      inputs.difficulty,
      inputs.importance,
      inputs.frequency
    );
    const result2 = processDecisionTree(
      inputs.difficulty,
      inputs.importance,
      inputs.frequency
    );
    
    // Only set output if results match
    if (result1 === result2) {
      setOutput(result1);
    } else {
      setOutput('Results inconsistent, please try again');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-black tracking-tight">
            DIFcalculator
          </h1>
          <p className="text-xl text-gray-600">
            Enter your values to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
            <label className="block">
              <span className="text-base font-medium text-gray-700 mb-3 block">Difficulty</span>
              <input
                type="number"
                name="difficulty"
                step="0.001"
                min="1.0"
                max="5.0"
                value={inputs.difficulty}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </label>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
            <label className="block">
              <span className="text-base font-medium text-gray-700 mb-3 block">Importance</span>
              <input
                type="number"
                name="importance"
                step="0.001"
                min="1.0"
                max="5.0"
                value={inputs.importance}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </label>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
            <label className="block">
              <span className="text-base font-medium text-gray-700 mb-3 block">Frequency</span>
              <input
                type="number"
                name="frequency"
                step="0.001"
                min="1.0"
                max="5.0"
                value={inputs.frequency}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 px-6 rounded-lg text-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Next
          </button>
        </form>

        {output && (
          <div className="text-center">
            <div className="inline-block px-8 py-4 rounded-xl bg-gray-50 border border-gray-200">
              <h2 className="text-3xl font-bold text-black">
                {output}
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
