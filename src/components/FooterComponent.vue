<template>
  <footer class="footer-w display-flex align-items-center">
    <div class="container display-grid grid-cols-3 align-items-center">
      <p>© Super Game</p>
      <nav class="footer-nav-w justify-center">
        <ul class="footer-nav-holder display-flex flex-row gap-40 width-full justify-center">
          <li>
            <a>Newsletter</a>
          </li>
          <li>
            <a>Whitepaper</a>
          </li>
          <li>
            <a>Terms</a>
          </li>
          <li>
            <a>Privacy</a>
          </li>
        </ul>
      </nav>
      <ul class="display-flex flex-row gap-4 justify-end">
        <li>
          <a class="social-footer pointer"
             title="Join our community in X">
            <NIcon :component="LogoTwitter"
                   :depth="1"
                   size="40"
                   color="#92FE75" />
          </a>
        </li>
        <li>
          <a class="social-footer pointer"
             title="Join our Discord community">
            <NIcon :component="LogoDiscord"
                   :depth="1"
                   size="40"
                   color="#92FE75" />
          </a>

        </li>
        <li>
          <a class="social-footer pointer"
             title="Lets go check our videos">
            <NIcon :component="LogoYoutube"
                   :depth="1"
                   size="40"
                   color="#92FE75" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
<script lang="ts" setup>
import {
    LogoDiscord,
    LogoTwitter,
    LogoYoutube
} from '@vicons/ionicons5';
import { NIcon } from 'naive-ui'; </script>
<style lang="scss">
.footer-w {
    height: 133px;
    width: 100%;
    padding: 50px 0;
    @media (max-width: 880px) {
        height: auto;
    }

    .container {
        width: 100%;
        @media (max-width: 880px) {
            display: flex;
            flex-direction: column;
            gap: 40px;
        }
    }
}

.footer-nav-holder {
    @media (max-width: 500px) {
        gap: 20px;
    }
}

.social-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #252526;
    border: 1px solid transparent;
    width: 52px;
    height: 52px;
    border-radius: 12px;
    transition: all 0.25s ease-in-out;

    &:hover {
        border: 1px solid #92fe75;
        background-color: #151518;
    }
}
</style>
