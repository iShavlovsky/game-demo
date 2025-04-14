import { cookieStorage, createConfig, createStorage, http } from '@wagmi/vue';
import { zksyncInMemoryNode } from 'viem/chains';
import { type Address, parseEther } from 'viem';
import { type Limit } from 'zksync-sso/utils';
import { formatSessionPreferences, callPolicy, type SessionPreferences } from 'zksync-sso/client-auth-server';
import { defineChain } from 'viem';
import { chainConfig } from 'viem/zksync';
import { zksyncSsoConnector } from 'zksync-sso/connector';
import { webAuthValidatorAbi } from '@/assets/abi';
import type { PasskeyRequiredContracts } from 'zksync-sso/client/passkey';
type NameSessionConfig = 'activeManagement';
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

export const supportedChains = [zksyncInMemoryNode, xsollaZkChain];

export const defaultChain: SupportedChains = xsollaZkChain;
export const defaultChainId: SupportedChainId = xsollaZkChain.id;
export type SupportedChains = typeof supportedChains[number];
export type SupportedChainId = (typeof supportedChains)[number]['id'];

export type ChainContracts = PasskeyRequiredContracts & {
    session: NonNullable<PasskeyRequiredContracts['session']>;
    passkey: NonNullable<PasskeyRequiredContracts['passkey']>;
    accountFactory: NonNullable<PasskeyRequiredContracts['accountFactory']>;
    accountPaymaster: Address;
};

export const contractsByChain: Record<SupportedChainId, ChainContracts> = {
    [zksyncInMemoryNode.id]: {
        session: '0xbd85121C8D5FF2ED4669aBe352FC257AD7e10ad5', // адрес SessionKeyValidator
        passkey: '0x144856aA5D95430c5A62069450d0057a0Ac30f81', // адрес WebAuthValidator
        accountFactory: '0xFaa68F149B2B5e25cCFfEe55Ae085A912cBDAcb0', // адрес AAFactory
        accountPaymaster: '0x513e953ece5Bd5a70a29442c7f81b8Ca46906195' // адрес ExampleAuthServerPaymaster
    },
    [xsollaZkChain.id]: {
        session: '0x13AB1fDAD8A3bce1d35a65cAE677b4699E50E0a0', // адрес SessionKeyValidator
        passkey: '0x930f5f8C39DC2E9b41Ab2b39b17357988c94c2a8', // адрес WebAuthValidator
        accountFactory: '0xCE7aC63403f7209bE019Bba9fffc486bd544B1B7', // адрес AAFactory
        accountPaymaster: '0x8e7E3facbE3e6d041dFc105dE3506e6f2AE965c2' // адрес ExampleAuthServerPaymaster
    }
};

export const mapSessionConfig = {
    activeManagement: {
        config: {
            transfers: [],
            contractCalls: [
                callPolicy({
                    address: contractsByChain[defaultChainId].passkey,
                    abi: webAuthValidatorAbi,
                    functionName: 'addValidationKey'
                }),
                callPolicy({
                    address: contractsByChain[defaultChainId].passkey,
                    abi: webAuthValidatorAbi,
                    functionName: 'removeValidationKey'
                })
            ]
        },
        default: {
            expiresAt: 68719476735n,
            feeLimit: {
                limitType: 1,
                limit: parseEther('0.1'),
                period: 0n
            }
        }
    }
} satisfies Record<NameSessionConfig, {
    config: Omit<SessionPreferences, 'signer'>;
    default: {
        expiresAt: bigint;
        feeLimit: Limit;
    };
}>;

export const getSessionConfigByName = (name: NameSessionConfig) => {
    return formatSessionPreferences(
        mapSessionConfig[name].config,
        mapSessionConfig[name].default
    );
};

export const zksyncConnector = zksyncSsoConnector({
    metadata: {
        name: 'Super Game'
    },
    session: {
        expiry: 68719476735n,
        feeLimit: {
            limitType: 1,
            limit: parseEther('0.1')
        },
        transfers: [],
        contractCalls: [
            callPolicy({
                address: contractsByChain[defaultChainId].passkey,
                abi: webAuthValidatorAbi,
                functionName: 'addValidationKey'
            }),
            callPolicy({
                address: contractsByChain[defaultChainId].passkey,
                abi: webAuthValidatorAbi,
                functionName: 'removeValidationKey'
            })
        ]
    },
    authServerUrl: import.meta.env.VITE_AUTH_SERVER_URL
});

export const config = createConfig({
    chains: [
        xsollaZkChain,
        zksyncInMemoryNode
    ],
    transports: {
        [xsollaZkChain.id]: http('https://zkrpc.xsollazk.com'),
        [zksyncInMemoryNode.id]: http()
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
