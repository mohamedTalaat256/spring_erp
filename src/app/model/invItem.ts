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
    doesHasRetailUnit: boolean;
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

export const emptyItem: InvItem={
    id: 0,
    barcode: null,
    name: null,
    itemType: null,

    invItemCategory: {
        id: 0,
        name: null,
        active: null
    },
    parentInvItemCard: null, 
    uom: {
        id: 0,
        name: null,
        isMaster: null,
        active: null
    }, 
    doesHasRetailUnit: null,
    retailUom:  {
        id: 0,
        name: null,
        isMaster: null,
        active: null
    },

    retailUomQuntToParent: null,
  
    price: null, 
    nosGomlaPrice: null,
    gomlaPrice: null,
    costPrice: null, 


    priceRetail: null, 
    nosGomlaPriceRetail: null,
    gomlaPriceRetail: null,
    costPriceRetail: null,

    hasFixcedPrice: null, 

    QUENTITY: null, 
    QUENTITY_Retail: null,
    QUENTITY_all_Retails: null, 
    allQUENTITY: null, 

    photo: null, 
    active: null,
}