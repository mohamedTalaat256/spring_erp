import { InvItemCategory } from "./invItemCategory";
import { InvUom } from "./invUom";

export interface InvItem{
    id: number;
    barcode: string;
    name: string;
    itemType: number;

    invItemCategory: InvItemCategory;
    parentInvItemCard: InvItem; 
    uom: InvUom; 
    doesHasRetailunit: boolean;
    retailUom: InvUom;

    retailUomQuntToParent: number;
  
    price: number; 
    nosGomlaPrice: number;
    gomlaPrice: number;
    costPrice: number; 


    priceRetail: number; 
    nosGomlaPriceRetail: number;
    gomlaPriceRetail: number;
    costPriceRetail: number;

    hasFixcedPrice: boolean; 

    QUENTITY: number; 
    QUENTITY_Retail: number;
    QUENTITY_all_Retails: number; 
    allQUENTITY: number; 

    photo: string; 
    active: boolean;

}