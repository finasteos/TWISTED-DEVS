import React, { useState } from 'react';
import { TerminalSquare, Download, CheckCircle2, Loader2, Play } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const CLIS = [
  { id: 'claude', name: 'Claude Code', version: 'v1.4.2', description: 'Anthropic native developer CLI', installed: true },
  { id: 'codex', name: 'OpenAI Codex', version: 'v2.1.0', description: 'OpenAI background computer use harness', installed: true },
  { id: 'gemini', name: 'Gemini CLI', version: 'v0.9.8', description: 'Google Cloud SDK integrated tools', installed: false },
  { id: 'hermes', name: 'Hermes Agent', version: 'v3.0.1', description: 'Nous Research agentic workflow', installed: true },
  { id: 'kimi', name: 'Kimi Code', version: 'v1.1.0', description: 'Moonshot long-context developer CLI', installed: false },
];

export const CliHarnessView = () => {
  const [installingAll, setInstallingAll] = useState(false);
  const [installedClis, setInstalledClis] = useState(CLIS.map(c => c.installed));

  const handleInstallAll = async () => {
    setInstallingAll(true);
    // Simulate interactive installation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setInstalledClis(CLIS.map(() => true));
    setInstallingAll(false);
  };

  return (
    <div className="p-6 space-y-6 max-h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-1 flex items-center gap-2">
            <TerminalSquare className="w-6 h-6 text-blue-400" />
            CLI Harnesses
          </h2>
          <p className="text-zinc-500 text-sm">Manage and provision agentic command line interfaces.</p>
        </div>
        
        <button
          onClick={handleInstallAll}
          disabled={installingAll}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all",
            installingAll 
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
          )}
        >
          {installingAll ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Provisioning...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Install All Dependencies
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CLIS.map((cli, idx) => (
          <motion.div
            key={cli.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm hover:border-zinc-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-zinc-200">{cli.name}</h3>
                  <span className="text-[10px] font-mono text-zinc-500">{cli.version}</span>
                </div>
                {installedClis[idx] ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                )}
              </div>
              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                {cli.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
              <span className={cn(
                "text-[10px] uppercase font-bold tracking-widest",
                installedClis[idx] ? "text-green-500/70" : "text-zinc-600"
              )}>
                {installedClis[idx] ? 'Ready' : 'Pending'}
              </span>
              <button 
                className={cn(
                  "px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors",
                  installedClis[idx] 
                    ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                    : "bg-blue-600/10 text-blue-400 hover:bg-blue-600/20"
                )}
              >
                <Play className="w-3 h-3" />
                {installedClis[idx] ? 'Run' : 'Install'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-xl border border-zinc-800 bg-black text-xs font-mono text-zinc-400 overflow-hidden">
        <div className="flex items-center justify-between mb-2 border-b border-zinc-900 pb-2">
          <span className="text-zinc-500">Live Installation Logs</span>
          <span className="text-green-500/50">Live</span>
        </div>
        <div className="space-y-1">
          <p className="text-blue-400">$ arkitekt provision --all-clis</p>
          <p>[SYSTEM] Verifying environment for Python 3.11... OK</p>
          <p>[SYSTEM] Checking Node.js v20.12.0... OK</p>
          <p>[CLAUDE] Setting up KAIROS daemon... <span className="text-green-500">Done</span></p>
          <p className="animate-pulse">_</p>
        </div>
      </div>
    </div>
  );
};
