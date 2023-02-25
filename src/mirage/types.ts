import { Model, Registry, Server } from "miragejs";
import { ModelDefinition } from "miragejs/-types";
import Schema from "miragejs/orm/schema";

export type CustomerType = {
    nombre: string;
    apellido: string;
    empresa: string;
    email: string;
};
export type AdminType = {
    email: string;
    nombre: string;
    password: string;
};

export const customerModel: ModelDefinition<CustomerType> = Model.extend({})
export const adminModel: ModelDefinition<AdminType> = Model.extend({})

export type AppRegistry = Registry<
    {
        customers: typeof customerModel,
        admins: typeof adminModel
    }, {}>;

export type AppSchema = Schema<AppRegistry>

export type AppServer = Server<AppRegistry>