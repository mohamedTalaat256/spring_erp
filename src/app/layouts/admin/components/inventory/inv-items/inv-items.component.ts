import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { InvItemCategory } from 'src/app/model/invItemCategory';
import { InvItemService } from 'src/app/service/invItem.service';
import { InvItem } from 'src/app/model/invItem';
import { InvItemFormDialogComponent } from '../inv-item-form-dialog/inv-item-form-dialog.component';
import { InvUom } from 'src/app/model/invUom';


@Component({
  selector: 'app-inv-items',
  templateUrl: './inv-items.component.html',
  styleUrls: ['./inv-items.component.scss']
})
export class InvItemsComponent implements OnInit {
  constructor(public dialog: MatDialog, private invItemService: InvItemService) { }

  invItems: InvItem[] = [];
  invItemsCategories: InvItemCategory[] = [];
  invUomsParent: InvUom[] = [];
  invUomsChilds: InvUom[] = [];
  createData: any;

  displayedColumns: string[] = [
    'id',
    'name',
    'itemType',
    'invItemcardCategoriesName',
    'UomName',
    'QTI',
    'active', 'actions'];
  dataSource = new MatTableDataSource<InvItem>(this.invItems);

  ngOnInit(): void { 
    this.findAll();
  }
 
  findAll() {
    this.invItemService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.invItems = response.data.invItems;
          this.dataSource = new MatTableDataSource<any>(this.invItems);

          this.createData={
            invUomsChild : response.data.invUomsChilds,
            invUomsParent : response.data.invUomsParent,
            invItemsCategories : response.data.invItemsCategories,
            invItems: response.data.invItems
          };
         
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


  openAddInvItemDialog() {

    const data = {
      title: 'اضافة صنف جديد',
      formMode: FormMode.CREATE,
      createData: this.createData
    };
    const dialogRef = this.dialog.open(InvItemFormDialogComponent, {
      width: '90%',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        this.invItems.push(result);
        this.dataSource = new MatTableDataSource<InvItem>(this.invItems);
      }
    });
  }


  openEditInvItemDialog(invItem: InvItem) {
    const data = {
      title: 'تعديل الصنف',
      formMode: FormMode.EDIT,
      invItem: invItem,
      createData: this.createData
    };
    const dialogRef = this.dialog.open(InvItemFormDialogComponent, {
      width: '90%',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        this.showUpdatedItem(result); 
        this.dataSource = new MatTableDataSource<InvItem>(this.invItems);
      }
    });
  }


  showUpdatedItem(newItem){
    let indexToUpdate = this.invItems.findIndex(item => item.id === newItem.id);
    this.invItems[indexToUpdate] = newItem; 
   this.invItems = Object.assign([], this.invItems);
  }
}
