import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TCOClass } from '../tcoclass';

@Component({
  selector: 'app-line-chart-demo',
  templateUrl: './line-chart-demo.component.html',
  styleUrls: ['./line-chart-demo.component.css']
})
export class LineChartDemoComponent implements OnInit {
  @Input() fvArray: string[]=[];
  @Input() tcoCalcArrays = {
    month:[], 
    cumHrs:[], 
    ftl:[], 
    other:[], 
    litrite:[], 
    litriteBi:[], 
    h23:[]
};

  constructor() { }
  ngOnChanges(changes: SimpleChanges) {

    //console.log(changes.fvArray.currentValue);
    this.randomize();

 }
  ngOnInit() {
    var labelsArray:Array<any>=[];
    for (var i = 1; i < 61; i++) {
      labelsArray.push(""+i);
      // this.fvArray.push(""+0);
    }
    // this.lineChartData = [{data: this.fvArray, label: "FV"}];
    this.lineChartData = [
      {data: [], label: "FTL"},
      {data: [], label: "Other"},
      {data: [], label: "Litrite"},
      {data: [], label: "Litrite-BI"},
    ];

    //console.log("this.lineChartLabels before: "+ this.lineChartLabels);
    this.lineChartLabels=labelsArray;
    //console.log("this.lineChartLabels after: "+ this.lineChartLabels);
    this.randomize();
  }
  // lineChart
  public lineChartData:Array<any> = [
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = [];
  
  public lineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }    
  };
  public lineChartColors:Array<any> = [
    { // grey
      // backgroundColor: 'lightblue',
      backgroundColor: 'rgba(204,255,229,0.2)',
      borderColor: 'rgba(0,128,255,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      // backgroundColor: 'green',
      backgroundColor: 'rgba(229,255,204,0.2)',
      borderColor: 'rgba(0,102,0,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      // backgroundColor: 'red',
      backgroundColor: 'rgba(204,204,255,0.2)',
      borderColor: 'rgba(102,0,204,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    ,
    { // grey
      // backgroundColor: 'orange',
      backgroundColor: 'rgba(255,255,204,1)',
      borderColor: 'rgba(153,0,0,1)',
      pointBackgroundColor: 'rgba(102,102,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(159,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    //console.log("this.lineChartData before: "+ this.lineChartData[0]);
    var fvArrayLocal:Array<any>=[];
    var fvArrayLocal2:Array<any>=[];
    // for (var i = 0; i < 61; i++) {
    //   fvArrayLocal.push(+this.fvArray[i]*2 +"");
    //   fvArrayLocal2.push(+this.fvArray[i]*3 +"");
    // }
    this.lineChartData = [
      {data: this.tcoCalcArrays.ftl, label: "FTL"},
      {data: this.tcoCalcArrays.litriteBi, label: "Litrite-BI"},
      {data: this.tcoCalcArrays.other, label: "Other"},
      {data: this.tcoCalcArrays.litrite, label: "Litrite"},
      // {data: [], label: "Other"},
      // {data: [], label: "Litrite"},      
    ];
    //console.log("this.lineChartData after: "+ this.lineChartData[0]);
    // var labelsArray: string[]=[];
    // for (var i = 1; i < 12; i++) {
    //   labelsArray.push(""+i);
    // }
    // console.log("this.lineChartLabels before: "+ this.lineChartLabels);
    // this.lineChartLabels=labelsArray;
    // console.log("this.lineChartLabels after: "+ this.lineChartLabels);
    // let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    // for (let i = 0; i < this.lineChartData.length; i++) {
    //   _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    //   for (let j = 0; j < this.lineChartData[i].data.length; j++) {
    //     _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    //   }
    // }
    // this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}