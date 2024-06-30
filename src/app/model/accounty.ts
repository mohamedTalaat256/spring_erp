import { AccountType, emptyAccountType } from "./account-type";

export interface Account{

    id: number,
    name: string,
    accountType: AccountType,
    isParent: boolean,
    parentAccount_number: number,
    accountNumber?: number,
    startBalanceStatus: number,
    startBalance: number,
    currentBalance: number,
    notes: string,
    active: boolean

}

export const emptyAccount ={
  id: 0,
  name: '',
  accountType: emptyAccountType,
  isParent: false,
  accountNumber: 0,
  parentAccount_number: 0,
  startBalanceStatus: 0,
  startBalance: 0,
  currentBalance: 0,
  notes: '',
  active: false
}
