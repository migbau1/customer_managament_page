import { createServer } from "miragejs";

import { LowSync } from "lowdb";
import { LocalStorage } from "lowdb/browser";

type customer = {
  nombre: string;
  apellido: string;
};

type customers = {
  customers: Array<customer>;
};

const adapter = new LocalStorage("db");
const db = new LowSync<customers>(adapter);

createServer({
  routes() {
    this.namespace = "api";
    
    this.get("/hello", () => {
      return {
        msg: "hello!",
      };
    });
    this.post("/login", () => {
      return {
        data: {
          tk: "",
          msg: "hello!",
        },
      };
    });
  },
});
