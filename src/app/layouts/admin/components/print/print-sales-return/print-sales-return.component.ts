import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AppResponse } from 'src/app/model/app_response.model';
import { emptySalesOrder } from 'src/app/model/sales-order.model';
import { SalesReturnService } from 'src/app/service/saleReturn.service';
import { SupplierOrderService } from 'src/app/service/supplierOrder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pring-sales-return',
  templateUrl: './print-sales-return.component.html',
  styleUrls: ['./print-sales-return.component.scss']
})
export class PrintSalesReturnComponent {

  order: any = emptySalesOrder;
  displayedColumns: string[] = ['id', 'store', 'orderItem', 'unit', 'price', 'amount', 'total'];


  salesInvoiceDetails: any[] = [];
  dataSource = new MatTableDataSource<any>(this.salesInvoiceDetails);
  id: number;


  constructor(
    private service: SalesReturnService,
    private route: ActivatedRoute,
  ) {

  }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getOrder(params['id']);

    });
  }



  getOrder(id: number) {
    this.service.findById(id).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.salesInvoiceDetails = response.data.salesInvoicesReturnDetails;
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
