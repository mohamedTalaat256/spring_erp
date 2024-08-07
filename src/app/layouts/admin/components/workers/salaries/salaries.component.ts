import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith, take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { WorkerService } from 'src/app/service/worker.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SalaryDialogComponent } from '../salary-dialog/salary-dialog.component';
import { SalaryService } from 'src/app/service/salary.service';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.scss']
})
export class SalariesComponent  implements OnInit {

  searchFormWorker: FormGroup;
  searchFormProject: FormGroup;
  constructor(public dialog: MatDialog, private salaryService: SalaryService,
    private workerService: WorkerService, private fb: FormBuilder
  ){
    this.searchFormWorker = this.fb.group({ worker: [null] });
    this.searchFormProject = this.fb.group({ project: [null] });
  }

  workerFormControl = new FormControl<string | any>('');
  projectFormControl = new FormControl<string | any>('');

  workers:any[]=[];
  projects:any[]=[];
  filteredWorkers: Observable<any[]>;
  filteredProjects: Observable<any[]>;

  salarys:any[]=[];
  displayedColumns: string[] = ['id', 'worker', 'project',  'amount',  'deduction', 'salaryDate', 'isPaid',  'actions'];
  dataSource = new MatTableDataSource<any>(this.salarys);

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.salaryService.getAllData().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.workers = response.data.workers;
          this.projects = response.data.projects;
          this.setFilters();
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

  onSubmitSearchByWorker(){
    this.salaryService.findAllByWorkerId(this.searchFormWorker.value.worker).subscribe({
      next:(response: AppResponse)=>{
        if(response.ok){
           this.salarys= response.data;
           this.dataSource = new MatTableDataSource<any>(this.salarys);
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
  onSubmitSearchByProject(){
    this.salaryService.findAllByProjectId(this.searchFormProject.value.project).subscribe({
      next:(response: AppResponse)=>{
        if(response.ok){
           this.salarys= response.data;
           this.dataSource = new MatTableDataSource<any>(this.salarys);
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


  openAddPaymentDialog() {

    const data = {
      title: 'اضافة راتب جديد',
      formMode: FormMode.CREATE
    };
    const dialogRef = this.dialog.open(SalaryDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    /* dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if(result){
        this.salarys.push(result);
        this.dataSource = new MatTableDataSource<any>(this.salarys);
      }
    }); */
  }


  openEditPaymentDialog(salary: any){
    const data = {
      title: 'تعديل الراتب',
      formMode: FormMode.EDIT,
      salary: salary,
    };
    const dialogRef = this.dialog.open(SalaryDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if(result){
        this.showUpdatedItem(result);
        this.dataSource = new MatTableDataSource<any>(this.salarys);
      }
    });
  }


  showUpdatedItem(newItem){
    let indexToUpdate = this.salarys.findIndex(item => item.id === newItem.id);
    this.salarys[indexToUpdate] = newItem;
   this.salarys = Object.assign([], this.salarys);
  }


  setFilters() {
    this.filteredWorkers = this.workerFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._workerFilter(name as string) : this.workers.slice();
      }),
    );

    this.filteredProjects = this.projectFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.projectName;
        return name ? this._ProjectFilter(name as string) : this.projects.slice();
      }),
    );



  }

  workerDisplayFn(worker: any): string {
    return worker && worker.name ? worker.name : '';
  }

  projectDisplayFn(project: any): string {
    return project && project.projectName ? project.projectName : '';
  }


  private _workerFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.workers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _ProjectFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.projects.filter(option => option.projectName.toLowerCase().includes(filterValue));
  }

  selectedWorker(event: MatAutocompleteSelectedEvent) {
    this.searchFormWorker.patchValue({
      worker: event.option.value.id
    }, { onlySelf: true, emitEvent: true });
    console.log(event.option.value);

  }

  selectedProject(event: MatAutocompleteSelectedEvent) {
    this.searchFormProject.patchValue({
      project: event.option.value.id
    }, { onlySelf: true, emitEvent: true });

    console.log(event.option.value);
  }
}
