import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith, take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { PaymentService } from 'src/app/service/payment.service';
import { WorkerService } from 'src/app/service/worker.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ExpensDialogComponent } from '../expens-dialog/expens-dialog.component';
import { ExpensesService } from 'src/app/service/expenses.service';
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  searchFormProject: FormGroup;
  constructor(public dialog: MatDialog, private paymentService: PaymentService,
   private fb: FormBuilder,
    private expenseService: ExpensesService,
  ){
    this.searchFormProject = this.fb.group({ project: [null] });
  }

  projectFormControl = new FormControl<string | any>('');

  projects:any[]=[];
  filteredProjects: Observable<any[]>;

  expenses:any[]=[];
  displayedColumns: string[] = ['id', 'project',  'category','expenseDate', 'amount', 'description',  'actions'];
  dataSource = new MatTableDataSource<any>(this.expenses);

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.paymentService.getAllData().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
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


  onSubmitSearch(){
    this.expenseService.findAllByProjectId(this.searchFormProject.value.project).subscribe({
      next:(response: AppResponse)=>{
        if(response.ok){
           this.expenses= response.data;
           this.dataSource = new MatTableDataSource<any>(this.expenses);
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

  openAddExpensesDialog() {

    const data = {
      title: 'اضافة مصروفات جديد',
      formMode: FormMode.CREATE
    };
    const dialogRef = this.dialog.open(ExpensDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });


  }


  openEditExpensesDialog(expens: any){
    const data = {
      title: 'تعديل المصروفات',
      formMode: FormMode.EDIT,
      expens: expens,
    };
    const dialogRef = this.dialog.open(ExpensDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });


  }

  setFilters() {

    this.filteredProjects = this.projectFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.projectName;
        return name ? this._ProjectFilter(name as string) : this.projects.slice();
      }),
    );



  }



  projectDisplayFn(project: any): string {
    return project && project.projectName ? project.projectName : '';
  }


  private _ProjectFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.projects.filter(option => option.projectName.toLowerCase().includes(filterValue));
  }

  selectedProject(event: MatAutocompleteSelectedEvent) {
    this.searchFormProject.patchValue({
      project: event.option.value.id
    }, { onlySelf: true, emitEvent: true });

    console.log(event.option.value);
  }
}
