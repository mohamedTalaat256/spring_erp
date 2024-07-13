import { FormBuilder, Validators} from '@angular/forms';
import { Injectable } from '@angular/core';
import { InvItem } from 'src/app/model/invItem';

@Injectable({
  providedIn: 'root'
})
export class InvItemForm {
  constructor(public fb: FormBuilder ) {
  }


  /*

    name: string;
    inv_itemcard_categories_id: number;
    parent_inv_itemcard_id: number;
    does_has_retailunit: boolean;
    retail_uom: number;
    uom: number;
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


  */

  createForm() {
    return this.fb.group(
      {
        id:                      [null],
        barcode:                 [null, [Validators.maxLength(255)]],
        name:                    [null, [Validators.required, Validators.maxLength(255)]],
        itemType:                [null, [Validators.required ]],
        invItemCategory:         [null, [Validators.required ]],
        parentInvItemCard:       [null, [Validators.required ]],
        uom:                     [null, [Validators.required ]],
        doesHasRetailUnit:       [null, [Validators.required ]],
        retailUom:               [null,                       ],      // <=========
        retailUomQuntToParent:   [null,                       ],      // <=========

        price:                   [null, [Validators.required ]],
        nosGomlaPrice:           [null, [Validators.required ]],
        gomlaPrice:              [null, [Validators.required ]],
        costPrice:               [null, [Validators.required ]],

        priceRetail:             [null,                       ],      // <=========
        nosGomlaPriceRetail:     [null,                       ],      // <=========
        gomlaPriceRetail:        [null,                       ],      // <=========
        costPriceRetail:         [null,                       ],      // <=========

        hasFixcedPrice:          [null, [Validators.required]],
        active:                  [null, [Validators.required]],
      }
    );
  }

  setForm(data: InvItem) {
    //s/dfsd/f


    return this.fb.group(
      {
        id:                      [data.id],
        barcode:                 [data.barcode, [Validators.maxLength(255)]],
        name:                    [data.name, [Validators.required, Validators.maxLength(255)]],
        itemType:                [data.itemType, [Validators.required ]],
        invItemCategory:         [data.invItemCategory?  data.invItemCategory.id: null, [Validators.required ]],
        parentInvItemCard:       [data.parentInvItemCard? data.parentInvItemCard.id : null],
        uom:                     [data.uom ? data.uom.id: null, [Validators.required ]],
        doesHasRetailUnit:       [data.doesHasRetailUnit, [Validators.required ]],
        retailUom:               [data.retailUom ? data.retailUom.id: null,           ],      // <=========
        retailUomQuntToParent:   [data.retailUomQuntToParent,                         ],      // <=========
        price:                   [data.price,                   [Validators.required ]],
        nosGomlaPrice:           [data.nosGomlaPrice,           [Validators.required ]],
        gomlaPrice:              [data.gomlaPrice,              [Validators.required ]],
        costPrice:               [data.costPrice,               [Validators.required ]],
        priceRetail:             [data.priceRetail,                                   ],      // <=========
        nosGomlaPriceRetail:     [data.nosGomlaPriceRetail,                           ],      // <=========
        gomlaPriceRetail:        [data.gomlaPriceRetail,                              ],      // <=========
        costPriceRetail:         [data.costPriceRetail,                               ],      // <=========
        hasFixcedPrice:          [data.hasFixcedPrice,          [Validators.required ]],
        active:                  [data.active,                  [Validators.required ]],
      }

    );
  }
}
