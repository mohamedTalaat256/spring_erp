import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith, take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { PaymentService } from 'src/app/service/payment.service';
import { WorkerService } from 'src/app/service/worker.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  searchFormWorker: FormGroup;
  searchFormProject: FormGroup;
  constructor(public dialog: MatDialog, private paymentService: PaymentService,
    private workerService: WorkerService, private fb: FormBuilder
  ){
    this.searchFormWorker = fb.group({ worker: [null] });
    this.searchFormProject = fb.group({ project: [null] });
  }

  workerFormControl = new FormControl<string | any>('');
  projectFormControl = new FormControl<string | any>('');

  workers:any[]=[];
  projects:any[]=[];
  filteredWorkers: Observable<any[]>;
  filteredProjects: Observable<any[]>;

  payments:any[]=[];
  displayedColumns: string[] = ['id', 'worker', 'project', 'paymentDate', 'amount', 'description',  'actions'];
  dataSource = new MatTableDataSource<any>(this.payments);

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.paymentService.getAllData().subscribe({
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
    this.paymentService.findAllByWorkerId(this.searchFormWorker.value.worker).subscribe({
      next:(response: AppResponse)=>{
        if(response.ok){
           this.payments= response.data;
           this.dataSource = new MatTableDataSource<any>(this.payments);
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
    this.paymentService.findAllByProjectId(this.searchFormProject.value.project).subscribe({
      next:(response: AppResponse)=>{
        if(response.ok){
           this.payments= response.data;
           this.dataSource = new MatTableDataSource<any>(this.payments);
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

  findAll(){
    this.paymentService.findAll().subscribe({
      next:(response: AppResponse)=>{
        if(response.ok){
           this.payments= response.data.payments;
           this.dataSource = new MatTableDataSource<any>(this.payments);
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
      title: 'اضافة يومية جديد',
      formMode: FormMode.CREATE
    };
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    /* dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if(result){
        this.payments.push(result);
        this.dataSource = new MatTableDataSource<any>(this.payments);
      }
    }); */
  }


  openEditPaymentDialog(payment: any){
    const data = {
      title: 'تعديل اليومية',
      formMode: FormMode.EDIT,
      payment: payment,
    };
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if(result){
        this.showUpdatedItem(result);
        this.dataSource = new MatTableDataSource<any>(this.payments);
      }
    });
  }


  showUpdatedItem(newItem){
    let indexToUpdate = this.payments.findIndex(item => item.id === newItem.id);
    this.payments[indexToUpdate] = newItem;
   this.payments = Object.assign([], this.payments);
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
