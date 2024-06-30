import { Account, emptyAccount } from "./accounty";
import { SupplierCategory } from "./supplierCategory";

export interface Supplier{

    id: number,
    name: string,
    account: Account,
    supplierCategory: SupplierCategory,
    startBalanceStatus: number,
    startBalance: number,
    currentBalance: number,
    address: string,
    phones: string,
    notes: string,
    active: boolean

}


export const emptySupplier ={

  id: 0,
  name: '',
  account:emptyAccount,
  supplierCategory: {
    id: 0,
    name: '',
    active: false
  },
  startBalanceStatus: 0,
  startBalance: 0,
  currentBalance: 0,
  address: '',
  phones: '',
  notes: '',
  active: false

}
