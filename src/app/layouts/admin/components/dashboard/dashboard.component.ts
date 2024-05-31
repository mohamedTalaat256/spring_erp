import { Component, ViewChild } from '@angular/core';
import { SALES_CHART } from '../data/charts';
import { MatTableDataSource } from '@angular/material/table';
import { INV_ITEMS } from '../data/data';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})




export class DashboardComponent {  

  @ViewChild("chart") chart: ChartComponent;
  chartOptions: Partial<ChartOptions>;

  lastTransaction=[
    {
      date: '12/01/2024',
      createdBy: 'محمد طلعت',
      type: 'سحب',
      amount: 120,
      account: 'السيد حسن'
    },
    {
      date: '15/01/2024',
      createdBy: 'محمد طلعت',
      type: 'ايداع',
      amount: 400,
      account: 'محمد ابراهيم '
    },
    {
      date: '12/01/2024',
      createdBy: 'محمد طلعت',
      type: 'سحب',
      amount: 3000,
      account: 'احمد مرجان'
    },
    {
      date: '12/01/2024',
      createdBy: 'محمد طلعت',
      type: 'ايداع',
      amount: 720,
      account: 'عادل حسنين'
    },
  ];
  
  lastSalesInvoices=[
    {
      id: 135,
      total: 6544,
      pillType: 'كاش',
      discount: 44,
      clientName: 'محمد السيد'
    },
    {
      id: 136,
      total: 456456,
      pillType: 'اّجل',
      discount: 56,
      clientName: 'محمد السيد'
    },
    {
      id: 137,
      total: 6544,
      pillType: 'كاش',
      discount: 44,
      clientName: 'محمد السيد'
    },
    {
      id: 138,
      total: 7898,
      pillType: 'اّجل',
      discount: 12,
      clientName: 'محمد السيد'
    }
  ];


  lastInvItems= INV_ITEMS;

  displayedColumns: string[] = ['id', 'total', 'pillType', 'discount', 'clientName'];
  dataSource = new MatTableDataSource<any>(this.lastSalesInvoices);

  constructor() {
    this.chartOptions = SALES_CHART;
  }



}
