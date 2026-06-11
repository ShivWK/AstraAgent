import { fetcher } from './fetcher';
import { Agent } from '@/types/agents';

export const agentsApi = {
  getAgents: () => {
    return fetcher<{ status: string; agents: Agent[] }>('/api/agents');
  },

  getAgent: (id: string) => {
    return fetcher<{ status: string; agent: Agent }>(`/api/agents/${id}`);
  },

  createAgent: () => {},
  deleteAgent: () => {},
};
