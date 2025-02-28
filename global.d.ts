import { config } from './src/config';

declare module 'wagmi' {
    interface Register {
        config: typeof config;
    }
}
declare global {
    interface Window {
        metaframe?: Metaframe;
    }

    interface MetaframeLayoutSettings {
        desktop?: {
            widgetMarginTop?: number;
        };
        mobile?: {
            widgetMarginTop?: number;
        };
    }

    interface MetaframePushNotificationParams {
        type: 'success' | 'warning' | 'error' | 'info';
        text: string;
        button?: {
            text: string;
            onClick: () => void;
        };
        durationInMs?: number;
    }

    interface Metaframe {
        create: (parameters: {
            loginProjectId: string;
            merchantId?: number;
            projectId?: number;
            orbsApiHostId?: string;
            isMobile?: boolean;
            isCollapsed?: boolean;
            layoutSettings?: MetaframeLayoutSettings;
        }) => void;

        setIsMobile: (isMobile: boolean) => void;

        partnerActions?: {
            openBackpackItemPage: (itemId: string) => void;
            openLogin: () => void;
            openProfile: () => void;
            openWallet: () => void;
            openBackpack: () => void;
            openCustomMiniApp: (params: { miniAppName: string }) => void;
            pushNotification: (params: MetaframePushNotificationParams) => void;
            setIsCustomMiniAppVisible: (params: {
                miniAppName: string;
                isVisible: boolean;
            }) => void;
        };
    }

    type MetaframeEventName =
        | '@metaframe-partner-events:app-loaded'
        | '@metaframe-partner-events:login-successful'
        | '@metaframe-partner-events:logout-successful'
        | `@metaframe-partner-events:mini-app-menu-button-clicked:<string>`
        | `@metaframe:custom-action:${string}`;

}
