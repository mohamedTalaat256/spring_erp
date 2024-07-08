import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import { emptySupplier, Supplier } from 'src/app/model/supplier';
import { ReportService } from 'src/app/service/report.service';
import { SupplierService } from 'src/app/service/supplier.service';
import { SupplierOrderService } from 'src/app/service/supplierOrder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-report',
  templateUrl: './supplier-report.component.html',
  styleUrls: ['./supplier-report.component.scss']
})
export class SupplierReportComponent {

  supplierFormControl = new FormControl<string | any>('');
  filteredSuppliers: Observable<any[]>;
  searchForm: FormGroup;

  suppliers: Supplier[] = [];
  supplier = emptySupplier;

  data: any = null;

  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private reportService: ReportService

  ) {

    this.searchForm = this.fb.group({
      supplier: [null],
      fromDate: [null],
      toDate: [null]
    });

  }

  ngOnInit(): void {
    this.findAllSuppliers();
  }


  onSubmitSearch() {
    console.log(this.searchForm.value);

    this.reportService.supplierAccountReport(this.searchForm.value).subscribe({
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

  findAllSuppliers() {
    this.supplierService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.suppliers = response.data.suppliers;
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
    this.filteredSuppliers = this.supplierFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._supplierFilter(name as string) : this.suppliers.slice();
      }),
    );
  }

  supplierDisplayFn(supplier: any): string {
    return supplier && supplier.name ? supplier.name : '';
  }

  private _supplierFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.suppliers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  selectedSupplier(event: MatAutocompleteSelectedEvent) {

    this.supplier = event.option.value;
    this.searchForm.patchValue({
      supplier: event.option.value.id
    }, { onlySelf: true, emitEvent: true });


  }
}
