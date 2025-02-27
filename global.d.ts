import { config } from './src/config';

declare module 'wagmi' {
    interface Register {
        config: typeof config;
    }
}
