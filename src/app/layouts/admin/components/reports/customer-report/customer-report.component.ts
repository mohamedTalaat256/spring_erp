import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import { Customer } from 'src/app/model/customer';
import { emptySupplier } from 'src/app/model/supplier';
import { CustomerService } from 'src/app/service/customer.service';
import { ReportService } from 'src/app/service/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.scss']
})
export class CustomerReportComponent {

  customerFormControl = new FormControl<string | any>('');
  filteredSuppliers: Observable<any[]>;
  searchForm: FormGroup;

  customers: Customer[] = [];
  customer = emptySupplier;

  data: any = null;

  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private reportService: ReportService

  ) {

    this.searchForm = this.fb.group({
      customer: [null],
      fromDate: [null],
      toDate: [null]
    });

  }

  ngOnInit(): void {
    this.findAllCustomers();
  }


  onSubmitSearch() {
    console.log(this.searchForm.value);

    this.reportService.supplierCustomerReport(this.searchForm.value).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.data = response.data;
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

  findAllCustomers() {
    this.customerService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.customers = response.data;
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

  setFilters() {
    this.filteredSuppliers = this.customerFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._customerFilter(name as string) : this.customers.slice();
      }),
    );
  }

  customerDisplayFn(customer: any): string {
    return customer && customer.name ? customer.name : '';
  }

  private _customerFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.customers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  selectedCustomer(event: MatAutocompleteSelectedEvent) {

    this.customer = event.option.value;
    this.searchForm.patchValue({
      customer: event.option.value.id
    }, { onlySelf: true, emitEvent: true });


  }
}
