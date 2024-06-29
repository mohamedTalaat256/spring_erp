import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppResponse } from 'src/app/model/app_response.model';
import { ItemsBalanceService } from 'src/app/service/itemsBalance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-items-balance',
  templateUrl: './items-balance.component.html',
  styleUrls: ['./items-balance.component.scss']
})
export class ItemsBalanceComponent {
  constructor( private itemsBalanceService: ItemsBalanceService){}

  createData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  batches: any[]=[];
  displayedColumns: string[] = ['id', 'name',  'batches'];
  dataSource = new MatTableDataSource<any>(this.batches);

  ngOnInit(): void {
    this.findAll();
  }


  findAll(){
    this.itemsBalanceService.findAll().subscribe({
      next:(response: AppResponse)=>{
        if(response.ok){
          this.batches = response.data.batches;
           this.dataSource = new MatTableDataSource<any>(this.batches);
           this.dataSource.paginator = this.paginator;

           console.log(this.batches);
        }
      },
      error:(error: Error)=>{
        Swal.fire({
          icon: "error",
          title: error.message,
          showConfirmButton: true
        });
      }

    });
  }





}
