import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AppResponse } from 'src/app/model/app_response.model';
import { emptySalesOrder } from 'src/app/model/sales-order.model';
import { SalesService } from 'src/app/service/sale.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pring-sales',
  templateUrl: './print-sales.component.html',
  styleUrls: ['./print-sales.component.scss']
})
export class PrintSalesComponent {

  salesOrder: any = emptySalesOrder;
  displayedColumns: string[] = ['id', 'store', 'orderItem', 'unit', 'price', 'amount', 'total'];


  salesInvoiceDetails: any[] = [];
  dataSource = new MatTableDataSource<any>(this.salesInvoiceDetails);
  id: number;


  constructor(
    private salesService: SalesService,
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
    this.salesService.findById(id).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.salesInvoiceDetails = response.data.salesInvoiceDetails;
          this.dataSource = new MatTableDataSource<any>(this.salesInvoiceDetails);

          this.salesOrder = response.data;
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
