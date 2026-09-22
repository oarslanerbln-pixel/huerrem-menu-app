declare global {
  interface Window {
    WP_ASSET_URL?: string;
  }
}

export const getAssetUrl = (path: string): string => {
  if (typeof window !== 'undefined' && window.WP_ASSET_URL) {
    // If path starts with /, remove it so we don't get double slashes
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    const baseUrl = window.WP_ASSET_URL;
    // Ensure baseUrl has a trailing slash
    const finalBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    return finalBase + cleanPath;
  }
  return path;
};
