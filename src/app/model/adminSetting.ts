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
