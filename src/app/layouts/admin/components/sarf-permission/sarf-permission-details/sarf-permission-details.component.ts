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
import { SalesService } from 'src/app/service/sale.service';
@Component({
  selector: 'app-sale-details',
  templateUrl: './sarf-permission-details.component.html',
  styleUrls: ['./sarf-permission-details.component.scss']
})
export class SarfPermissionDetailsComponent {

  permission: any = emptySalesOrder;

  invoceTotal: number = 0;
  displayedColumns: string[] = ['id', 'store', 'orderItem', 'unit', 'amount'];


  detailsItems: any[] = [];
  dataSource = new MatTableDataSource<any>(this.detailsItems);
  id: number;


  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private sarfPermissionService: SarfPermissionService,
    private salesService: SalesService,
     private route: ActivatedRoute,

  ) {
  }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getDetails(params['id']);

    });
  }




  getDetails(id: number) {
    this.salesService.findById(id).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.detailsItems = response.data.salesInvoiceDetails;
          this.dataSource = new MatTableDataSource<any>(this.detailsItems);

          this.permission = response.data;
          this.dataSource = new MatTableDataSource<any>(this.detailsItems);

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



}
