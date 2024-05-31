
export interface InvItem{
    id: number;
    item_type: number;
    name: string;
    inv_itemcard_categories_id: number;
    parent_inv_itemcard_id: number; 
    does_has_retailunit: boolean;
    retail_uom: number;
    uom_id: number; 
    retail_uom_quntToParent: number;
    com_code: string; 
    active: boolean;
    date: string;
    item_code: number;
    barcode: string;
    price: number; 
    nos_gomla_price: number;
    gomla_price: number;
    price_retail: number; 
    nos_gomla_price_retail: number;
    gomla_price_retail: number;
    cost_price: number; 
    cost_price_retail: number;
    has_fixced_price: boolean; 
    QUENTITY: number; 
    QUENTITY_Retail: number;
    QUENTITY_all_Retails: number; 
    photo: string; 
    retail_uom_id: number; 
    All_QUENTITY: number; 
}