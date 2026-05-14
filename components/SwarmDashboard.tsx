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
import { INITIAL_AGENTS } from '../store';
import { ShieldAlert, Zap, SlidersHorizontal, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const nodeTypes = {
  agent: AgentNode,
};

export const SwarmDashboard = () => {
  const [criticHardcore, setCriticHardcore] = useState(50);
  const [activeAgents, setActiveAgents] = useState(['a1']); // Start with just Orchestrator
  
  const initialNodes = useMemo(() => {
    return INITIAL_AGENTS.filter(a => activeAgents.includes(a.id)).map((agent, index) => ({
      id: agent.id,
      type: 'agent',
      data: { ...agent },
      position: { x: index * 250, y: index * 100 },
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
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-red-400 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> CRITIC HARDCORE LEVEL
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
          className="flex items-center gap-2 px-3 py-1.5 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 rounded text-[10px] font-bold uppercase tracking-widest text-purple-400 transition-all"
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
          fitView
          defaultZoom={1.5}
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
      </div>
    </div>
  );
};
