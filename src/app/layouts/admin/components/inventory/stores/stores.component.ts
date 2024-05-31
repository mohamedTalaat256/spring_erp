import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { Store } from 'src/app/model/store';
import { StoreService } from 'src/app/service/store.service';
import { StoreFormDialogComponent } from '../store-form-dialog/store-form-dialog.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent {

  constructor(public dialog: MatDialog, private storeService: StoreService){}

  stores:Store[]=[];

  displayedColumns: string[] = ['id', 'name', 'address', 'phones','active',  'actions'];
  dataSource = new MatTableDataSource<Store>(this.stores);

  ngOnInit(): void {
    this.findAll();
  }


  findAll(){
    this.storeService.findAll().subscribe({
      next:(response: AppResponse)=>{  
        if(response.ok){
           this.stores= response.data;
           this.dataSource = new MatTableDataSource<any>(this.stores);
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



  openAddStoreDialog() { 

    const data = {
      title: 'اضافة مخزن جديد',
      formMode: FormMode.CREATE
    };
    const dialogRef = this.dialog.open(StoreFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    }); 

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {      
      if(result){ 
        this.stores.push(result);
        this.dataSource = new MatTableDataSource<any>(this.stores);
      }
    });
  }


  openEditStoreDialog(store: Store){
    const data = {
      title: 'تعديل المخزن',
      formMode: FormMode.EDIT,
      store: store
    };
    const dialogRef = this.dialog.open(StoreFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    }); 

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {      
      if(result){ 
        this.stores.push(result);
        this.dataSource = new MatTableDataSource<any>(this.stores);
      }
    });
  } 
}
