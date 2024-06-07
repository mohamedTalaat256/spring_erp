import { Component, OnInit } from '@angular/core';
import { AdminSettingForm } from '../../form-controls/adminSetting-form';
import { FormGroup } from '@angular/forms';
import { Account } from 'src/app/model/accounty';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  adminSettingForm: FormGroup;

  parentAccounts: Account[] = [];
  constructor(private adminSettingFormControl: AdminSettingForm) {

    this.adminSettingForm = this.adminSettingFormControl.setForm({
      id: 1,
      systemName: 'string',
      address: 'string',
      phone: 'string',
      photo: 'string',
      customerParentAccountNumber: {
        id: 1,
        name: 'string',
        accountType: {
          id: 1,
          name: '',
          active: true,
          relatediternalaccounts: false
        },
        isParent: false,
        parentAccount_number: 0,
        startBalanceStatus: 0,
        startBalance: 0,
        currentBalance: 0,
        notes: 'string',
        active: true
      },
      employeesParentAccountNumber: {
        id: 1,
        name: 'string',
        accountType: {
          id: 1,
          name: '',
          active: true,
          relatediternalaccounts: false
        },
        isParent: false,
        parentAccount_number: 0,
        startBalanceStatus: 0,
        startBalance: 0,
        currentBalance: 0,
        notes: 'string',
        active: true
      },
      suppliersParentAccountNumber: {
        id: 1,
        name: 'string',
        accountType: {
          id: 1,
          name: '',
          active: true,
          relatediternalaccounts: false
        },
        isParent: false,
        parentAccount_number: 0,
        startBalanceStatus: 0,
        startBalance: 0,
        currentBalance: 0,
        notes: 'string',
        active: true
      },
      notes: 'string'
    });

  }

  ngOnInit(): void {
    this.getAdminSettingData();
  }

  getAdminSettingData() {

  }


  onSubmit() {

  }
}
