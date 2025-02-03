export const ROUTES = {
    sendMessage: (agentId: string): string => `http://138.197.187.21:3000/${agentId}/message`,
    getAgents: (): string => `http://138.197.187.21:3000/agents`,
};
