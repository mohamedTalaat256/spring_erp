import { Supplier } from "./supplier";

export interface SupplierOrder{
     
    id: number,
    orderDate: string,
    orderType: number, //	1-Burshase 2-return on same pill 3-return on general	
    autoSerial: number,
    DOC_NO: string,
    suuplier: Supplier,
    isApproved?: boolean,
    notes: string,
    discountType: number, //نواع الخصم - واحد خصم نسبة - اثنين خصم يدوي قيمة
    discountValue: number, //قيمة الخصم
    taxPercent: number,
    totalCostItems: number,
    taxValue: string,

    totalBeforDiscount: number, 
    totalCost: number, 
    accountNumber: number, 
    moneyForAccount: number, 
    pillType: number,  //نوع الفاتورة - كاش او اجل - واحد واثنين
    whatPaid: number, 
    whatRemain: number, 
    treasuries_transactions_id: number, 
    SupplierBalanceBefor: number, //حالة رصيد المورد قبل الفاتروة
    SupplierBalanceAfter: number, //حالة رصيد المورد بعد الفاتروة
    store: number, 
    approvedBy: number,
    
    active: boolean

}