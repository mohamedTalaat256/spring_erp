import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode } from 'src/app/constants/constants';
import { Observable, map, startWith, take } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ExpensForm } from '../../../form-controls/expens-form';
import { ExpensesService } from 'src/app/service/expenses.service';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-expens-dialog',
  templateUrl: './expens-dialog.component.html',
  styleUrls: ['./expens-dialog.component.scss']
})
export class ExpensDialogComponent  implements OnInit {

  projectFormControl = new FormControl<string | any>('', [Validators.required]);

  projects:any[]=[];

  filteredProjects: Observable<any[]>;

  expenseForm: FormGroup;
  title: string;

  constructor(
    private expenseFormControl: ExpensForm,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ExpensDialogComponent>,
    private paymentService: PaymentService,
    private expenseService: ExpensesService,
  ) {


    if (this.data.formMode === FormMode.CREATE) {
      this.expenseForm = this.expenseFormControl.createForm();

    } else {
      this.expenseForm = this.expenseFormControl.setForm(this.data.expens);

      this.projectFormControl.setValue( {
        id: this.data.expens.project.id,
        projectName: this.data.expens.project.projectName
      });


    }
    this.title = this.data.title;
  }

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


  onSubmit() {

    this.expenseService
      .save(this.expenseForm.value, this.data.formMode)
      .pipe(take(1))
      .subscribe({
        next: (response: AppResponse) => {
          if(response.ok){

            Swal.fire({
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
          this.dialogRef.close(response.data);
          }
        },
        error: (error: AppResponse) => {
          Swal.fire({
            icon: 'error',
            title: error.message,
            showConfirmButton: false,
          });
        },
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
    this.expenseForm.patchValue({
      project: event.option.value.id
    }, { onlySelf: true, emitEvent: true });
  }



}
