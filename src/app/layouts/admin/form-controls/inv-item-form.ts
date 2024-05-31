import { FormBuilder, Validators} from '@angular/forms';
import { Injectable } from '@angular/core'; 
import { InvItem } from 'src/app/model/invItem';

@Injectable({
  providedIn: 'root'
})
export class InvItemForm {
  constructor(public fb: FormBuilder ) {
  } 

  createForm() {
    return this.fb.group(
      {
        id:       [null],
        barCode:     [null, [Validators.maxLength(255)]],
        name:     [null, [Validators.required, Validators.maxLength(255)]],
        itemType:     [null, [Validators.required, Validators.maxLength(255)]],
        invItemcardCategoriesId:     [null, [Validators.required, Validators.maxLength(255)]],
        parentInvItemcardId:     [null, [Validators.required, Validators.maxLength(255)]],
        retailUomQuntToParent:     [null, [Validators.required, Validators.maxLength(255)]],
        doesHasRetailunit:     [null, [Validators.required, Validators.maxLength(255)]],
        retailUomId:     [null, [Validators.required, Validators.maxLength(255)]],
        priceRetail:     [null, [Validators.required, Validators.maxLength(255)]],
        nosGomlaPrice:     [null, [Validators.required, Validators.maxLength(255)]],
        gomlaPrice:     [null, [Validators.required, Validators.maxLength(255)]],
        costPrice:     [null, [Validators.required, Validators.maxLength(255)]],
        hasFixcedPrice:     [null, [Validators.required, Validators.maxLength(255)]],
        active:   [null, [Validators.required]],
      }
    );
  }
  
  setForm(data: InvItem) {
    return this.fb.group(
      {
        id:                      [data.id],
        barCode:                 [data.barcode, [ Validators.maxLength(255)]],
        name:                    [data.name, [Validators.required, Validators.maxLength(255)]],
        itemType:                [data.item_type, [Validators.required, Validators.maxLength(255)]],
        invItemcardCategoriesId: [data.inv_itemcard_categories_id, [Validators.required, Validators.maxLength(255)]],
        parentInvItemcardId:     [data.parent_inv_itemcard_id, [Validators.required, Validators.maxLength(255)]],
        retailUomQuntToParent:   [data.retail_uom_quntToParent, [Validators.required, Validators.maxLength(255)]],
        doesHasRetailunit:       [data.does_has_retailunit, [Validators.required, Validators.maxLength(255)]],
        retailUomId:             [data.retail_uom_id, [Validators.required, Validators.maxLength(255)]],
        priceRetail:             [data.price_retail, [Validators.required, Validators.maxLength(255)]],
        nosGomlaPrice:           [data.nos_gomla_price, [Validators.required, Validators.maxLength(255)]],
        gomlaPrice:              [data.gomla_price, [Validators.required, Validators.maxLength(255)]],
        costPrice:               [data.cost_price, [Validators.required, Validators.maxLength(255)]],
        hasFixcedPrice:          [data.has_fixced_price, [Validators.required, Validators.maxLength(255)]],
        active:                  [data.active, [Validators.required]],
      }
    );
  } 
}