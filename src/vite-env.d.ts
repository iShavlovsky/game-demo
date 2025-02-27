/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    readonly VITE_API_URL: string;
    readonly VITE_API_AUTH_SERVER_URL: string;

}

interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly glob: (path: string, config: object) => Record<string, () => Promise<{ default: any }>>;
}
