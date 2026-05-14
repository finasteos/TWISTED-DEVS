import React from 'react';
import { ShieldCheck, Lock, Globe, Zap, Database, Search } from 'lucide-react';
import { motion } from 'motion/react';

const VAULT_ITEMS = [
  { id: '1', title: 'Swarm Governance Protocol', type: 'Rules', date: '2026-05-12', size: '124kb', status: 'Locked' },
  { id: '2', title: 'Karpachy Wiki - Neural Maps', type: 'Knowledge', date: '2026-05-14', size: '2.4MB', status: 'Active' },
  { id: '3', title: 'Arkitekt v4 Blueprint', type: 'Design', date: '2026-05-14', size: '890kb', status: 'Draft' },
  { id: '4', title: 'Cross-Agent Sync Logic', type: 'Code', date: '2026-05-10', size: '45kb', status: 'Locked' },
];

export const VaultView = () => {
  return (
    <div className="p-8 h-full overflow-y-auto bg-zinc-950">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-purple-500" />
              Knowledge Vault
            </h2>
            <p className="text-zinc-500 mt-2">The most successful and critical information repository.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search the vault..." 
                className="bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 w-64"
              />
            </div>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-purple-900/20 transition-all">
              Index New Knowledge
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left">
                <thead className="bg-zinc-900/80 text-[10px] uppercase tracking-widest text-zinc-500 font-bold border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4">Knowledge Asset</th>
                    <th className="px-6 py-4">Classification</th>
                    <th className="px-6 py-4">Modified</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {VAULT_ITEMS.map((item, idx) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="hover:bg-zinc-800/30 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4 font-medium text-zinc-200">
                        <div className="flex items-center gap-3">
                           <Globe className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                           {item.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-zinc-500">{item.type}</td>
                      <td className="px-6 py-4 text-xs font-mono text-zinc-500">{item.date}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tighter text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded-full bg-zinc-950">
                          <Lock className="w-3 h-3" />
                          {item.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Neural Sync Status
              </h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                    <span>INDEXING PROGRESS</span>
                    <span>94%</span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '94%' }}
                      className="h-full bg-purple-500"
                    />
                  </div>
                </div>
                <div className="p-3 bg-black/40 rounded-lg border border-zinc-800 text-[10px] font-mono text-zinc-500 space-y-2">
                  <p className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-green-500" />
                    Vault-1 (Primary): ONLINE
                  </p>
                  <p className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-green-500" />
                    Vault-2 (Backup): ACTIVE
                  </p>
                  <p className="flex items-center gap-2 text-zinc-700">
                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                    Vault-3 (Cold): DORMANT
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-4">
               <Database className="w-12 h-12 text-zinc-800 mx-auto" />
               <h4 className="font-bold text-zinc-300">Sync to External Cloud</h4>
               <p className="text-xs text-zinc-500 leading-relaxed">Backup your critical knowledge to Interplanetary File System (IPFS) or encrypted AWS S3 buckets.</p>
               <button className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-bold transition-all border border-zinc-700">
                 Configure Remotes
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
