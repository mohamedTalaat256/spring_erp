import { AccountType } from "./account-type";

export interface Account{
     
    id: number,
    name: string,
    accountType: AccountType,
    isParent: boolean,
    parentAccount_number: number,
    accountNumber: number,
    startBalanceStatus: number,
    startBalance: number,
    currentBalance: number,
    otherTableFk: number,
    notes: string,
    active: boolean

}