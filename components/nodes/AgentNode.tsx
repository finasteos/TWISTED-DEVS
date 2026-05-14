import React from 'react';
import { Handle, Position } from 'reactflow';
import { cn } from '../../lib/utils';
import { Brain, Cpu, ShieldAlert, Activity } from 'lucide-react';

export const AgentNode = ({ data }: { data: any }) => {
  const Icon = data.role === 'orchestrator' ? Brain : 
               data.role === 'critic' ? ShieldAlert :
               data.role === 'memory_keeper' ? Activity : Cpu;

  return (
    <div className={cn(
      "px-4 py-2 shadow-2xl rounded-xl bg-zinc-900 border-2 transition-all w-48",
      data.status === 'working' ? "border-green-500 shadow-green-500/20" : 
      data.status === 'idle' ? "border-blue-500/50 shadow-blue-500/10" : "border-zinc-800"
    )}>
      <Handle type="target" position={Position.Top} className="w-16 !bg-zinc-700 !border-none" />
      
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn(
          "w-4 h-4",
          data.role === 'orchestrator' ? 'text-purple-400' :
          data.role === 'critic' ? 'text-red-400' :
          data.role === 'memory_keeper' ? 'text-blue-400' : 'text-zinc-400'
        )} />
        <span className="font-mono text-[10px] font-bold text-zinc-300 uppercase tracking-tighter truncate">
          {data.name}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-[9px] text-zinc-500 font-mono flex items-center justify-between">
          STATUS 
          <span className={cn(
            "font-bold uppercase",
            data.status === 'working' ? 'text-green-500' : 'text-zinc-600'
          )}>{data.status}</span>
        </div>
        
        {data.currentTask && (
          <div className="text-[8px] text-zinc-400 mt-1 line-clamp-1 italic border-t border-zinc-800 pt-1">
             Task: {data.currentTask}
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-16 !bg-zinc-700 !border-none" />
    </div>
  );
};
