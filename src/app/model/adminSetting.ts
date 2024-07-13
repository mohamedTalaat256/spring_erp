import { Account } from "./accounty";

export interface AdminSetting{

    id: number,
    systemName: string,
    address: string,
    phone: string,
    photo: string,
    customerParentAccountNumber: number,
    suppliersParentAccountNumber: number,
    notes: string

}

export const emptySystemData={
    id: 0,
    systemName: '',
    address: '',
    phone: '',
    photo: '',
    customerParentAccountNumber: 0,
    suppliersParentAccountNumber: 0,
    notes: ''
}
