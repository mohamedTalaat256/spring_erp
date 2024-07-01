import { Component, OnInit, ViewChild } from '@angular/core';
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
import { DashboardService } from 'src/app/service/dashboard.service';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';


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




export class DashboardComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  chartOptions: Partial<ChartOptions>;


  last5Transaction: any[]= [];

  last5Sales: any[]= [];
  customerCount: number =0;
  supplierCount: number =0;


  lastInvItems= INV_ITEMS;

  charData: number[] =[];
  months: string[] =[];

  displayedColumns: string[] = [
    'autoSerial',
    'supplierName',
    'orderDate',
    'pillType',
    'totalCost',
    'approveStatus'
  ];
  dataSource = new MatTableDataSource<any>(this.last5Sales);

  constructor(private dashboardService: DashboardService) {
    this.chartOptions =
    {
      series: [
        {
          name: "فاتورة",
          data: this.charData
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -30,
        style: {
          fontSize: "14px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: this.months,
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false
        }
      },
      title: {
        text: "حالة المبيعات خلال 12 شهر",
        floating: false,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.dashboardService.getData().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.last5Transaction = response.data.last5Transaction;
          this.last5Sales = response.data.last5Sales;
          this.customerCount = response.data.customerCount;
          this.supplierCount = response.data.supplierCount;

          response.data.chartData.forEach(element => {
            this.charData.push(element.count);
          });

          response.data.chartData.forEach(element => {
            this.months.push(element.month);
          });

          this.dataSource = new MatTableDataSource<any>(this.last5Sales);
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
