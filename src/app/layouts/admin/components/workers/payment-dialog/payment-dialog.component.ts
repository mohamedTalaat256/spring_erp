import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode } from 'src/app/constants/constants';
import { Observable, map, startWith, take } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { InvUom } from 'src/app/model/invUom';
import { PaymentForm } from '../../../form-controls/payment-form';
import { PaymentService } from 'src/app/service/payment.service';



@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {

  workerFormControl = new FormControl<string | any>('', [Validators.required]);
  projectFormControl = new FormControl<string | any>('', [Validators.required]);

  workers:any[]=[];
  projects:any[]=[];

  filteredWorkers: Observable<any[]>;
  filteredProjects: Observable<any[]>;

  paymentForm: FormGroup;
  title: string;

  constructor(
    private paymentFormControl: PaymentForm,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PaymentDialogComponent>,
    private paymentService: PaymentService,
  ) {


    if (this.data.formMode === FormMode.CREATE) {
      this.paymentForm = this.paymentFormControl.createForm();

    } else {
      this.paymentForm = this.paymentFormControl.setForm(this.data.orderItem);
      this.workerFormControl.setValue( {
        id: this.data.payment.worker.id,
        name: this.data.payment.worker.name
      });

      this.projectFormControl.setValue( {
        id: this.data.payment.project.id,
        name: this.data.payment.project.projectName
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

    this.paymentService
      .save(this.paymentForm.value, this.data.formMode)
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
    this.paymentForm.patchValue({
      worker: event.option.value.id
    }, { onlySelf: true, emitEvent: true });
  }

  selectedProject(event: MatAutocompleteSelectedEvent) {
    this.paymentForm.patchValue({
      project: event.option.value.id
    }, { onlySelf: true, emitEvent: true });
  }



}
