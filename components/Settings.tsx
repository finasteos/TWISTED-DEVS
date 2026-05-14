import React from 'react';
import { TerminalSquare, Key, Database, Cpu } from 'lucide-react';

export const Settings = () => {
  return (
    <div className="p-6 max-w-4xl max-h-full overflow-y-auto">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Settings</h2>
      
      <div className="space-y-8">
        <section className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2 border-b border-zinc-800 pb-2">
            <TerminalSquare className="w-5 h-5 text-zinc-400" />
            CLI Harnesses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Claude Code', 'Codex', 'Gemini CLI', 'Kimi Code', 'Hermes Agent'].map(cli => (
              <div key={cli} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-semibold">{cli}</div>
                  <div className="text-xs text-zinc-500 mt-1 font-mono">Installed & Ready</div>
                </div>
                <div className="w-10 h-6 bg-green-500/20 rounded-full flex items-center p-1 border border-green-500/30">
                  <div className="w-4 h-4 bg-green-500 rounded-full shadow-md ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2 border-b border-zinc-800 pb-2">
            <Database className="w-5 h-5 text-zinc-400" />
            Memory Systems
          </h3>
          <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Qdrant Vector DB</div>
                <div className="text-xs text-zinc-500 font-mono">Status: Up • docker-compose.qdrant.yml</div>
              </div>
              <button className="px-3 py-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors">Restart</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">OpenViking Context DB</div>
                <div className="text-xs text-zinc-500 font-mono">Status: Connected • viking://workspace</div>
              </div>
              <button className="px-3 py-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors">Restart</button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2 border-b border-zinc-800 pb-2">
            <Cpu className="w-5 h-5 text-zinc-400" />
            System Maintenance
          </h3>
          <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
            <div className="text-sm text-zinc-300">
              Run full Arkitekt Update (Topgrade wrapper via <span className="font-mono text-zinc-400">UPDATE_ALL.sh</span>)
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-md transition-colors">
              Run Update Now
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
