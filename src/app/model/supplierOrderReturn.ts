import { Store, emptyStore } from "./store"
import { Supplier, emptySupplier } from "./supplier"


export interface SupplierOrderReturn{

    id: number,
    orderDate: string,
    orderType: number, //	1-Burshase 2-return on same pill 3-return on general
    supplier: Supplier,
    isApproved?: boolean,
    notes: string,
    discountType: number, //نواع الخصم - واحد خصم نسبة - اثنين خصم يدوي قيمة
    discountValue: number, //قيمة الخصم
    taxPercent: number,
    totalCostItems: number,
    taxValue: string,
    discountPercent: number,
    totalBeforDiscount: number,
    totalCost: number,
    moneyForAccount: number,
    pillType: number,  //نوع الفاتورة - كاش او اجل - واحد واثنين
    whatPaid: number,
    whatRemain: number,
    SupplierBalanceBefor: number, //حالة رصيد المورد قبل الفاتروة
    SupplierBalanceAfter: number, //حالة رصيد المورد بعد الفاتروة
    store: Store,
    approvedBy: any,
    totalBeforeDiscount: number,
    active: boolean

}


export const emptySupplierOrderReturn:SupplierOrderReturn = {
    id: 0,
    orderDate: '',
    orderType: 0,
    supplier: emptySupplier,
    isApproved: false,
    notes: '',
    discountType: 0,
    discountValue: 0,
    taxPercent: 0,
    totalCostItems: 0,
    taxValue: '',
    discountPercent: 0,
    totalBeforDiscount: 0,
    totalCost: 0,
    moneyForAccount: 0,
    pillType: 0,
    whatPaid: 0,
    whatRemain: 0,
    SupplierBalanceBefor: 0,
    SupplierBalanceAfter: 0,
    store:emptyStore,
    approvedBy: null,
    totalBeforeDiscount: 0,
    active: false
}

