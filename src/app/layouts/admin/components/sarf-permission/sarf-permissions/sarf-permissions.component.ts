import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith, take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
 import { SalesService } from 'src/app/service/sale.service';
import { SarfPermissionService } from 'src/app/service/sarfPermission.service';
import { SarfPermissionsFormDialogComponent } from '../sarf-permissions-form-dialog/sarf-permissions-form-dialog.component';


@Component({
  selector: 'app-sarf-permissions',
  templateUrl: './sarf-permissions.component.html',
  styleUrls: ['./sarf-permissions.component.scss']
})
export class SarfPermissionsComponent {
  customerFormControl = new FormControl<string | any>('');
  storeFormControl = new FormControl<string | any>('');


  customers: any[] = [];
  filteredcustomer: Observable<any[]>;
  searchForm: FormGroup;

  sarfPermissions: any[] = [];

  createData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = [
    'autoSerial',
    'supplierName',
    'date',
    'totalCost',
    'reciever',
    'actions'
  ];
  dataSource = new MatTableDataSource<any>(this.sarfPermissions);

  constructor(public dialog: MatDialog,
    private sarfPermissionService: SarfPermissionService,
    private fb: FormBuilder
    ) {
      this.searchForm = this.fb.group({
        barCode: [null],
        store: [null],
        supplier: [null],
        fromDate: [null],
        toDate: [null]
      });
     }



  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.sarfPermissionService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.customers = response.data.customers;
          this.sarfPermissions = response.data.sarfPermissions;

          this.dataSource = new MatTableDataSource<any>(this.sarfPermissions);
          this.dataSource.paginator = this.paginator;
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

  onSubmitSearch(){}


  openAddNew() {

    const data = {
      title: 'اضافة اذن صرف ',
      formMode: FormMode.CREATE,
      customers: this.customers
    };
    this.dialog.open(SarfPermissionsFormDialogComponent, {
      width: '650px',
      height: 'auto',
      data: data
    });
  }


  openEditDialog(permission: any) {
    const data = {
      title: 'تعديل اذن صرف',
      formMode: FormMode.EDIT,
      permission: permission,
      customers: this.customers

    };
    const dialogRef = this.dialog.open(SarfPermissionsFormDialogComponent, {
      width: '650px',
      height: 'auto',
      data: data
    });
  }




  setFilters(){
    this.filteredcustomer = this.customerFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._customerFilter(name as string) : this.customers.slice();
      }),
    );


  }

  customerDisplayFn(supplier: any): string {
    return supplier && supplier.name ? supplier.name : '';
  }

  private _customerFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.customers.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  deletePermission(permissionId: number){

    Swal.fire({
      icon: 'warning',
      title: 'تأكيد',
      showDenyButton: true,
      confirmButtonText: 'نعم',
      confirmButtonColor: '#ed1818',
      denyButtonText: 'لا',
      denyButtonColor: '#54e9ac',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2'
      },
    }).then((result) => {
      if (result.isConfirmed) {

        this.sarfPermissionService.delete(permissionId).subscribe(
          {
            next:(response: AppResponse)=>{
              if(response.ok){

                Swal.fire({
                  icon: "success",
                  title: response.message,
                  showConfirmButton: false,
                  timer: 1500
                });
                this.sarfPermissions = this.sarfPermissions.filter(i=> i.id !== permissionId);
                this.dataSource = new MatTableDataSource<any>(this.sarfPermissions);
                this.dataSource.paginator = this.paginator;
              }


            },
            error:(error: AppResponse)=>{
              Swal.fire({
                icon: "error",
                title: error.message,
                showConfirmButton: false,
                timer: 1500
              });
            }
          }
        );
       }}
      );

  }




}
