// import { Component } from '@angular/core';
import { FormGroup, FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TCOClass } from './tcoclass';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Location } from '@angular/common';
// import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Component, Input, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LED PayBack Calculator';
  tcoFields: TCOClass;
  formdata;
  page: string ="ftl" ;
  fvArray: string[]=[];
  innerHeight: number;
  innerWidth: number;
  largeScreen: boolean=false;
  tcoCalcArrays= {};
  fakeValue: boolean = true;
  @ViewChild('refId') textDiv:ElementRef;
  ngAfterViewInit() {
      // console.log("Width..." + this.textDiv.nativeElement.offsetWidth);
  }

  constructor() { 
    this.innerHeight = (window.screen.height);
    this.innerWidth = (window.screen.width);
    this.setLargeScreen();
  }
  valuechange(event) {
    let c9 =this.initalizeNum(this.formdata.controls.c9.value);
    let d9=this.initalizeNum(this.formdata.controls.d9.value);
    let e9=this.initalizeNum(this.formdata.controls.e9.value);
    let c8=this.initalizeNum(this.formdata.controls.c8.value);
    
    this.formdata.controls['d8'].setValue(Math.round((c8*c9)/d9));
    this.formdata.controls['e8'].setValue(Math.round((c8*c9)/e9));

    this.formdata.controls['c6'].setValue(this.initalizeNum(this.formdata.controls.c8.value) * this.initalizeNum(this.formdata.controls.c10.value));
    this.formdata.controls['d6'].setValue(this.initalizeNum(this.formdata.controls.d8.value) * this.initalizeNum(this.formdata.controls.d10.value));
    this.formdata.controls['e6'].setValue(this.initalizeNum(this.formdata.controls.e8.value) * this.initalizeNum(this.formdata.controls.e10.value));
  
  }

  onResize(event) {
    this.innerHeight =   event.target.innerHeight
    this.innerWidth =   event.target.innerWidth;
    this.setLargeScreen();
    // console.log("this.largeScreen "+ this.largeScreen);
  }
  setLargeScreen(){
    if(this.largeScreen && this.page=="result"){
      console.log("Width..." + this.textDiv.nativeElement.offsetWidth);
      if(this.textDiv.nativeElement.offsetWidth <400){
        this.innerWidth =this.textDiv.nativeElement.offsetWidth;
        this.largeScreen=false;
        return;
      }
    }
    if (this.innerWidth>600){
      this.largeScreen = true;
    }else{
      this.largeScreen = false;
    }
  }

  ngOnInit() {
    this.fvArray=[];

    this.tcoFields = new TCOClass();
    if(this.fakeValue){
        this.formdata = new FormGroup({
          // FTL
          c6    : new FormControl(25000), //Initial Luminaire Cost (in ?)
          c7    : new FormControl(12000), //Luminaire Life (L70 for LEDs)
          c8    : new FormControl(2500), //Connected Lighting Load
          c9    : new FormControl(50), //Luminaire Efficiency
          c10   : new FormControl(10), //Rs/watt (blended)

          // Other
          d6    : new FormControl(135000), //Initial Luminaire Cost (in ?)
          d7    : new FormControl(70000), //Luminaire Life (L70 for LEDs)
          d8    : new FormControl(1800), //Connected Lighting Load
          d9    : new FormControl(100), //Luminaire Efficiency
          d10   : new FormControl(75), //Rs/watt (blended)

          // Litrite
          e6    : new FormControl(162000), //Initial Luminaire Cost (in ?)
          e7    : new FormControl(90000), //Luminaire Life (L70 for LEDs)
          e8    : new FormControl(1800), //Connected Lighting Load
          e9    : new FormControl(120), //Luminaire Efficiency
          e10   : new FormControl(90), //Rs/watt (blended)

          //No of Months to recover higher initial cost of Litrite
          e12   : new FormControl(1), 

          // Usage Details:
          c16   : new FormControl(8.5), //Cost per unit (KWH)
          c17   : new FormControl(2), //Inflation
          c18   : new FormControl(7.2), //Usage (per luminaire per day)

          f15   : new FormControl( 27000), //PAY APPX
          e18   : new FormControl(3.6)       
      });        
    }else{
      this.formdata = new FormGroup({
        // FTL
        c6    : new FormControl(), //Initial Luminaire Cost (in ?)
        c7    : new FormControl(), //Luminaire Life (L70 for LEDs)
        c8    : new FormControl(), //Connected Lighting Load
        c9    : new FormControl(50), //Luminaire Efficiency
        c10   : new FormControl(), //Rs/watt (blended)

        // Other
        d6    : new FormControl(), //Initial Luminaire Cost (in ?)
        d7    : new FormControl(), //Luminaire Life (L70 for LEDs)
        d8    : new FormControl(), //Connected Lighting Load
        d9    : new FormControl(100), //Luminaire Efficiency
        d10   : new FormControl(), //Rs/watt (blended)

        // Litrite
        e6    : new FormControl(), //Initial Luminaire Cost (in ?)
        e7    : new FormControl(), //Luminaire Life (L70 for LEDs)
        e8    : new FormControl(), //Connected Lighting Load
        e9    : new FormControl(120), //Luminaire Efficiency
        e10   : new FormControl(), //Rs/watt (blended)

        //No of Months to recover higher initial cost of Litrite
        e12   : new FormControl(1), 

        // Usage Details:
        c16   : new FormControl(), //Cost per unit (KWH)
        c17   : new FormControl(), //Inflation
        c18   : new FormControl(), //Usage (per luminaire per day)

        f15   : new FormControl( 27000), //PAY APPX
        e18   : new FormControl() 
    });      
    }
    this.valuechange(null);
   
 }  
 initalizeNum(num1){
  if(isNaN(num1)){
    return 0;
  }else{
    return num1;  
  }
 }
 onClickSubmit(data) {
    this.fvArray=[];

    this.page="result";
    // debugger;
    // FTL		
    this.tcoFields.c6  = this.initalizeNum( data.c6);
    this.tcoFields.c7  = this.initalizeNum( data.c7);
    this.tcoFields.c8  = this.initalizeNum( data.c8);
    this.tcoFields.c9  = this.initalizeNum( data.c9);
    this.tcoFields.c10 = this.initalizeNum( data.c10);
            
    // Other	
    this.tcoFields.d6  = this.initalizeNum( data.d6);
    this.tcoFields.d7  = this.initalizeNum( data.d7);
    this.tcoFields.d8  = this.initalizeNum( data.d8);
    this.tcoFields.d9  = this.initalizeNum( data.d9);
    this.tcoFields.d10 = this.initalizeNum( data.d10);
            
    // Litrite 
    this.tcoFields.e6  = this.initalizeNum( data.e6);
    this.tcoFields.e7  = this.initalizeNum( data.e7);
    this.tcoFields.e8  = this.initalizeNum( data.e8);
    this.tcoFields.e9  = this.initalizeNum( data.e9);
    this.tcoFields.e10 = this.initalizeNum( data.e10);
          
    this.tcoFields.e12 = this.initalizeNum( data.e12);
            
    // Usage Details:		 
    this.tcoFields.c16 = this.initalizeNum( data.c16);
    this.tcoFields.c17 = this.initalizeNum( data.c17);
    this.tcoFields.c18 = this.initalizeNum( data.c18);
            
    this.tcoFields.f15 = this.initalizeNum( data.f15);
    this.tcoFields.e18 = this.initalizeNum( data.e18);
   

    this.fvArray = this.tcoFields.calculateAll();
    this.tcoCalcArrays = this.tcoFields.tcoCalcArrays;

 }
 setPage(page: string){
   this.page = page;
 }

}
