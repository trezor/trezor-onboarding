export default class Platform {
    static OS = {
        MAC: 'Mac',
        IOS: 'iOS',
        WIN: 'Windows',
        LINUX: 'Linux',
        ANDROID: 'Android',
    }

    static getInfo() {
        const { userAgent, platform } = window.navigator;
        const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
        const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
        const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
        const result = {};

        if (macosPlatforms.includes(platform)) {
            result.os = Platform.OS.MAC;
            result.isMobile = false;
        } else if (iosPlatforms.includes(platform)) {
            result.os = Platform.OS.IOS;
            result.isMobile = false;
        } else if (windowsPlatforms.includes(platform)) {
            result.os = Platform.OS.WIN;
            result.isMobile = false;
        } else if (/Android/.test(userAgent)) {
            result.os = Platform.OS.ANDROID;
            result.isMobile = true;
        } else if (!result.os && /Linux/.test(platform)) {
            result.os = Platform.OS.LINUX;
            result.isMobile = false;
        } else {
            console.warn('[Platform]: failed to detect platform');
        }

        return result;
    }
}