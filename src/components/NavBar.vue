<template>
  <header class="nav-bar">
    <nav class="container display-flex flex-row justify-between align-items-center">
      <RouterLink class="brand-logo"
                  to="/">
        <n-flex justify="center"
                align="center">

          <NIcon :component="GameControllerOutline"
                 :depth="1"
                 size="40"
                 color="#92FE75" />
          <n-h1 class="m-auto">Super Game</n-h1>
        </n-flex>
      </RouterLink>
      <div class="navbar-wallets-btns display-flex gap-8">
        <div class="nav-bar-wallet-btn-w display-flex flex-row align-items-center gap-16">
          <a :href="`${authServerURL}`"
             target="_blank"
             v-if="isConnected"
             class="display-flex flex-row align-items-center connect-wallet-green gap-4"
             title="Open wallet">
            <NIcon :component="WalletOutline"
                   :depth="1"
                   color="#92FE75" />
            Open wallet
          </a>

          <n-button v-if="isConnected"
                    :loading="isConnectPending"
                    class="connect-wallet-green"
                    @click="disconnect()"
          >
            <template #icon>
              <NIcon :component="Unlink"
                     :depth="1"
                     color="#92FE75" />
            </template>
            Disconnect Wallet
          </n-button>
          <n-flex  v-else
                   justify="center"
                   align="center">

            <n-button :loading="isConnectPending"
                      class="connect-wallet-green"
                      @click="connectWallet(false)"
                      round>
              <template #icon>
                <NIcon :component="WalletOutline"
                       :depth="1"
                       color="#92FE75" />
              </template>
              Connect wallet
            </n-button>

            <n-button :loading="isConnectPending"
                      class="connect-wallet-green"
                      @click="connectWallet(true)"
                      round>
              <template #icon>
                <NIcon :component="WalletOutline"
                       :depth="1"
                       color="#92FE75" />
              </template>
              Connect wallet with the session
            </n-button>
          </n-flex>
          <div class="display-flex flex-column">
            <n-text v-if="isConnected"
                    style="color: #92fe75"
                    type="success">
              Chain: {{ chain?.name }}
            </n-text>
            <div class="display-flex gap-8">
              <n-ellipsis v-if="isConnected"
                          :tooltip="true"
                          style="max-width: 100px; color: white">
                {{ store.shortenAddress(address) }}
              </n-ellipsis>

              <Balance v-if="address"
                       :address="address" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script lang="ts" setup>
import { GameControllerOutline, Unlink, WalletOutline } from '@vicons/ionicons5';
import { useAccount, useConnect, useDisconnect } from '@wagmi/vue';
import { NIcon, useMessage } from 'naive-ui';
import { parseEther } from 'viem';
import { onMounted } from 'vue';
import { zksyncSsoConnector } from 'zksync-sso/connector';

import Balance from '@/components/Balance.vue';
import { useMetaframe } from '@/composables/useMetaframe.ts';
import { defaultChainId } from '@/config.ts';
import { useMainStore } from '@/stores';
const metaframe = useMetaframe();
const store = useMainStore();
const { connect, isPending: isConnectPending } = useConnect();
const { disconnect } = useDisconnect();
const { isConnected, address, chain } = useAccount();
const message = useMessage();

const authServerURL = import.meta.env.VITE_AUTH_SERVER_URL;

const getJWTTokenXsolla = () => {
    return localStorage.getItem('xsolla_metaframe_token'); ;
};

const connectWallet = async (useSession: boolean) => {
    // const token = getJWTTokenXsolla();
    // if (!token) {
    //     message.error('Not connected.');
    //     return;
    // }
    try {
        connect({
            connector: zksyncSsoConnector({
                metadata: {
                    name: `Super Game token: ${getJWTTokenXsolla()}`
                },
                authServerUrl: authServerURL,
                ...(useSession
                    ? {
                            session: {
                                expiry: '5 min',
                                feeLimit: parseEther('0.1'),
                                transfers: [
                                    {
                                        to: '0x55bE1B079b53962746B2e86d12f158a41DF294A6',
                                        valueLimit: parseEther('0.1')
                                    }
                                ]
                            }
                        }
                    : undefined)

            }),
            chainId: defaultChainId
        });
        message.success('Connect to wallet.');
    }
    catch (error) {
        message.warning('Connect failed, see console for more info.');
        console.error('Connection failed:', error);
    }
};

onMounted(() => {
    getJWTTokenXsolla();
});

</script>
<style lang="scss">
.nav-bar {
    padding: 25px 0;
    background-color: #151518;
}

.n-spin-content {
    .n-base-loading__container {
        color: #92fe75 !important;
    }
}

.nav-bar-wallet-btn-w {
    @media (max-width: 500px) {
        flex-direction: column;
        align-items: start;
    }
}

.navbar-wallets-btns {
    @media (max-width: 520px) {
        flex-direction: column;
    }
}

.connect-wallet-green {
    height: 40px;
}
</style>
