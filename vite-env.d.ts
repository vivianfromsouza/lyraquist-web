
interface ImportMetaEnv {
    readonly VITE_SPOTIFY_CLIENT_SECRET: string;
    readonly VITE_SPOTIFY_CLIENT_ID: string;
    readonly VITE_REDIRECT_URI: string;
    readonly VITE_FIREBASE_API_KEY: string;
    readonly VITE_FIREBASE_DOMAIN: string;
    readonly VITE_FIREBASE_URL: string;
    readonly VITE_FIREBASE_PROJECT: string;
    readonly VITE_FIREBASE_STORAGE: string;
    readonly VITE_FIREBASE_MESSAGING: string;
    readonly VITE_FIREBASE_APP_ID: string;
    readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }