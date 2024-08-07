import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode } from 'src/app/constants/constants';
import { Observable, map, startWith, take } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SalaryForm } from '../../../form-controls/salary-form';
import { SalaryService } from 'src/app/service/salary.service';



@Component({
  selector: 'app-salary-dialog',
  templateUrl: './salary-dialog.component.html',
  styleUrls: ['./salary-dialog.component.scss']
})
export class SalaryDialogComponent implements OnInit {

  workerFormControl = new FormControl<string | any>('', [Validators.required]);
  projectFormControl = new FormControl<string | any>('', [Validators.required]);

  workers:any[]=[];
  projects:any[]=[];

  filteredWorkers: Observable<any[]>;
  filteredProjects: Observable<any[]>;

  salaryForm: FormGroup;
  title: string;

  showPay: boolean = false;

  constructor(
    private salaryFormControl: SalaryForm,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SalaryDialogComponent>,
    private salaryService: SalaryService,
  ) {


    if (this.data.formMode === FormMode.CREATE) {
      this.salaryForm = this.salaryFormControl.createForm();

    } else {
      this.salaryForm = this.salaryFormControl.setForm(this.data.salary);
      this.workerFormControl.setValue( {
        id: this.data.salary.worker.id,
        name: this.data.salary.worker.name
      });

      this.projectFormControl.setValue( {
        id: this.data.salary.project.id,
        projectName: this.data.salary.project.projectName
      });


    }
    this.title = this.data.title;
  }

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


  onSubmit() {

    this.salaryService
      .save(this.salaryForm.value, this.data.formMode)
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
    this.salaryForm.patchValue({
      worker: event.option.value.id
    }, { onlySelf: true, emitEvent: true });
  }

  selectedProject(event: MatAutocompleteSelectedEvent) {
    this.salaryForm.patchValue({
      project: event.option.value.id
    }, { onlySelf: true, emitEvent: true });
  }

  toggleIsPaid(checked:boolean){

    this.showPay = checked;

    this.salaryForm.patchValue({
      isPaid: checked
    });

    if(checked){
      this.workerFormControl.setValidators([Validators.required]);
      this.projectFormControl.setValidators([Validators.required]);

      this.salaryForm.get('worker').addValidators([Validators.required]);
      this.salaryForm.get('project').addValidators([Validators.required]);
      this.salaryForm.get('amount').addValidators([Validators.required]);
      this.salaryForm.get('deduction').addValidators([Validators.required]);
    }else{


      this.workerFormControl.removeValidators([Validators.required]);
      this.projectFormControl.removeValidators([Validators.required]);

      this.salaryForm.get('worker').removeValidators([Validators.required]);
      this.salaryForm.get('project').removeValidators([Validators.required]);
      this.salaryForm.get('amount').removeValidators([Validators.required]);
      this.salaryForm.get('deduction').removeValidators([Validators.required]);
    }
    this.salaryForm.get('deduction').updateValueAndValidity();
    this.salaryForm.get('amount').updateValueAndValidity();
    this.salaryForm.get('project').updateValueAndValidity();
    this.salaryForm.get('worker').updateValueAndValidity();
    this.salaryForm.updateValueAndValidity();

    this.workerFormControl.updateValueAndValidity();
    this.projectFormControl.updateValueAndValidity();
  }
}
