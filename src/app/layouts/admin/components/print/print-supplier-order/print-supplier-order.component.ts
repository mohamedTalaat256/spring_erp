import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AppResponse } from 'src/app/model/app_response.model';
import { emptySupplierOrderReturn } from 'src/app/model/supplierOrderReturn';
import { SupplierOrderService } from 'src/app/service/supplierOrder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-print-supplier-order',
  templateUrl: './print-supplier-order.component.html',
  styleUrls: ['./print-supplier-order.component.scss']
})
export class PrintSupplierOrderComponent {

  order: any = emptySupplierOrderReturn;
  displayedColumns: string[] = ['id', 'store', 'orderItem', 'unit', 'price', 'amount', 'total'];


  salesInvoiceDetails: any[] = [];
  dataSource = new MatTableDataSource<any>(this.salesInvoiceDetails);
  id: number;


  constructor(
    private service: SupplierOrderService,
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
          this.salesInvoiceDetails = response.data.salesInvoiceDetails;
          this.dataSource = new MatTableDataSource<any>(this.salesInvoiceDetails);

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
