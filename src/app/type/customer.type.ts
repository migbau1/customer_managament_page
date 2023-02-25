import { CustomerType } from "../../mirage/types"

export interface ICustomerState {
  data: Array<CustomerType>
  isLoading: boolean
  meta: {
    limit: number,
    offset: number,
    count: number
  }
  edit: boolean
  selected: {
    nombre: string
    apellido: string
    empresa: string
    email: string
    id: number
}
}