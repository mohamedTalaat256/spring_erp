import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { InvUomsFormDialogComponent } from '../inv-uoms-form-dialog/inv-uoms-form-dialog.component';
import { InvUomService } from 'src/app/service/invUom.service';
import { AppResponse } from 'src/app/model/app_response.model';
import { InvUom } from 'src/app/model/invUom';

@Component({
  selector: 'app-inv-uoms',
  templateUrl: './inv-uoms.component.html',
  styleUrls: ['./inv-uoms.component.scss']
})
export class InvUomsComponent implements OnInit {

  constructor(public dialog: MatDialog, private invUomService: InvUomService){}

  invUoms:InvUom[]=[];

  displayedColumns: string[] = ['id', 'name', 'active', 'isMaster', 'actions'];
  dataSource = new MatTableDataSource<InvUom>(this.invUoms);

  ngOnInit(): void {
    this.findAllInvUoms();
  }


  findAllInvUoms(){
    this.invUomService.findAll().subscribe({
      next:(response: AppResponse)=>{  
        if(response.ok){
           this.invUoms= response.data;
           this.dataSource = new MatTableDataSource<any>(this.invUoms);
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



  openAddInvUomDialog() {

    const data = {
      title: 'اضافة وحدة جديدة',
      formMode: FormMode.CREATE
    };
    const dialogRef = this.dialog.open(InvUomsFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    }); 

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {      
      if(result){ 
        this.invUoms.push(result);
        this.dataSource = new MatTableDataSource<any>(this.invUoms);
      }
    });
  }


  openEditInvUomDialog(invUom: InvUom){
    const data = {
      title: 'تعديل الوحدة',
      formMode: FormMode.EDIT,
      invUom: invUom
    };
    const dialogRef = this.dialog.open(InvUomsFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    }); 

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {      
      if(result){ 
        this.showUpdatedItem(result);
        this.dataSource = new MatTableDataSource<any>(this.invUoms);
      }
    });
  } 

  showUpdatedItem(newItem){
    let indexToUpdate = this.invUoms.findIndex(item => item.id === newItem.id);
    this.invUoms[indexToUpdate] = newItem; 
   this.invUoms = Object.assign([], this.invUoms);
  }
}
