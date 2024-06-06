import { SupplierCategory } from "./supplierCategory";

export interface Supplier{
     
    id: number,
    name: string,
    accountNumber: number,
    supplierCategory: SupplierCategory,
    startBalanceStatus: number,
    startBalance: number,
    currentBalance: number,
    address: string,
    phones: string,
    notes: string,
    active: boolean

}