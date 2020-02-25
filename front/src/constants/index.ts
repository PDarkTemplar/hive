import mqttPathes from './mqttPathes';

export default {
    paths: {
        base: '/',
        login: '/login',
        admin: '/admin',
        adminZwaveEdit: '/admin/zwave/:id',
        dashboard: '/dashboard',
    },
    keys: {
        enter: 'Enter',
        esc: 'Escape',
    },
    generateUUID: () => {
        let d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); // use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
    },
    mqttPathes,
};
