import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { ProjectService } from 'src/app/service/project.service';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(public dialog: MatDialog, private projectService: ProjectService){}

  projects:any[]=[];

  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate',  'actions'];
  dataSource = new MatTableDataSource<any>(this.projects);

  ngOnInit(): void {
    this.findAll();
  }


  findAll(){
    this.projectService.findAll().subscribe({
      next:(response: AppResponse)=>{
        if(response.ok){
           this.projects= response.data;
           this.dataSource = new MatTableDataSource<any>(this.projects);
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
      title: 'اضافة مشروع جديد',
      formMode: FormMode.CREATE
    };
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if(result){
        this.projects.push(result);
        this.dataSource = new MatTableDataSource<any>(this.projects);
      }
    });
  }


  openEditWorkerDialog(worker: any){
    const data = {
      title: 'تعديل المشروع',
      formMode: FormMode.EDIT,
      worker: worker
    };
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if(result){
        this.showUpdatedItem(result);
        this.dataSource = new MatTableDataSource<any>(this.projects);
      }
    });
  }


  showUpdatedItem(newItem){
    let indexToUpdate = this.projects.findIndex(item => item.id === newItem.id);
    this.projects[indexToUpdate] = newItem;
   this.projects = Object.assign([], this.projects);
  }
}
