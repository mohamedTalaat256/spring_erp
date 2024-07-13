import { Component, OnInit } from '@angular/core';
import { AdminSettingForm } from '../../form-controls/adminSetting-form';
import { FormGroup } from '@angular/forms';
import { Account } from 'src/app/model/accounty';
import { AdminSettingService } from 'src/app/service/adminSetting.service';
import { take } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  adminSettingForm: FormGroup;

  parentAccounts: Account[] = [];
  constructor(private adminSettingFormControl: AdminSettingForm,
    private adminSettingService: AdminSettingService
  ) {

    this.adminSettingForm = this.adminSettingFormControl.setForm({
      id: null,
      systemName: null,
      address: null,
      phone: null,
      photo: null,
      customerParentAccountNumber:1,
      suppliersParentAccountNumber:1,
      notes: null
    });

  }

  ngOnInit(): void {
    this.getAdminSettingData();
  }

  getAdminSettingData() {
    this.adminSettingService.getData().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.adminSettingForm = this.adminSettingFormControl.setForm(response.data.adminSettings);
          this.parentAccounts = response.data.parentAccounts;
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
    this.adminSettingService.save(this.adminSettingForm.value).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: response.message,
            showConfirmButton: true
          });

          this.adminSettingForm = this.adminSettingFormControl.setForm(response.data);

          localStorage.setItem('systemData', JSON.stringify(response.data));
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
}
