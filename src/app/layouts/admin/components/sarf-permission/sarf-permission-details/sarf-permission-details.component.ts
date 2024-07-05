import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormMode } from 'src/app/constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith, take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
 import { AppResponse } from 'src/app/model/app_response.model';
import { ActivatedRoute } from '@angular/router';
import { emptySalesOrder } from 'src/app/model/sales-order.model';
import { SarfPermissionDetailsFormDialogComponent } from '../sarf-permission-details-form-dialog/sarf-permission-details-form-dialog.component';
import { SarfPermissionService } from 'src/app/service/sarfPermission.service';
@Component({
  selector: 'app-sale-details',
  templateUrl: './sarf-permission-details.component.html',
  styleUrls: ['./sarf-permission-details.component.scss']
})
export class SarfPermissionDetailsComponent {

  invoiceForm: FormGroup;


  permission: any = emptySalesOrder;

  invoceTotal: number = 0;
  displayedColumns: string[] = ['id', 'store', 'orderItem', 'unit', 'amount',   'actions'];


  detailsItems: any[] = [];
  dataSource = new MatTableDataSource<any>(this.detailsItems);
  id: number;


  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private sarfPermissionService: SarfPermissionService,
     private route: ActivatedRoute,

  ) {
    this.invoiceForm = this.fb.group({
      id: [0,],
      notes: [null],
    });
  }

  filteredClients: Observable<any[]>;


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getDetails(params['id']);

    });
  }


  onSubmit() {
    console.log(this.invoiceForm.value);

    Swal.fire({
      icon: 'warning',
      title: 'سيتم اعتماد الاذن و تصبح غير قابل للتعدبل',
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
        this.sarfPermissionService.approve(this.invoiceForm.value).subscribe({
          next: (response: AppResponse) => {
            if (response.ok) {
              Swal.fire({
                icon: "success",
                title: response.message,
                showConfirmButton: true
              });

              this.permission = response.data;
              this.setInvoice();
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
    });





  }

  getDetails(id: number) {
    this.sarfPermissionService.findById(id).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.detailsItems = response.data.detailsItems;
          this.dataSource = new MatTableDataSource<any>(this.detailsItems);

          this.permission = response.data;
          this.setInvoice();
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

  setInvoice() {
    this.invoiceForm = this.fb.group({
      id: [this.permission.id,],
      notes: [this.permission.notes],
    });
  }

  openAddInvItemDialog() {
    const data = {
      title: 'اضافة صنف الي الاذن',
      formMode: FormMode.CREATE,
      permissionId: this.id
    };
    const dialogRef = this.dialog.open(SarfPermissionDetailsFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {

      if (result !== null) {

        this.permission = result;
        this.detailsItems = this.permission.detailsItems;
        this.dataSource = new MatTableDataSource<any>(this.detailsItems);
        this.setInvoice();


      }
    });
  }

  openEditInvItemDialog(permissionItem) {

    const data = {
      title: 'تعديل صنف في الفاتورة',
      formMode: FormMode.EDIT,
      permissionItem: permissionItem,
      permissionId: this.id
    };
    const dialogRef = this.dialog.open(SarfPermissionDetailsFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {


      if (result) {
        this.detailsItems = result;
        this.dataSource = new MatTableDataSource<any>(this.detailsItems);

      }
    });
  }


  deleteInvItem(invItem) {

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

        this.sarfPermissionService.deleteItem(invItem.id).subscribe(
          {
            next: (response: any) => {

              if (response.ok) {
                Swal.fire({
                  icon: "success",
                  title: response.message,
                  showConfirmButton: false,
                  timer: 1500
                });
                this.permission = response.data;

                this.detailsItems = response.data.detailsItems;
                this.dataSource = new MatTableDataSource<any>(this.detailsItems);

              }


            },
            error: (error: AppResponse) => {
              Swal.fire({
                icon: "error",
                title: error.message,
                showConfirmButton: false,
                timer: 1500
              });
            }
          }
        );
      }
    }
    );
  }

}
