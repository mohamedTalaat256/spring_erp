import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { AccountType } from 'src/app/model/account-type';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-account-types',
  templateUrl: './account-types.component.html',
  styleUrls: ['./account-types.component.scss']
})
export class AccountTypesComponent implements OnInit {

  constructor(public dialog: MatDialog, private accountSerice: AccountService){}

  AccountTypes:AccountType[]=[];

  displayedColumns: string[] = ['id', 'name', 'relatediternalaccounts','active',   ];
  dataSource = new MatTableDataSource<AccountType>(this.AccountTypes);

  ngOnInit(): void {
    this.findAll();
  }


  findAll(){
    this.accountSerice.findAccountTypes().subscribe({
      next:(response: AppResponse)=>{  
        if(response.ok){
           this.AccountTypes= response.data;
           this.dataSource = new MatTableDataSource<AccountType>(this.AccountTypes);
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


 
 
}
