import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  MarkerType,
  Connection,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { AgentNode } from './nodes/AgentNode';
import { INITIAL_AGENTS, INITIAL_LOGS } from '../store';
import { ShieldAlert, Zap, SlidersHorizontal, Activity, MessageSquareText, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { CommunicationLog } from './CommunicationLog';

const nodeTypes = {
  agent: AgentNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 2.5 };

export const SwarmDashboard = () => {
  const [criticHardcore, setCriticHardcore] = useState(50);
  const [activeAgents, setActiveAgents] = useState(['a1']);
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(false);
  
  const initialNodes = useMemo(() => {
    return INITIAL_AGENTS.filter(a => activeAgents.includes(a.id)).map((agent, index) => ({
      id: agent.id,
      type: 'agent',
      data: { ...agent },
      position: { x: index * 300, y: index * 150 },
    }));
  }, [activeAgents]);

  const initialEdges = useMemo(() => {
    const edges: Edge[] = [];
    if (activeAgents.includes('a1') && activeAgents.includes('a4')) {
      edges.push({ 
        id: 'e1-4', source: 'a1', target: 'a4', animated: true, 
        label: 'Directing', 
        style: { stroke: '#a855f7' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#a855f7' }
      });
    }
     if (activeAgents.includes('a4') && activeAgents.includes('a2')) {
      edges.push({ 
        id: 'e4-2', source: 'a4', target: 'a2', animated: true, 
        label: 'Submit for Review', 
        style: { stroke: '#ef4444' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' }
      });
    }
    return edges;
  }, [activeAgents]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const simulateSwarmExpansion = () => {
    if (!activeAgents.includes('a4')) {
      setActiveAgents(prev => [...prev, 'a4']);
    } else if (!activeAgents.includes('a2')) {
      setActiveAgents(prev => [...prev, 'a2', 'a3']);
    } else if (!activeAgents.includes('a5')) {
      setActiveAgents(prev => [...prev, 'a5']);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-black/20">
      {/* Top Control Bar */}
      <div className="p-4 border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-md flex items-center justify-between z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Swarm Integrity: 98%</span>
          </div>
          
          <div className="flex items-center gap-4 border-l border-zinc-800 pl-6">
             <div className="flex flex-col gap-1">
                <div 
                  className="flex items-center justify-between"
                  id="dashboard-metrics-container"
                >
                  <label className="text-[10px] font-bold uppercase tracking-widest text-red-400 flex items-center gap-1">
                    <ShieldAlert 
                      className="w-3 h-3" 
                      style={{ backgroundColor: '#1c1f14' }}
                    /> CRITIC HARDCORE LEVEL
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500 font-bold">{criticHardcore}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={criticHardcore} 
                  onChange={(e) => setCriticHardcore(parseInt(e.target.value))}
                  className="w-48 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
             </div>
          </div>
        </div>

        <button 
          onClick={simulateSwarmExpansion}
          style={{
            backgroundColor: '#223542',
            borderColor: '#deb0b0',
            color: '#723a3a'
          }}
          className="flex items-center gap-2 px-3 py-1.5 border rounded text-[10px] font-bold uppercase tracking-widest transition-all"
        >
          <Zap className="w-3 h-3" />
          Stimulate Deployment
        </button>
      </div>

      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultViewport={defaultViewport}
          minZoom={0.5}
          maxZoom={4}
          className="bg-dot-grid"
        >
          <Background color="#18181b" gap={20} />
          <Controls className="!bg-zinc-900 !border-zinc-800 !fill-zinc-400 shadow-xl" />
          <MiniMap 
            nodeColor={(n) => {
              if (n.id === 'a1') return '#a855f7';
              if (n.id === 'a2') return '#ef4444';
              return '#3f3f46';
            }} 
            className="!bg-zinc-950 !border-zinc-800"
            maskColor="rgba(0,0,0,0.5)"
          />
        </ReactFlow>

        {/* Dynamic Legend / State HUD */}
        <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-xl shadow-2xl z-10 w-64">
           <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
             <SlidersHorizontal className="w-3 h-3" /> Deployment Metrics
           </h4>
           <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Active Nodes</span>
                <span className="text-zinc-100 font-mono">{activeAgents.length}/5</span>
              </div>
              <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                 <div className="bg-purple-500 h-full transition-all duration-700" style={{ width: `${(activeAgents.length/5)*100}%` }} />
              </div>
              <div className="mt-4 p-2 bg-zinc-900/50 rounded border border-zinc-800/50">
                 <p className="text-[9px] text-zinc-500 leading-tight">
                    {activeAgents.length < 5 
                      ? "Swarm scaling initiated. Detecting upcoming requirements..." 
                      : "Swarm at full capacity. All systems optimized."}
                 </p>
              </div>
           </div>
        </div>

        {/* Floating Command Console & Trace */}
        <motion.div 
          initial={false}
          animate={{ 
            height: isConsoleExpanded ? '300px' : '40px',
            width: isConsoleExpanded ? '600px' : '200px'
          }}
          className="absolute bottom-6 left-6 bg-zinc-950/90 border border-zinc-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl z-50 flex flex-col"
        >
          <button 
            onClick={() => setIsConsoleExpanded(!isConsoleExpanded)}
            className="h-10 px-4 flex items-center justify-between hover:bg-white/5 transition-colors shrink-0"
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-3 h-3 text-purple-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Command Console</span>
            </div>
            {isConsoleExpanded ? <ChevronDown className="w-3 h-3 text-zinc-600" /> : <ChevronUp className="w-3 h-3 text-zinc-600" />}
          </button>
          
          <div className="flex-1 overflow-hidden grid grid-cols-2 divide-x divide-zinc-800/50">
             <div className="flex flex-col p-4 overflow-hidden">
                <h5 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <MessageSquareText className="w-2.5 h-2.5 text-blue-400" /> Live Trace
                </h5>
                <div className="flex-1 overflow-hidden">
                   <CommunicationLog logs={INITIAL_LOGS} agents={INITIAL_AGENTS} />
                </div>
             </div>
             <div className="p-4 bg-black/40 font-mono text-[10px] space-y-2 overflow-y-auto custom-scrollbar">
                <div className="flex items-start gap-2">
                  <span className="text-purple-500">orchestrator:</span>
                  <span className="text-zinc-300">Evaluating swarm expansion requirements...</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-500">orchestrator:</span>
                  <span className="text-zinc-300">Stimulating development agent nodes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">system:</span>
                  <span className="text-zinc-500 italic">Nodes a2, a3, a4 connected to cluster.</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-purple-500">orchestrator:</span>
                  <span className="text-zinc-100 animate-pulse">_</span>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
