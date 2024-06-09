import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2'; 
import { AppResponse } from 'src/app/model/app_response.model';
import { SupplierCategoryFormDialogComponent } from '../supplier-category-form-dialog/supplier-category-form-dialog.component';
import { SupplierCategory } from 'src/app/model/supplierCategory';
import { SupplierService } from 'src/app/service/supplier.service';
 
@Component({
  selector: 'app-supplier-categories',
  templateUrl: './supplier-categories.component.html',
  styleUrls: ['./supplier-categories.component.scss']
})
export class SupplierCategoriesComponent implements OnInit {
  constructor(public dialog: MatDialog, private supplierService: SupplierService){}

  supplierCategories:SupplierCategory[]=[];

  displayedColumns: string[] = ['id', 'name', 'active','actions'];
  dataSource = new MatTableDataSource<SupplierCategory>(this.supplierCategories);

  ngOnInit(): void {
    this.findAll();
  }


  findAll(){
    this.supplierService.getSupplierCategories().subscribe({
      next:(response: AppResponse)=>{  
        if(response.ok){
           this.supplierCategories= response.data;
           this.dataSource = new MatTableDataSource<any>(this.supplierCategories);
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



  openAddSupplierCategoryDialog() { 

    const data = {
      title: 'اضافة فئة جديدة',
      formMode: FormMode.CREATE
    };
    const dialogRef = this.dialog.open(SupplierCategoryFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    }); 

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {      
      if(result){ 
        this.supplierCategories.push(result);
        this.dataSource = new MatTableDataSource<any>(this.supplierCategories);
      }
    });
  }


  openEditSupplierCategoryDialog(supplierCategory: SupplierCategory){
    const data = {
      title: 'تعديل الفئة',
      formMode: FormMode.EDIT,
      supplierCategory: supplierCategory
    };
    const dialogRef = this.dialog.open(SupplierCategoryFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    }); 

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {      
      if(result){ 
        
        this.showUpdatedItem(result);
        this.dataSource = new MatTableDataSource<any>(this.supplierCategories);
      }
    });
  }
  showUpdatedItem(newItem){
    let indexToUpdate = this.supplierCategories.findIndex(item => item.id === newItem.id);
    this.supplierCategories[indexToUpdate] = newItem; 
   this.supplierCategories = Object.assign([], this.supplierCategories);
  }
}
