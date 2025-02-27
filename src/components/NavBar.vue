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
import { useConnect, useDisconnect } from '@wagmi/vue';
import { NIcon, useMessage } from 'naive-ui';
import { zksyncInMemoryNode } from 'viem/chains';

import Balance from '@/components/Balance.vue';
import { zksyncConnector, zksyncConnectorWithSession } from '@/config.ts';
import { useMainStore } from '@/stores';

const store = useMainStore();
const { connect, connectors, isPending: isConnectPending } = useConnect();
const { disconnect } = useDisconnect();
const { isConnected, address, chain } = store.getAccount();
const message = useMessage();

const connectWallet = async (useSession: boolean) => {
    try {
        connect({
            connector: useSession ? zksyncConnectorWithSession : zksyncConnector,
            chainId: zksyncInMemoryNode.id
        });
    }
    catch (error) {
        message.warning('Connect failed, see console for more info.');
        console.error('Connection failed:', error);
    }
};

const disconnectWallet = () => {
    disconnect();
};

const renderIcon = (base: string | undefined) => {
    if (base) {
        return () => {
            return h(NAvatar, {
                size: 'small',
                color: '#151518',
                round: true,
                style: 'margin: 4px; width: 24px; height: 24px;',
                src: base
            });
        };
    }
    else {
        return () => {
            return h(NIcon, {
                component: WalletOutline
            });
        };
    }
};

const options = computed(() => {
    return connectors.map(item => ({
        label: item.name,
        key: item.name,
        icon: renderIcon(item.icon)
    }));
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
