
export interface SupplierOrder{
     
    id: number,
    order_date: string,
    order_type: number, //	1-Burshase 2-return on same pill 3-return on general	
    auto_serial: number,
    DOC_NO: string,
    suuplier_code: number,
    is_approved?: boolean,
    notes: string,
    discount_type: number, //نواع الخصم - واحد خصم نسبة - اثنين خصم يدوي قيمة
    discount_value: number, //قيمة الخصم
    tax_percent: number,
    total_cost_items: number,
    tax_value: string,

    total_befor_discount: number, 
    total_cost: number, 
    account_number: number, 
    money_for_account: number, 
    pill_type: number,  //نوع الفاتورة - كاش او اجل - واحد واثنين
    what_paid: number, 
    what_remain: number, 
    treasuries_transactions_id: number, 
    Supplier_balance_befor: number, //حالة رصيد المورد قبل الفاتروة
    Supplier_balance_after: number, //حالة رصيد المورد بعد الفاتروة
    store_id: number, 
    approved_by: number,
    
    active: boolean

}