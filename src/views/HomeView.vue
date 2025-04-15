<template>
  <section>
    <div class="container main-container-padding">
      <n-flex vertical
              v-if="isConnected && address">
        <p>Home</p>
        <n-button v-if="isConnected"
                  :loading="isLoad"
                  class="connect-wallet-green"
                  @click="toSignMessage"
                  round>
          <template #icon>
            <NIcon :component="Chatbubbles"
                   :depth="1"
                   color="#92FE75" />
          </template>
          Sign Message
        </n-button>
        <n-button v-if="isConnected"
                  :loading="isLoad"
                  class="connect-wallet-green"
                  @click="toSignTypedData"
                  round>
          <template #icon>
            <NIcon :component="Chatbubbles"
                   :depth="1"
                   color="#92FE75" />
          </template>
          Sign Typed Data
        </n-button>
        <n-flex vertical
                v-if="isConnected && address"
                justify="center">
          <n-input v-model:value="testTransferTarget"
                   :loading="disabled"
                   :disabled="disabled"
                   placeholder="Address" />
          <n-input-number round
                          :disabled="disabled"

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
                    @click="sendTokens(false)">
            Send {{value}} ETH
          </n-button>
          <n-button type="info"
                    :disabled="disabled"
                    @click="sendTokens(true)">
            Send {{value}} ETH w/ Paymaster
          </n-button>
        </n-flex>
        <n-flex  v-if="isConnected && address"
                 vertical
                 justify="start">

          <n-button type='default'
                    :disabled="disabled"
                    :style="{ width: 'auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }"
                    @click="fundAccount">
            Send Me {{value}} ETH to: {{address}}
          </n-button>
        </n-flex>

        <n-flex  v-if="isConnected && address"
                 vertical
                 justify="start">

          <n-button type='default'
                    :disabled="disabled"
                    :style="{ width: 'auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }"
                    @click="addValidationKeyWrite">
            addValidationKeyWrite
          </n-button>
        </n-flex>
        <n-result v-if="result && isConnected && address"
                  :style="{ width: 'auto', overflow: 'hidden', wordWrap: 'break-word' }"
                  status="success"
                  title="Success"
                  :description="result">
          <template #footer>
            <n-button @click="result = null">Ok</n-button>
          </template>
        </n-result>
        <n-result v-if="isConnected && address && errorMessage"
                  :style="{ width: 'auto', overflow: 'hidden', wordWrap: 'break-word' }"
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
import { Chatbubbles } from '@vicons/ionicons5';
import { sendTransaction, signMessage, signTypedData, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { useAccount } from '@wagmi/vue';
import { NIcon, useMessage } from 'naive-ui';
import { type Address, createWalletClient, type Hash, type Hex, http, parseEther, toHex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { getGeneralPaymasterInput } from 'viem/zksync';
import { registerNewPasskey } from 'zksync-sso/client/passkey';
import { getPublicKeyBytesFromPasskeySignature } from 'zksync-sso/utils';

import { webAuthValidatorAbi } from '@/assets/abi';
import { config, contractsByChain, defaultChain, defaultChainId } from '@/config.ts';
const testTransferTarget = ref<Address | null>('0x55bE1B079b53962746B2e86d12f158a41DF294A6');
const value = ref<number>(0.1);
const isLoad = ref<boolean>(false);
const result = ref<Hash | string | null>(null);
const errorMessage = ref<string | null>(null);
const isSendingEth = ref<boolean>(false);

const { isConnected, address } = useAccount();
const message = useMessage();

const singMessage = 'Welcome to Super Game!\n'
    + '\n'
    + `Click to sign in and accept terms and conditions of the Super Game. For more inforamtion reference to documents at __termsLink__`
    + '\n'
    + 'This request will not trigger a blockchain transaction or cost any gas fees.\n'
    + '\n'
    + 'Wallet address:\n'
    + `__address__`
    + '\n'
    + 'Time:\n'
    + `__day__.__month__.__year__ __hours__:__minutes__`;

const disabled = computed(() => Boolean(isLoad.value || isSendingEth.value));
const toShortString = (anyString: string, chars = 3): string => {
    const start = anyString.slice(0, chars + 2);
    const end = anyString.slice(-chars);
    return `${start}...${end}`;
};

const passkeyName = 'passkey_test_addValidationKey';

const _registerPasskey = async (passkeyName: string) => registerNewPasskey({
    userName: passkeyName,
    userDisplayName: passkeyName
    // authenticatorSelection: {
    //     authenticatorAttachment: 'platform',
    //     residentKey: 'required',
    //     userVerification: 'preferred'
    // },
    // supportedAlgorithmIDs: [-7]
});

const credentialId_hex = '0x4654553842536977726e475f6d43524b777233356c497477494c4a5f4c636a4b6d764b633156325636784d';
const publicKey: [Hex, Hex] = [
    '0xb5d6caf39310e32bcca707ed53587cdb82a3ccd7042164002b20130e7c67fe1b',
    '0x82e828bffa7a3ab2e1db49ee37fadff14778b686c24e6f4adf4b6ac9bc77bb81'
];
const addValidationKeyWrite = async () => {
    // const { credentialPublicKey, credentialId } = await _registerPasskey(passkeyName);
    // const credentialId_hex = toHex(credentialId);
    // console.log(
    //     'credentialPublicKey:',
    //     credentialPublicKey,
    //     'credentialId:',
    //     credentialId);
    // const passkeyPublicKey = getPublicKeyBytesFromPasskeySignature(credentialPublicKey);
    //
    // const publicKey: [Hex, Hex] = [toHex((passkeyPublicKey[0])), toHex((passkeyPublicKey[1]))];
    console.log(
        'publicKey:',
        publicKey);

    const domain = 'https://xsollazk.com/wallet-demo-api/';
    console.log(
        'domain:',
        domain);

    const transactionHash = await writeContract(config, {
        address: contractsByChain[defaultChainId].passkey,
        abi: webAuthValidatorAbi,
        functionName: 'addValidationKey',
        args: [credentialId_hex, publicKey, domain]
    });
    console.log('addValidationKey Tx:', transactionHash);

    const transactionReceipt = await waitForTransactionReceipt(config, { hash: transactionHash });
    if (transactionReceipt.status === 'reverted') {
        throw new Error('Transaction reverted');
    }
    if (transactionReceipt.status === 'success') {
        message.success('Transaction success.');
        result.value = `addValidationKey Tx: ${transactionHash}`;
    }
};

const onMessage = (
    template: string,
    values: {
        termsLink: string;
        address: Address;
    }
): string => {
    const date = new Date();
    const time = {
        day: date.getUTCDate().toString().padStart(2, '0'),
        month: (date.getUTCMonth() + 1).toString().padStart(2, '0'),
        year: date.getUTCFullYear().toString(),
        hours: date.getUTCHours().toString().padStart(2, '0'),
        minutes: date.getUTCMinutes().toString().padStart(2, '0')
    };

    return template
        .replace('__termsLink__', values.termsLink)
        .replace('__address__', values.address)
        .replace('__day__', time.day)
        .replace('__month__', time.month)
        .replace('__year__', time.year)
        .replace('__hours__', time.hours)
        .replace('__minutes__', time.minutes);
};

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

    if (!testTransferTarget.value) {
        message.error('Address error');
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

const toSignTypedData = async () => {
    if (isConnected.value && address.value) {
        isLoad.value = true;
        try {
            const signature = await signTypedData(config, {
                account: address.value,
                domain: {
                    name: 'Super Game',
                    version: '1',
                    chainId: defaultChain.id,
                    verifyingContract: address.value
                },
                types: {
                    Person: [
                        { name: 'name', type: 'string' },
                        { name: 'wallet', type: 'address' }
                    ],
                    Mail: [
                        { name: 'from', type: 'Person' },
                        { name: 'to', type: 'Person' },
                        { name: 'contents', type: 'string' }
                    ]
                },
                primaryType: 'Mail',
                message: {
                    from: {
                        name: 'Alice',
                        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
                    },
                    to: {
                        name: 'Bob',
                        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
                    },
                    contents: 'Hello, Bob!'
                }
            });
            message.success('The message is signed!');
            result.value = `Signature: ${signature}`;
            console.log('Signature signMessage:', signature);
        }
        catch (e) {
            message.error('Error Sign Message!');
            console.warn('Error Sign Message:', e);
        }
        finally {
            isLoad.value = false;
        }
    }
};

const toSignMessage = async () => {
    if (isConnected.value && address.value) {
        isLoad.value = true;
        const messageForSign = onMessage(
            singMessage,
            {
                address: address.value,
                termsLink: 'https://x.la/bazaar/docs'
            }
        );
        try {
            const signature = await signMessage(config, {
                account: address.value,
                message: messageForSign
            });
            result.value = `Signature: ${signature}`;
            message.success('The message is signed!');
            console.log('Signature signMessage:', signature);
        }
        catch (e) {
            message.error('Error Sign Message!');
            console.warn('Error Sign Message:', e);
        }
        finally {
            isLoad.value = false;
        }
    }
};
</script>
