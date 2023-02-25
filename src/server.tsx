import { createServer } from "miragejs";
import { adminSeed, customerSeed } from "./mirage/fake";
import { adminModel, AppSchema, AppServer, customerModel } from "./mirage/types";
import * as jose from 'jose'

const secret = new TextEncoder().encode(
  'SECRET123',
)
const alg = 'HS256'

createServer({
  models: {
    customers: customerModel,
    admins: adminModel
  },
  routes() {
    this.namespace = "api";

    this.post("/login", async (schema: AppSchema, request) => {

      const credentials = JSON.parse(request.requestBody)
      const adminFind = schema.where("admins", {
        email: credentials?.email,
        password: credentials?.password
      })
      if (adminFind.length < 0) {
        throw new Error("Error with email or password")
      }

      const formated = adminFind.models.map(async (value) => {
        const { email, nombre } = value
        const tk = await new jose.SignJWT({ email, nombre })
          .setProtectedHeader({ alg }).sign(secret)
        return { email, nombre, tk }
      })

      return await formated[0]
    })

    this.post("/admin_list_active_users", async (schema: AppSchema, request) => {
      const condition = await decodeTk(request.requestHeaders.authorization.replace("Bearer ", ""))
      if (!condition.grants) {
        return {
          status: 500,
          validated: false
        }
      }
      const customers = schema.all("customers")


      return {
        data: customers.models,
        limit: customers.length,
        offset: customers.length
      }
    })

    this.post("/customer_created", async (schema: AppSchema, request) => {
      const condition = await decodeTk(request.requestHeaders.authorization.replace("Bearer ", ""))
      if (!condition.grants) {
        return {
          status: 500,
          validated: false
        }
      }

      schema.create("customers", JSON.parse(request.requestBody))

      const customers = schema.all("customers")
      return {
        data: customers.models,
        limit: customers.length,
        offset: customers.length
      }
    })
    this.post("/customer/:id", async (schema: AppSchema, request) => {
      const condition = await decodeTk(request.requestHeaders.authorization.replace("Bearer ", ""))
      if (!condition.grants) {
        return {
          status: 500,
          validated: false
        }
      }

      const subject = schema.find("customers", request.params.id)
      subject?.destroy()

      const customers = schema.all("customers")
      return {
        data: customers.models,
        limit: customers.length,
        offset: customers.length
      }
    })

    this.post("/customer_updated", async (schema: AppSchema, request) => {
      const condition = await decodeTk(request.requestHeaders.authorization.replace("Bearer ", ""))
      if (!condition.grants) {
        return {
          status: 500,
          validated: false
        }
      }
      const tempInfo = JSON.parse(request.requestBody)

      const subject = schema.find("customers", tempInfo.id)
      subject?.update("nombre", tempInfo.nombre)
      subject?.update("apellido", tempInfo.apellido)
      subject?.update("empresa", tempInfo.empresa)
      subject?.update("email", tempInfo.email)

      const customers = schema.all("customers")
      return {
        data: customers.models,
        limit: customers.length,
        offset: customers.length
      }
    })

    this.get("/authenticated", async (schema: AppSchema, request) => {

      const condition = await decodeTk(request.requestHeaders.authorization.replace("Bearer ", ""))
      console.log(condition);

      if (!condition.grants) {
        return {
          status: 500,
          validated: false
        }
      }
      return {
        status: 200,
        validated: true,
        ...condition.payload
      }
    })
  },

  seeds(server: AppServer) {
    server.db.loadData({
      customers: customerSeed,
      admins: adminSeed
    })
  },
});


async function decodeTk(tk: string) {
  try {
    const { payload } = await jose.jwtVerify(tk, secret)

    return {
      grants: true,
      payload
    }
  } catch (error) {
    console.log(error);

    return {
      grants: false,
      msg: error
    }
  }
}
