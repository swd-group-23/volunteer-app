declare global {
    namespace NodeJS {
      interface ProcessEnv {
        __MONGO_URI__: string;
        __MONGO_DB_NAME__: string;
      }
    }
  }