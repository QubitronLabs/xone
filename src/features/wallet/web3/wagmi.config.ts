import { createConfig, http } from "wagmi";
import { mainnet, sepolia, bsc, polygon, arbitrum } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import { APP_CONFIG } from "@/config/app.config";

const projectId = APP_CONFIG.web3.walletConnectProjectId;

export const wagmiConfig = createConfig({
	chains: [mainnet, sepolia, bsc, polygon, arbitrum],
	connectors: [
		injected(),
		...(projectId
			? [
					walletConnect({
						projectId,
						showQrModal: true,
					}),
				]
			: []),
	],
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
		[bsc.id]: http(),
		[polygon.id]: http(),
		[arbitrum.id]: http(),
	},
});
