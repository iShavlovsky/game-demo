import { ref } from 'vue';
import { useAccount } from '@wagmi/vue';
import { type Chain } from 'viem';
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
    const addressUser = ref<`0x${string}` | undefined>(undefined);
    const chainUser = ref<Chain | undefined>(undefined);
    // const localStorage = useLocalStorage()

    function shortenAddress(address: string | undefined): string {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    return { addressUser, chainUser, shortenAddress };
});
