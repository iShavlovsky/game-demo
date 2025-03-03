<template>
  <section>
    <div class="container main-container-padding">

      <p>Home</p>
      <n-flex  v-if="isConnected && address"
               justify="center">
        <n-button type="primary"
                  :disabled="isSendingEth"
                  @click="sendTokens(false)">
          Send 0.1 ETH
        </n-button>
        <n-button type="info"
                  :disabled="isSendingEth"
                  @click="sendTokens(true)">
          Send 0.1 ETH w/ Paymaster
        </n-button>
      </n-flex>
      <n-result v-if="result && isConnected && address"
                status="success"
                title="Success"
                :description="result">
        <template #footer>
          <n-button @click="result = null">Ok</n-button>
        </template>
      </n-result>
      <n-result v-if="isConnected && address && errorMessage"
                status="error"
                title="Error"
                :description="errorMessage">
        <template #footer>
          <n-button @click="errorMessage = null">Ok</n-button>
        </template>
      </n-result>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { getBalance, type GetBalanceReturnType, sendTransaction, waitForTransactionReceipt, watchAccount } from '@wagmi/core';
import { type Address, createWalletClient, type Hash, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { getGeneralPaymasterInput } from 'viem/zksync';

import { config, defaultChain } from '@/config.ts';
import { useMainStore } from '@/stores';
const store = useMainStore();
const address = ref<Address | null>(null);
const balance = ref<GetBalanceReturnType | null>(null);
const result = ref<Hash | null>(null);
const errorMessage = ref<string | null>(null);
const isSendingEth = ref<boolean>(false);
const testTransferTarget = '0x55bE1B079b53962746B2e86d12f158a41DF294A6';
const { isConnected } = store.getAccount();

const fundAccount = async () => {
    if (!address.value) throw new Error('Not connected');

    const richClient = createWalletClient({
        account: privateKeyToAccount('0x3eb15da85647edd9a1159a4a13b9e7c56877c4eb33f614546d4db06a51868b1c'),
        chain: defaultChain,
        transport: http()
    });

    let transactionHash = await richClient.sendTransaction({
        to: address.value,
        value: parseEther('1')
    });
    // FIXME: When not using sessions, sendTransaction returns a map and not a string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((transactionHash as any).value !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transactionHash = (transactionHash as any).value;
    }

    await waitForTransactionReceipt(config, {
        hash: transactionHash
    });
};

watchAccount(config, {
    async onChange(data) {
        address.value = data.address || null;
    }
});

watch(address, async () => {
    if (!address.value) {
        balance.value = null;
        return;
    }

    let currentBalance = await getBalance(config, {
        address: address.value
    });
    if (currentBalance && currentBalance.value < parseEther('0.2')) {
        await fundAccount().catch((error) => {
            console.error('Funding failed:', error);
        });
        currentBalance = await getBalance(config, {
            address: address.value
        });
    }
    balance.value = currentBalance;
}, { immediate: true });

const sendTokens = async (usePaymaster: boolean) => {
    if (!address.value) return;

    errorMessage.value = '';
    isSendingEth.value = true;
    try {
        let transactionHash;

        if (usePaymaster) {
            transactionHash = await sendTransaction(config, {
                to: testTransferTarget,
                value: parseEther('0.1'),
                paymaster: '0x9B4f777d2DC47Fda22c1606EEf5D71a349BD335e',
                paymasterInput: getGeneralPaymasterInput({ innerInput: '0x' })
            });
        }
        else {
            transactionHash = await sendTransaction(config, {
                to: testTransferTarget,
                value: parseEther('0.1')
            });
        }

        // FIXME: When not using sessions, sendTransaction returns a map and not a string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((transactionHash as any).value !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transactionHash = (transactionHash as any).value;
        }
        result.value = transactionHash;
        const receipt = await waitForTransactionReceipt(config, {
            hash: transactionHash
        });
        balance.value = await getBalance(config, {
            address: address.value
        });
        if (receipt.status === 'reverted') throw new Error('Transaction reverted');
    }
    catch (error) {
        console.error('Transaction failed:', error);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let transactionFailureDetails = (error as any).cause?.cause?.cause?.data?.originalError?.cause?.details;
        if (!transactionFailureDetails) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transactionFailureDetails = (error as any).cause?.cause?.data?.originalError?.cause?.details;
        }
        if (!transactionFailureDetails) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transactionFailureDetails = (error as any).cause?.details;
        }

        if (transactionFailureDetails) {
            errorMessage.value = transactionFailureDetails;
        }
        else {
            errorMessage.value = 'Transaction failed, see console for more info.';
        }
    }
    finally {
        isSendingEth.value = false;
    }
};
</script>
