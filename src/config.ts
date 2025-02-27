import { cookieStorage, createConfig, createStorage, http } from '@wagmi/vue';
import { parseEther } from 'viem';
import { zksyncInMemoryNode, zksyncSepoliaTestnet } from 'viem/chains';

import { defineChain } from 'viem';
import { chainConfig } from 'viem/zksync';
import { zksyncSsoConnector } from 'zksync-sso/connector';

export const zkChainName = 'Xsolla ZK Sepolia Testnet';

export const xsollaZkChain = defineChain({
    ...chainConfig,
    id: 555272,
    name: zkChainName,
    nativeCurrency: {
        name: 'XSOLLAZK',
        symbol: 'ETH',
        decimals: 18
    },
    rpcUrls: {
        default: {
            http: ['https://zkrpc-anvil.xsollazk.com']
        }
    },
    blockExplorers: {
        default: {
            name: 'xla explorer',
            url: 'https://x.la/explorer'
        }
    },
    contracts: {
        multicall3: {
            address: '0x511322aB41bC456D2ed5b9e7Af1eEd9C7e5Bf4Ae'
        }
    },
    testnet: true
});

export const supportedChains = [zksyncSepoliaTestnet, zksyncInMemoryNode, xsollaZkChain];

export const defaultChainId: SupportedChainId = import.meta.env.VITE_CHAIN_DEFAULT == 260 ? zksyncInMemoryNode.id : xsollaZkChain.id;
export type SupportedChains = typeof supportedChains[number];
export type SupportedChainId = (typeof supportedChains)[number]['id'];

export const zksyncConnectorWithSession = zksyncSsoConnector({
    metadata: {
        name: 'Super Game'
    },
    authServerUrl: import.meta.env.VITE_AUTH_SERVER_URL,
    session: {
        feeLimit: parseEther('0.1'),
        transfers: [
            {
                to: '0x55bE1B079b53962746B2e86d12f158a41DF294A6',
                valueLimit: parseEther('0.1')
            }
        ]
    }
});
export const zksyncConnector = zksyncSsoConnector({
    metadata: {
        name: 'Super Game'
    },
    authServerUrl: import.meta.env.VITE_AUTH_SERVER_URL
});

export const config = createConfig({
    chains: [
        xsollaZkChain,
        zksyncSepoliaTestnet,
        zksyncInMemoryNode
    ],
    transports: {
        // [xsollaZkChain.id]: http('https://zkrpc.xsollazk.com'),
        [xsollaZkChain.id]: http('https://zkrpc-anvil.xsollazk.com'),
        [zksyncInMemoryNode.id]: http(),
        [zksyncSepoliaTestnet.id]: http()
    },
    connectors: [
        zksyncConnector
    ],

    ssr: false,
    syncConnectedChain: false,
    storage: createStorage({
        storage: cookieStorage
    })
});
