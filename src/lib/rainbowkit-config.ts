import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { baseSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Orius Finance',
  projectId: '5acaafc597fa15a37776692c4371f177',
  chains: [baseSepolia],
});
