import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AppResponse } from 'src/app/model/app_response.model';
import { emptySupplierOrderReturn } from 'src/app/model/supplierOrderReturn';
import { SupplierOrderService } from 'src/app/service/supplierOrder.service';
import { SupplierOrderReturnService } from 'src/app/service/supplierOrderReturn.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-print-supplier-order-return',
  templateUrl: './print-supplier-order-return.component.html',
  styleUrls: ['./print-supplier-order-return.component.scss']
})
export class PrintSupplierOrderReturnComponent {

  order: any = emptySupplierOrderReturn;
  displayedColumns: string[] = ['id', 'unit', 'orderItem', 'price', 'amount', 'total'];


  supplierOrderDetailsItems: any[] = [];
  dataSource = new MatTableDataSource<any>(this.supplierOrderDetailsItems);
  id: number;


  constructor(
    private service: SupplierOrderReturnService,
    private route: ActivatedRoute,
  ) {

  }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getSalesOrderDetails(params['id']);

    });
  }



  getSalesOrderDetails(id: number) {
    this.service.findById(id).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.supplierOrderDetailsItems = response.data.supplierOrderDetailsItems;
          this.dataSource = new MatTableDataSource<any>(this.supplierOrderDetailsItems);

          this.order = response.data;
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
