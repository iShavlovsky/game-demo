<template>
  <NThemeEditor>
    <n-config-provider :theme-overrides="darkThemeOverrides">
      <n-message-provider>
        <NavBar />
        <main class="main-content">
          <RouterView />
        </main>
        <FooterComponent />
        <n-global-style />
      </n-message-provider>
    </n-config-provider>
  </NThemeEditor>
</template>
<script lang="ts" setup>
import { useTitle } from '@vueuse/core';
import { type GlobalThemeOverrides, NThemeEditor } from 'naive-ui';

import FooterComponent from '@/components/FooterComponent.vue';
import NavBar from '@/components/NavBar.vue';

useTitle('Rev Share Party');
const darkThemeOverrides: GlobalThemeOverrides = {
    common: {
        baseColor: '#fff',
        primaryColor: '#92FE75',
        primaryColorHover: '#92FE75',
        bodyColor: '#0F0F0F',
        borderColor: '#92FE75',
        textColor1: '#fff',
        textColor2: '#fff',
        textColor3: '#fff'
    },
    Button: {
        color: '#151518',
        textColor: '#92FE75',
        borderHover: '#8F75FE',
        borderFocus: '#8F75FE'
    },
    Dropdown: {
        color: '#151518',
        optionTextColor: '#FFF',
        optionColorHover: '#92FE75'
    },
    Tabs: {
        tabTextColorHoverSegment: '#fff',
        tabTextColorActiveBar: '#fff',
        tabTextColorLine: 'rgba(255, 255, 255, 0.6)',
        tabFontSizeLarge: '16px',
        tabTextColorActiveLine: '#fff',
        barColor: '#fff',
        tabBorderColor: 'rgba(233, 234, 236, 0.2)'
    },
    Table: {
        tdColor: '#0F0F0F',
        tdColorModal: '#C41E1EFF',
        tdColorPopover: '#fff',
        tdColorStriped: '#151518',
        thColor: '#151518',
        borderColor: 'transparent'
    },
    Avatar: {
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    Tag: {
        colorInfo: 'rgba(233, 234, 236, 0.1)',
        textColorInfo: '#fff',
        borderRadius: '8px'
    },
    Modal: {
        color: '#151518'
    },
    Message: {
        color: '#151518',
        colorInfo: '#3D3D41',
        colorSuccess: '#3D3D41',
        colorLoading: '#3D3D41',
        iconColorSuccess: '#92FE75',
        colorError: '#3D3D41',
        colorWarning: '#3D3D41',
        textColor: '#fff',
        borderRadius: '12px',
        fontSize: '16px'
    },
    Input: {
        border: '1px solid #404042',
        placeholderColor: '#A1A1A3',
        textColor: '#92FE75',
        color: '#151518',
        colorFocus: '#151518',
        borderRadius: '12px',
        heightLarge: '52px'
    }
};

const lightThemeOverrides: GlobalThemeOverrides = {
    common: {}
};

onMounted(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.xsolla.net/metaframe-web-wallet-widget-prod/container/v1/metaframe.js';
    script.async = true;
    script.onload = () => {
        window.metaframe?.create({
            loginProjectId: 'd06e1fa0-4988-4105-af79-c00f1cd2787d',
            merchantId: 765059,
            projectId: 276169,
            isMobile: false,
            isCollapsed: true,
            layoutSettings: {
                desktop: {
                    widgetMarginTop: 90
                },
                mobile: {
                    widgetMarginTop: 72
                }
            }
        });
    };
    document.head.appendChild(script);
});
</script>
<style lang="scss" scoped>
.main-content {
  min-height: calc(100vh - 233px);
}
</style>
