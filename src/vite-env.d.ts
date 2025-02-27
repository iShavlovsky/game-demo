/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_API_URL: string
    readonly VITE_MORALIS_API_KEY: string
    readonly VITE_MORALIS_NODE_API_KEY: string
    readonly VITE_MORALIS_TESTNET_NODE_API_KEY: string
    readonly VITE_MORALIS_NODES_LINEA_SITE_1: string
    readonly VITE_MORALIS_NODES_LINEA_SITE_2: string
    readonly VITE_MORALIS_NODES_TESTNET_LINEA_SITE_1: string
    readonly VITE_MORALIS_NODES_TESTNET_LINEA_SITE_2: string
    readonly VITE_ID_WALLET_CONNECT: string
    readonly VITE_ID_CONTRACT_ADDRESS_1: `0x${string}`
    readonly VITE_ID_CONTRACT_ADDRESS_2: `0x${string}`
}

interface ImportMeta {
    readonly env: ImportMetaEnv
    readonly glob: (path: string, config: object) => Record<string, () => Promise<{ default: any }>>
}

declare module 'wagmi'
    interface Register {
        config: typeof wagmiConfig;
    }
}