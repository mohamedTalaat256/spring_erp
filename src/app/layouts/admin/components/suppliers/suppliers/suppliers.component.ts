import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
  import { AccountService } from 'src/app/service/account.service';
 import { MatPaginator } from '@angular/material/paginator';
import { SupplierFormDialogComponent } from '../supplier-form-dialog/supplier-form-dialog.component';
import { Supplier } from 'src/app/model/supplier';
import { SupplierCategory } from 'src/app/model/supplierCategory';
import { SupplierService } from 'src/app/service/supplier.service';
 

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  suppliers: Supplier[] = [];
  supplierCategories: SupplierCategory[] = [];
  createData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = [
    'name',
    'accountNumber',
    'currentBalance',
    'supplierCategory',
    'address',
    'phones',
    'notes',
    'active',
    'actions'];
  dataSource = new MatTableDataSource<Supplier>(this.suppliers);

  constructor(public dialog: MatDialog, private supplierService: SupplierService) { }



  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.supplierService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.suppliers = response.data.suppliers;
          this.supplierCategories = response.data.supplierCategories;
          
          this.dataSource = new MatTableDataSource<Supplier>(this.suppliers);
          this.dataSource.paginator = this.paginator;
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


  openAddSupplierDialog() {

    const data = {
      title: 'اضافة مورد جديد',
      formMode: FormMode.CREATE,
      supplierCategories: this.supplierCategories
    };
    const dialogRef = this.dialog.open(SupplierFormDialogComponent, {
      width: '80%',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        this.suppliers.push(result);
        this.dataSource = new MatTableDataSource<Supplier>(this.suppliers);
      }
    });
  }


  openEditSupplierDialog(supplier: Supplier) {
    const data = {
      title: 'تعديل مورد',
      formMode: FormMode.EDIT,
      supplier: supplier,
      supplierCategories: this.supplierCategories


    };
    const dialogRef = this.dialog.open(SupplierFormDialogComponent, {
      width: '80%',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {

        this.showUpdatedItem(result);
        this.dataSource = new MatTableDataSource<Supplier>(this.suppliers);
      }
    });
  }

  showUpdatedItem(newItem){
    let indexToUpdate = this.suppliers.findIndex(item => item.id === newItem.id);
    this.suppliers[indexToUpdate] = newItem; 
   this.suppliers = Object.assign([], this.suppliers);
  }
}
