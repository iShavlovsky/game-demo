<template>
  <section>
    <div class="container main-container-padding">
      <n-flex vertical
              v-if="isConnected && address">
        <p>Home</p>
        <n-flex vertical
                v-if="isConnected && address"
                justify="center">
          <n-input  :style="{ width: '75%' }"
                    v-model:value="testTransferTarget"
                    :loading="disabled"
                    :disabled="disabled"
                    placeholder="Address" />
          <n-input-number round
                          :disabled="disabled"
                          :style="{ width: '75%' }"
                          :step="0.01"
                          v-model:value="value"
                          :default-value="0.1"
                          :loading="disabled"
                          placeholder="0.1">
            <template #suffix>
              ETH
            </template>
          </n-input-number>
        </n-flex>
        <n-flex v-if="isConnected && address"
                justify="start">
          <n-button type="primary"
                    :disabled="disabled"
                    :style="{ width: '36.5%' }"
                    @click="sendTokens(false)">
            Send {{value}} ETH
          </n-button>
          <n-button type="info"
                    :disabled="disabled"
                    :style="{ width: '36.5%' }"
                    @click="sendTokens(true)">
            Send {{value}} ETH w/ Paymaster
          </n-button>
        </n-flex>
        <n-flex  v-if="isConnected && address"
                 vertical
                 justify="start">

          <n-button type='default'
                    :disabled="disabled"
                    :style="{ width: '75%' }"
                    @click="fundAccount">
            Send Me {{value}} ETH to: {{address}}
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
      </n-flex>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { sendTransaction, waitForTransactionReceipt } from '@wagmi/core';
import { useAccount } from '@wagmi/vue';
import { useMessage } from 'naive-ui';
import { createWalletClient, type Hash, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { getGeneralPaymasterInput } from 'viem/zksync';

import { config, defaultChain } from '@/config.ts';
const testTransferTarget = ref<string | null>('0x55bE1B079b53962746B2e86d12f158a41DF294A6');
const value = ref<number>(0.1);
const isLoad = ref<boolean>(false);
const result = ref<Hash | null>(null);
const errorMessage = ref<string | null>(null);
const isSendingEth = ref<boolean>(false);

const { isConnected, address } = useAccount();
const message = useMessage();

const disabled = computed(() => Boolean(isLoad.value || isSendingEth.value));

const getJWTTokenXsolla = () => {
    return localStorage.getItem('xsolla_metaframe_token');
};

const onError = (error: unknown) => {
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
        console.error(transactionFailureDetails);
    }
};

const fundAccount = async () => {
    const token = getJWTTokenXsolla();
    if (!token || !address.value) {
        message.error('Not connected.');
        return;
    }
    if (value.value <= 0) {
        message.error('The amount is too small.');
        return;
    }

    errorMessage.value = '';
    isLoad.value = true;

    const richClient = createWalletClient({
        account: privateKeyToAccount('0x3eb15da85647edd9a1159a4a13b9e7c56877c4eb33f614546d4db06a51868b1c'),
        chain: defaultChain,
        transport: http()
    });
    try {
        let transactionHash = await richClient.sendTransaction({
            to: address.value,
            value: parseEther(`${value.value}`)
        });

        // FIXME: When not using sessions, sendTransaction returns a map and not a string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((transactionHash as any).value !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transactionHash = (transactionHash as any).value;
        }

        const receipt = await waitForTransactionReceipt(config, {
            hash: transactionHash
        });
        if (receipt.status === 'reverted') {
            console.error(receipt);
            message.warning('Transaction failed, see console for more info.');
        }
        else {
            message.success('Transaction success.');
        }
    }
    catch (error) {
        onError(error);
        message.warning('Transaction failed, see console for more info.');
    }
    finally {
        isLoad.value = false;
    }
};

const sendTokens = async (usePaymaster: boolean) => {
    const token = getJWTTokenXsolla();
    if (!token || !address.value) {
        message.error('Not connected.');
        return;
    }
    if (value.value <= 0) {
        message.error('The amount is too small.');
        return;
    }
    errorMessage.value = '';
    isSendingEth.value = true;

    try {
        let transactionHash;

        if (usePaymaster) {
            transactionHash = await sendTransaction(config, {
                to: testTransferTarget.value,
                value: parseEther(`${value.value}`),
                paymaster: '0x9B4f777d2DC47Fda22c1606EEf5D71a349BD335e',
                paymasterInput: getGeneralPaymasterInput({ innerInput: '0x' })
            });
        }
        else {
            transactionHash = await sendTransaction(config, {
                to: testTransferTarget.value,
                value: parseEther(`${value.value}`)
            });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((transactionHash as any).value !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transactionHash = (transactionHash as any).value;
        }
        result.value = transactionHash;
        const receipt = await waitForTransactionReceipt(config, {
            hash: transactionHash
        });
        if (receipt.status === 'reverted') {
            console.error(receipt);
            message.warning('Transaction failed, see console for more info.');
        }
        else {
            message.success('Transaction success.');
        }
    }
    catch (error) {
        onError(error);
        message.warning('Transaction failed, see console for more info.');
    }
    finally {
        isSendingEth.value = false;
    }
};
</script>
