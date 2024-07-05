import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode, ITEM_TYPES } from 'src/app/constants/constants';
import { Observable, map, startWith, take } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { salesFormControl } from '../../../form-controls/sales-form';
import { SalesService } from 'src/app/service/sale.service';
import { PriceInvoiceFormControl } from '../../../form-controls/priceInvoice-form';
import { PriceInvoiceService } from 'src/app/service/priceInvoice.service';

@Component({
  selector: 'app-price-invoice-form-dialog',
  templateUrl: './price-invoice-form-dialog.component.html',
  styleUrls: ['./price-invoice-form-dialog.component.scss']
})
export class PriceInvoiceFormDialogComponent {

  customerFormControl = new FormControl<string | any>('',[Validators.required]);

  priceInvoiceForm: FormGroup;
  title: string;

  showParentAccounts: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PriceInvoiceFormDialogComponent>,
    private priceInvoiceFormControl: PriceInvoiceFormControl,
    private router: Router,
    private salesService: SalesService,
    private priceInvoiceService: PriceInvoiceService
  ) {


    if (this.data.formMode === FormMode.CREATE) {
      this.priceInvoiceForm = this.priceInvoiceFormControl.createForm();
    } else {
      this.priceInvoiceForm = this.priceInvoiceFormControl.setForm(this.data.priceInvoice);
     }

    this.title = this.data.title;
  }


  filteredIems: Observable<any[]>;

  ngOnInit() {

  }


  onSubmit() {

    console.log(this.priceInvoiceForm.value);

    this.priceInvoiceService
      .save(this.priceInvoiceForm.value, this.data.formMode)
      .pipe(take(1))
      .subscribe({
        next: (response: AppResponse) => {
          if(response.ok){

            this.router.navigate(['/admin/priceInvoiceDetails/'+response.data.id]);
            this.dialogRef.close();
            Swal.fire({
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
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

}
