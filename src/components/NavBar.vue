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
                    @click="openWalletAndSendJwt()"
          >
            <template #icon>
              <NIcon :component="Unlink"
                     :depth="1"
                     color="#92FE75" />
            </template>
            Open wallet 2
          </n-button>
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
                      @click="connectWallet"
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
                      @click="connectWallet"
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
import { onMounted } from 'vue';
import { PopupCommunicator } from 'zksync-sso/communicator';

import Balance from '@/components/Balance.vue';
import { defaultChainId, zksyncConnector } from '@/config.ts';
import { useMainStore } from '@/stores';
const store = useMainStore();
const { data, connect, isPending: isConnectPending } = useConnect();
const { disconnect } = useDisconnect();
const { isConnected, address, chain } = useAccount();
const message = useMessage();

const authServerURL = import.meta.env.VITE_AUTH_SERVER_URL;

const JWTTokenXsolla = () => {
    return localStorage.getItem('xsolla_metaframe_token');
};

const communicator = new PopupCommunicator(authServerURL);

async function openWalletAndSendJwt() {
    communicator.openPopup();
    await communicator.ready();

    const messageToWallet = {
        id: crypto.randomUUID(),
        content: {
            action: {
                id: crypto.randomUUID(),
                method: 'open_wallet',
                params: {
                    metadata: {
                        name: `Super Game token`,
                        configData: {
                            token: `${JWTTokenXsolla()}`
                        }
                    }
                }
            }
        }
    };

    await communicator.postRequestAndWaitForResponse(messageToWallet);
}

const connectWallet = async () => {
    // const token = getJWTTokenXsolla();
    // if (!token) {
    //     message.error('Not connected.');
    //     return;
    // }
    try {
        connect({
            connector: zksyncConnector,
            chainId: defaultChainId
        });
        console.log(data);
        message.success('Connect to wallet.');
    }
    catch (error) {
        message.warning('Connect failed, see console for more info.');
        console.error('Connection failed:', error);
    }
};
onMounted(() => {
    JWTTokenXsolla();
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
