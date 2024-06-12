interface ConfigKey {
    BASE_URI: string;
  }
  
 export const CONFIG_KEY: ConfigKey = {
    BASE_URI: import.meta.env.VITE_APP_BASE_URL ||  "http://localhost:3000/api",
  };
  
  console.log(CONFIG_KEY, "config");
  