import React from 'react';

interface CodexProps {
  relics: string[];
  npcs: string[];
  enemies: string[];
}

const Codex: React.FC<CodexProps> = ({ relics, npcs, enemies }) => {
  return (
    <div className="pt-20 space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">📖 Codex</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Relics Discovered</h3>
            <ul className="list-disc list-inside space-y-1">
              {relics.map(r => (
                <li key={r} className="text-gray-300">{r}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">NPCs Encountered</h3>
            <ul className="list-disc list-inside space-y-1">
              {npcs.map(n => (
                <li key={n} className="text-gray-300">{n}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Enemy Types</h3>
            <ul className="list-disc list-inside space-y-1">
              {enemies.map(e => (
                <li key={e} className="text-gray-300">{e}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Codex;