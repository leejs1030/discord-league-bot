declare global {
  namespace NodeJS {
    interface ProcessEnv {
      botToken: string;
      riotKey: string;
      guildId: string;
      environment: 'dev' | 'prod' | 'debug';
    }
  }
}

export {};
