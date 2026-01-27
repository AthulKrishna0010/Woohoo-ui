/**
 * Detects if the current browser is an in-app browser (e.g., Instagram, Facebook, LinkedIn).
 * These browsers often have issues with getUserMedia (microphone access).
 * 
 * @returns boolean - true if likely an in-app browser.
 */
export function isInAppBrowser(): boolean {
    if (typeof window === 'undefined') return false;

    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;

    // Common identifiers for in-app browsers
    // "Instagram" - Instagram
    // "FBAN", "FBAV" - Facebook
    // "LinkedIn" - LinkedIn
    // "Line" - Line
    // "Twitter" - Twitter (sometimes)

    const rules = [
        /Instagram/i,
        /FBAN/i,
        /FBAV/i,
        /LinkedIn/i,
        /Line/i,
        // Add more if needed, but these are the big ones that block mic commonly on iOS
    ];

    for (let rule of rules) {
        if (rule.test(ua)) {
            return true;
        }
    }

    return false;
}
