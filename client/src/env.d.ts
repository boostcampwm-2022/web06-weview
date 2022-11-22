interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
  readonly VITE_LOCAL_URL: string;
  readonly VITE_GITHUB_AUTH_SERVER_URL: string;
  readonly VITE_API_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
