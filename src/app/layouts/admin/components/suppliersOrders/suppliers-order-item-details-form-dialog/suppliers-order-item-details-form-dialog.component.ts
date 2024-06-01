import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode, ITEM_TYPES } from 'src/app/constants/constants';
import { Observable, map, startWith, take } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { supplierOrderFormControl } from '../../../form-controls/supplier-order-form';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SupplierOrderService } from 'src/app/service/supplierOrder.service';
import { Router } from '@angular/router';
import { InvItem } from 'src/app/model/invItem';
import { SupplierOrderDetailsItemForm } from '../../../form-controls/supplierOrderDetailsItem-form';
import { InvItemService } from 'src/app/service/invItem.service';

@Component({
  selector: 'app-suppliers-order-item-details-form-dialog',
  templateUrl: './suppliers-order-item-details-form-dialog.component.html',
  styleUrls: ['./suppliers-order-item-details-form-dialog.component.scss']
})
export class SuppliersOrderItemDetailsFormDialogComponent implements OnInit {

  invItemFormControl = new FormControl<string | any>('', [Validators.required]);

  invItems: InvItem[] = [];
  filteredInvItems: Observable<any[]>;


  newInvItemForm: FormGroup;

  title: string;


  constructor(
    private supplierOrderDetailsItemForm: SupplierOrderDetailsItemForm,
    private invItemService: InvItemService
  ){

    this.newInvItemForm = this.supplierOrderDetailsItemForm.createForm();
  }

  ngOnInit(): void {
    this.getAllInvItems();

    this.setFilters();
  }

  getAllInvItems(){
    this.invItemService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.invItems = response.data.invItems;
          //this.dataSource = new MatTableDataSource<any>(this.invItems);
           
         
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


  onSubmit() { }


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
      item_code_add: event.option.value.id
    }, { onlySelf: true, emitEvent: true });

  }
}
