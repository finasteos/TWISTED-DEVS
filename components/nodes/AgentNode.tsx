import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { cn } from '../../lib/utils';
import { Brain, Cpu, ShieldAlert, Activity } from 'lucide-react';

export const AgentNode = memo(({ data }: { data: any }) => {
  const Icon = data.role === 'orchestrator' ? Brain : 
               data.role === 'critic' ? ShieldAlert :
               data.role === 'memory_keeper' ? Activity : Cpu;

  const nodeStyle = data.role === 'orchestrator' ? {
    backgroundColor: '#567873',
    borderStyle: 'dashed',
    borderRadius: '0px',
    borderWidth: '4px',
    borderColor: '#c2e2b6',
    fontFamily: 'monospace',
    color: '#c2e2b6',
    paddingLeft: '16px',
    paddingTop: '8px',
    marginLeft: '0px'
  } : {
    backgroundColor: '#9c9b73',
    borderWidth: '10px',
    borderStyle: 'double',
    borderRadius: '0px',
    fontFamily: 'system-ui',
    fontWeight: 'normal',
    textAlign: 'center' as const,
    lineHeight: '19.5px',
    color: '#e2b6b8',
    paddingLeft: '16px',
    paddingTop: '9px',
    paddingRight: '-3px',
    paddingBottom: '3px',
    marginRight: '-4px',
    marginLeft: '-2px',
    marginTop: '-4px',
    marginBottom: '5px'
  };

  return (
    <div 
      style={nodeStyle}
      className={cn(
        "shadow-2xl transition-all w-48",
        data.status === 'working' ? "shadow-green-500/20" : 
        data.status === 'idle' ? "shadow-blue-500/10" : ""
      )}
    >
      <Handle type="target" position={Position.Top} className="w-16 !bg-zinc-700 !border-none" />
      
      <div 
        className="flex items-center gap-2 mb-2"
        style={data.role !== 'orchestrator' ? { backgroundColor: '#7b4040' } : undefined}
      >
        <Icon className={cn(
          "w-4 h-4",
          data.role === 'orchestrator' ? 'opacity-100' : 'opacity-70'
        )} />
        <span className="font-mono text-[10px] font-bold uppercase tracking-tighter truncate">
          {data.name}
        </span>
      </div>

      <div 
        className="flex flex-col gap-1 border-t border-dashed border-zinc-600/50 pt-2"
        style={data.role !== 'orchestrator' ? { backgroundColor: '#314026' } : undefined}
      >
        <div className="text-[9px] font-mono flex items-center justify-between opacity-70">
          STATUS 
          <span className="font-bold uppercase">{data.status}</span>
        </div>
        
        {data.currentTask && (
          <div className="text-[8px] mt-1 line-clamp-1 italic opacity-60">
             &gt; {data.currentTask}
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-16 !bg-zinc-700 !border-none" />
    </div>
  );
});

AgentNode.displayName = 'AgentNode';
