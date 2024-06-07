import { Account } from "./accounty";

export interface Customer{
     
    id: number,
    name: string,
    account: Account,
    startBalanceStatus: number,
    startBalance: number,
    currentBalance: number,
    address: string,
    phones: string,
    notes: string,
    active: boolean

}