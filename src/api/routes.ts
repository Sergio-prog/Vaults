export const ROUTES = {
    sendMessage: (agentId: string): string => `https://api.orius.finance/${agentId}/message`,
    getAgents: (): string => `https://api.orius.finance/agents`,
};
