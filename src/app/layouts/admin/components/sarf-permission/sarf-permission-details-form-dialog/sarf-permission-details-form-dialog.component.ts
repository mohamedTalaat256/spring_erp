import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode } from 'src/app/constants/constants';
import { Observable, map, startWith, take } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { InvItem, emptyItem, emptyUom } from 'src/app/model/invItem';
import { InvItemService } from 'src/app/service/invItem.service';
import { InvUom } from 'src/app/model/invUom';
import { Store } from 'src/app/model/store';
import { SalesService } from 'src/app/service/sale.service';
 import { SalesOrderDetailsService } from 'src/app/service/salesOrderDetails.service';
import { ItemsBalanceService } from 'src/app/service/itemsBalance.service';
import { SupplierOrderReturnDetailsFormControl } from '../../../form-controls/supplierOrderReturnDetails-form';
import { SarfPermissionDetailsFormControl } from '../../../form-controls/sarfPermissionDetails-form';
import { SarfPermissionService } from 'src/app/service/sarfPermission.service';


@Component({
  selector: 'app-sarf-permission-details-form-dialog',
  templateUrl: './sarf-permission-details-form-dialog.component.html',
  styleUrls: ['./sarf-permission-details-form-dialog.component.scss']
})
export class SarfPermissionDetailsFormDialogComponent implements OnInit {

  invItemFormControl = new FormControl<string | any>('', [Validators.required]);

  invItems: InvItem[] = [];
  stores: Store[] = [];
  selectedItem: InvItem=emptyItem;
  uom: InvUom;
  filteredInvItems: Observable<any[]>;
  newInvItemForm: FormGroup;
  title: string;
  permissionId: number;
  itemBatches: any[] = [];
  selectedUom: InvUom = emptyUom;


  constructor(
    private sarfPermissionDetailsFormControl: SarfPermissionDetailsFormControl,
    private invItemService: InvItemService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SarfPermissionDetailsFormDialogComponent>,
    private salesOrderDetailsService: SalesOrderDetailsService,
    private sarfPermissionService: SarfPermissionService,
    private salesService: SalesService,
  ) {


    if (this.data.formMode === FormMode.CREATE) {
      this.newInvItemForm = this.sarfPermissionDetailsFormControl.createForm();

    } else {
      this.newInvItemForm = this.sarfPermissionDetailsFormControl.setForm(this.data.permissionItem);
      this.invItemFormControl.setValue( {
        id: this.data.orderItem.invItemCard.id,
        name: this.data.orderItem.invItemCard.name
      });

      this.selectedItem = this.data.orderItem;

    }
    this.title = this.data.title;
    this.permissionId = this.data.permissionId;

    this.newInvItemForm.patchValue({
      permissionId: Number(this.permissionId)
    });
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.salesService.getAllData().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.invItems = response.data.invItems;
          this.stores = response.data.stores;
          this.setFilters();
        }
      },
      error: (error: Error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
          showConfirmButton: true
        });
      }

    });
  }


  onSubmit() {

    this.sarfPermissionService
      .saveItem(this.newInvItemForm.value)
      .pipe(take(1))
      .subscribe({
        next: (response: AppResponse) => {
          if(response.ok){

            Swal.fire({
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
          this.dialogRef.close(response.data);
          }
        },
        error: (error: AppResponse) => {
          Swal.fire({
            icon: 'error',
            title: error.message,
            showConfirmButton: false,
          });
        },
      });
  }


  setFilters() {
    this.filteredInvItems = this.invItemFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._invItemFilter(name as string) : this.invItems.slice();
      }),
    );
  }

  invItemDisplayFn(invItem: any): string {
    return invItem && invItem.name ? invItem.name : '';
  }

  private _invItemFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.invItems.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  selectedInvItem(event: MatAutocompleteSelectedEvent) {

    this.newInvItemForm.patchValue({
      invItemCard: event.option.value.id
    }, { onlySelf: true, emitEvent: true });
    this.setSelectedItem(event.option.value.id);

  }

  selectedInvUom(event) {
    this.setSelectedItem(this.selectedItem.id);
    this.selectedUom = this.newInvItemForm.value.uom;
  }


  setSelectedItem(id:number) {

    this.selectedItem = this.invItems.filter( i=> i.id === id)[0];
  }
}
