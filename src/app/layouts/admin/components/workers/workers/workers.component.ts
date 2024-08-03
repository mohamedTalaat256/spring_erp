import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { WorkerService } from 'src/app/service/worker.service';
import { WorkerDialogComponent } from '../worker-dialog/worker-dialog.component';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {

  constructor(public dialog: MatDialog, private workerService: WorkerService){}

  workers:any[]=[];

  displayedColumns: string[] = ['id', 'name', 'position', 'dailyRate',  'actions'];
  dataSource = new MatTableDataSource<any>(this.workers);

  ngOnInit(): void {
    this.findAll();
  }


  findAll(){
    this.workerService.findAll().subscribe({
      next:(response: AppResponse)=>{
        if(response.ok){
           this.workers= response.data;
           this.dataSource = new MatTableDataSource<any>(this.workers);
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



  openAddWorkerDialog() {

    const data = {
      title: 'اضافة عامل جديد',
      formMode: FormMode.CREATE
    };
    const dialogRef = this.dialog.open(WorkerDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if(result){
        this.workers.push(result);
        this.dataSource = new MatTableDataSource<any>(this.workers);
      }
    });
  }


  openEditWorkerDialog(worker: any){
    const data = {
      title: 'تعديل العامل',
      formMode: FormMode.EDIT,
      worker: worker
    };
    const dialogRef = this.dialog.open(WorkerDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if(result){
        this.showUpdatedItem(result);
        this.dataSource = new MatTableDataSource<any>(this.workers);
      }
    });
  }


  showUpdatedItem(newItem){
    let indexToUpdate = this.workers.findIndex(item => item.id === newItem.id);
    this.workers[indexToUpdate] = newItem;
   this.workers = Object.assign([], this.workers);
  }
}
