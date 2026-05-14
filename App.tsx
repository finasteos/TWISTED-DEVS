import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { SwarmDashboard } from './components/SwarmDashboard';
import { CliHarnessView } from './components/CliHarnessView';
import { KanbanBoard } from './components/KanbanBoard';
import { CommunicationLog } from './components/CommunicationLog';
import { Settings } from './components/Settings';
import { INITIAL_AGENTS, INITIAL_TASKS, INITIAL_LOGS } from './store';
import { Activity, ShieldAlert, Cpu, LayoutPanelLeft, MessageSquareText } from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  React.useEffect(() => {
    if (activeTab === 'settings') {
      setIsSidebarExpanded(true);
    }
  }, [activeTab]);

  const [showPanels, setShowPanels] = useState(true);
  const [agents] = useState(INITIAL_AGENTS);
  const [tasks] = useState(INITIAL_TASKS);
  const [logs] = useState(INITIAL_LOGS);

  const totalTokens = agents.reduce((acc, a) => acc + a.tokensUsed, 0);

  return (
    <div className="h-[100dvh] w-screen bg-zinc-950 text-zinc-100 flex overflow-hidden font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      
      <main className="flex-1 flex flex-col min-w-0 bg-dot-grid relative overflow-hidden">
        <header className="h-14 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-zinc-200 capitalize tracking-tight flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-500" /> 
              {activeTab === 'cli' ? 'CLI Harnesses' : activeTab.replace('-', ' ')}
            </h2>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-mono text-zinc-400">
            {activeTab === 'dashboard' && (
              <button 
                onClick={() => setShowPanels(!showPanels)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded border transition-all text-[10px] font-bold uppercase tracking-wider",
                  showPanels ? "border-zinc-700 text-zinc-300 bg-zinc-800" : "border-zinc-800 text-zinc-500"
                )}
              >
                <LayoutPanelLeft className="w-3 h-3" />
                HUD Panels
              </button>
            )}
            <div className="w-px h-4 bg-zinc-800" />
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Swarm Total: <span className="text-zinc-200">{totalTokens.toLocaleString()}</span>
            </div>
            <div className="w-px h-4 bg-zinc-800" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="hidden sm:inline">Operational</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' ? (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full relative flex"
              >
                <div className="flex-1 relative overflow-hidden">
                  <SwarmDashboard />
                </div>

                {/* Overlying Panels for Dashboard */}
                <AnimatePresence>
                  {showPanels && (
                    <motion.div
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 300 }}
                      className="absolute right-4 top-4 bottom-4 w-96 flex flex-col gap-4 z-40 pointer-events-none"
                    >
                      <div className="flex-1 bg-zinc-950/90 border border-zinc-800/80 backdrop-blur-xl rounded-2xl p-4 overflow-hidden pointer-events-auto shadow-2xl flex flex-col">
                        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <LayoutPanelLeft className="w-3 h-3 text-blue-400" /> Swarm Kanban
                        </h4>
                        <div className="flex-1 overflow-hidden">
                           <KanbanBoard tasks={tasks} agents={agents} />
                        </div>
                      </div>

                      <div className="h-1/3 bg-zinc-950/90 border border-zinc-800/80 backdrop-blur-xl rounded-2xl p-4 overflow-hidden pointer-events-auto shadow-2xl flex flex-col">
                        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <MessageSquareText className="w-3 h-3 text-purple-400" /> Comms Stream
                        </h4>
                        <div className="flex-1 overflow-hidden">
                          <CommunicationLog logs={logs} agents={agents} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : activeTab === 'cli' ? (
              <motion.div
                key="cli"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full"
              >
                <CliHarnessView />
              </motion.div>
            ) : activeTab === 'settings' ? (
              <motion.div
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <Settings />
              </motion.div>
            ) : (
              <motion.div 
                key="fallback"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center flex-col text-zinc-500 gap-4"
              >
                <ShieldAlert className="w-12 h-12 opacity-50" />
                <p>Module '{activeTab}' is currently offline.</p>
                <button 
                  onClick={() => setActiveTab('dashboard')} 
                  className="px-4 py-2 mt-4 text-sm font-medium bg-zinc-800 text-zinc-200 rounded-md hover:bg-zinc-700 transition"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

