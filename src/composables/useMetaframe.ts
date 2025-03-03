export function useMetaframe() {
    const isLoaded = ref<boolean>(false);

    const alertMessage = (text: string = 'Metaframe успешно загружен!') => {
        console.log(text);
    };

    const isMetaframeAvailable = computed(() => isLoaded.value && !!window.metaframe);

    const setIsMobile = (isMobile: boolean) => {
        if (!isMetaframeAvailable.value || !window.metaframe) {
            alertMessage('Metaframe не загружен.');
            return;
        }
        window.metaframe?.setIsMobile(isMobile);
    };

    const openProfile = () => {
        if (!isMetaframeAvailable.value || !window.metaframe?.partnerActions) {
            alertMessage('Metaframe или partnerActions недоступны.');
            return;
        }
        window.metaframe.partnerActions.openProfile();
    };

    const openWallet = () => {
        if (!isMetaframeAvailable.value || !window.metaframe?.partnerActions) {
            alertMessage('Metaframe или partnerActions недоступны.');
            return;
        }
        window.metaframe.partnerActions.openWallet();
    };

    const pushNotification = (params: MetaframePushNotificationParams) => {
        if (!isMetaframeAvailable.value || !window.metaframe?.partnerActions) {
            alertMessage('Metaframe или partnerActions недоступны.');
            return;
        }
        window.metaframe.partnerActions.pushNotification(params);
    };

    const onEvents = (eventNames: MetaframeEventName[], callback: (event: Event) => void) => {
        if (!isMetaframeAvailable.value || !window.metaframe) {
            alertMessage('Metaframe не загружен, события не будут обработаны.');
            return;
        }
        eventNames.forEach((eventName) => {
            window.addEventListener(eventName, callback);
        });
    };

    // Отписка от нескольких событий
    const offEvents = (eventNames: MetaframeEventName[], callback: (event: Event) => void) => {
        if (!isMetaframeAvailable.value || !window.metaframe) {
            alertMessage('Metaframe не загружен, отписка не выполнена.');
            return;
        }
        eventNames.forEach((eventName) => {
            window.removeEventListener(eventName, callback);
        });
    };

    return {
        isLoaded,
        isMetaframeAvailable,
        setIsMobile,
        openProfile,
        openWallet,
        pushNotification,
        onEvents,
        offEvents
    } as const;
}
