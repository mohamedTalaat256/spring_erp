import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2'; 
import { AppResponse } from 'src/app/model/app_response.model'; 
import { InvItemCategoryFormDialogComponent } from '../inv-item-category-form-dialog/inv-item-category-form-dialog.component';
import { InvItemCategory } from 'src/app/model/invItemCategory';
import { InvItemCategoryService } from 'src/app/service/invItemCategory.service';

@Component({
  selector: 'app-inv-item-categories',
  templateUrl: './inv-item-categories.component.html',
  styleUrls: ['./inv-item-categories.component.scss']
})
export class InvItemCategoriesComponent implements OnInit {
  constructor(public dialog: MatDialog, private invItemCategoryService: InvItemCategoryService){}

  invItemCategories:InvItemCategory[]=[];

  displayedColumns: string[] = ['id', 'name', 'active','actions'];
  dataSource = new MatTableDataSource<InvItemCategory>(this.invItemCategories);

  ngOnInit(): void {
    this.findAll();
  }


  findAll(){
    this.invItemCategoryService.findAll().subscribe({
      next:(response: AppResponse)=>{  
        if(response.ok){
           this.invItemCategories= response.data;
           this.dataSource = new MatTableDataSource<any>(this.invItemCategories);
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



  openAddInvItemCategoryDialog() { 

    const data = {
      title: 'اضافة فئة جديدة',
      formMode: FormMode.CREATE
    };
    const dialogRef = this.dialog.open(InvItemCategoryFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    }); 

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {      
      if(result){ 
        this.invItemCategories.push(result);
        this.dataSource = new MatTableDataSource<any>(this.invItemCategories);
      }
    });
  }


  openEditInvItemCategoryDialog(invItemCategory: InvItemCategory){
    const data = {
      title: 'تعديل الفئة',
      formMode: FormMode.EDIT,
      invItemCategory: invItemCategory
    };
    const dialogRef = this.dialog.open(InvItemCategoryFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    }); 

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {      
      if(result){ 
        this.showUpdatedItem(result); 
        this.dataSource = new MatTableDataSource<any>(this.invItemCategories);
      }
    });
  }

  showUpdatedItem(newItem){
    let indexToUpdate = this.invItemCategories.findIndex(item => item.id === newItem.id);
    this.invItemCategories[indexToUpdate] = newItem; 
   this.invItemCategories = Object.assign([], this.invItemCategories);
  }
}
