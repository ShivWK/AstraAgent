import { fetcher } from './fetcher';
import { Agent } from '@/types/agents';
import { FormType } from '@/components/aiAssistants/NewAgentCreationModel';

export const agentsApi = {
  getAgents: () => {
    return fetcher<{ status: string; agents: Agent[] }>('/api/agents');
  },

  getAgent: (id: string) => {
    return fetcher<{ status: string; agent: Agent }>(`/api/agents/${id}`);
  },

  createAgent: (data: FormType) => {
    return fetcher<{ success: boolean; message?: string; agent?: Agent }>(
      '/api/agents',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
  },

  deleteAgent: (id: string) => {
    return fetcher<{ message: string; agentId?: string }>(`/api/agents/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
