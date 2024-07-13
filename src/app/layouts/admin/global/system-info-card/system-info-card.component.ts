import { Component, OnInit } from '@angular/core';
import { AdminSetting, emptySystemData } from 'src/app/model/adminSetting';

@Component({
  selector: 'app-system-info-card',
  templateUrl: './system-info-card.component.html',
  styleUrls: ['./system-info-card.component.scss']
})
export class SystemInfoCardComponent implements OnInit {


  systemData: AdminSetting =emptySystemData;
  
  ngOnInit(): void {
    this.systemData = JSON.parse(localStorage.getItem('systemData'));
  }


}
