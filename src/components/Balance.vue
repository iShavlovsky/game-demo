<template>
  <n-flex>
    <n-spin :show="isPending">
      <n-text type="success">Balance: {{ data?.symbol }} {{ data?.value }}</n-text>
    </n-spin>
  </n-flex>
</template>
<script lang="ts" setup>
import { useBalance } from '@wagmi/vue';
import type { Address } from 'viem';

const props = defineProps<{ address: Address }>();
const { data, isPending } = useBalance({
    address: props.address,
    scopeKey: 'use-balance'
});
</script>
<style lang="scss" scoped></style>
