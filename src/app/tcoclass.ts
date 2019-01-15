export class TCOClass {
    // FTL
    c6    : number; //Initial Luminaire Cost (in ₹)
    c7    : number; //Luminaire Life (L70 for LEDs)
    c8    : number; //Connected Lighting Load
    c9    : number; //Luminaire Efficiency
    c10   : number; //Rs/watt (blended)

    // Other
    d6    : number; //Initial Luminaire Cost (in ₹)
    d7    : number; //Luminaire Life (L70 for LEDs)
    d8    : number; //Connected Lighting Load
    d9    : number; //Luminaire Efficiency
    d10   : number; //Rs/watt (blended)

    // Litrite
    e6    : number; //Initial Luminaire Cost (in ₹)
    e7    : number; //Luminaire Life (L70 for LEDs)
    e8    : number; //Connected Lighting Load
    e9    : number; //Luminaire Efficiency
    e10   : number; //Rs/watt (blended)

    //No of Months to recover higher initial cost of Litrite
    e12   : number; 

    // Usage Details:
    c16   : number; //Cost per unit (KWH)
    c17   : number; //Inflation
    c18   : number; //Usage (per luminaire per day)

    f15   : number; //PAY APPX
    e18   : number; //
    fv    : number;      
    monthArr:string[]=[];
    cumHrsArr:string[]=[];
    ftlArr:string[]=[];
    otherArr:string[]=[];
    litriteArr:string[]=[];
    litriteBiArr:string[]=[];
    h23Arr:string[]=[];
    tcoCalcArrays= {};
    constructor( ) {  }    
    round(num: number, precision: number=0): number {
        if(precision==0) return Math.round(num);
        var rate = 10**precision;
        return Math.round(num * rate) / rate;

    }
    initalizeNum(num1){
        if(isNaN(num1)){
          return 0;
        }else{
          return num1;  
        }
    }    
    futurevalue(rate:number, num:number, pmt:number ): number {
        var calc = ((((1 +(rate))**num -1))/rate) * (pmt) ;
        calc = this.round(calc,2);// Math.round(calc * 100) / 100;
        return this.initalizeNum(calc);
    }
    getRate(rate: number): number{
        return  rate/(12*100);
    }
    calculateAll(): string[]{
        var fvArray=[];
        this.monthArr=[];
        this.cumHrsArr=[];
        this.ftlArr=[];
        this.otherArr=[];
        this.litriteArr=[];
        this.litriteBiArr=[];
        this.h23Arr=[];
        console.log("Month Cum. Hrs. FTL Other Litrite Litrite-BI h23" );

        for (var i = 1; i < 61; i++) {
            this.monthArr.push(""+i);
            fvArray.push(this.calculate(i));
        }
        this.tcoCalcArrays = {
            month:this.monthArr, 
            cumHrs:this.cumHrsArr, 
            ftl:this.ftlArr, 
            other:this.otherArr, 
            litrite:this.litriteArr, 
            litriteBi:this.litriteBiArr, 
            h23:this.h23Arr
        };

        return fvArray;

    }    
    calculate(b23: number=1): string{
        // (((1 +($C$17/12))^K23 -1) /($C$17/12)) * - (-$C$18*30*C$8*$C$16/1000)        
        // var K23: number = 1;
        // var calc = ((((1 +(rate))**K23 -1))/rate) * (this.c18*30*this.c8*this.c16/1000) ;
        // this.fv = calc;
        // calc = this.round(calc);// Math.round(calc * 100) / 100;

        //cumHrs    
 

        var rate = this.getRate(this.c17);//this.c17/(12*100);
        var num = b23;
        var pmt = (this.c18*30*this.c8*this.c16/1000) ;
        var fv = this.futurevalue(rate, num, pmt );

        //Cum. Hrs.
        var c23 = this.initalizeNum(b23*this.c18*30);  
        this.cumHrsArr.push(c23.toFixed(2));

        //FTL
        var pmtFtl = (this.c18*30*this.c8*this.c16/1000) ;
        var fvFtl = this.futurevalue(rate, num, pmtFtl );
        var d23 = this.initalizeNum((Math.floor(c23/this.c7)+1)*this.c6 + fvFtl); 
        this.ftlArr.push(d23.toFixed(2));

        //Other
        var pmtOther = (this.c18*30*this.d8*this.c16/1000) ;
        var fvOther = this.futurevalue(rate, num, pmtOther );
        var e23 = this.initalizeNum((Math.floor(c23/this.d7)+1)*this.d6 + fvOther); 
        this.otherArr.push(e23.toFixed(2));

        //Litrite
        var pmtLitrite = (this.c18*30*this.e8*this.c16/1000) ;
        var fvLitrite = this.futurevalue(rate, num, pmtLitrite );
        var f23 = this.initalizeNum((Math.floor(c23/this.e7)+1)*this.e6 + fvLitrite); 
        this.litriteArr.push(f23.toFixed(2));

       //Litrite-BI
       var h23 = b23*this.e18*30;
       var pmtLitriteBi = (this.e18*30*this.e8*this.c16/1000) ;
       var fvLitriteBi = this.futurevalue(rate, num, pmtLitriteBi );
       var g23 = this.initalizeNum((Math.floor(h23/this.e7)+1)*this.e6 + fvLitriteBi); 
       this.litriteBiArr.push(g23.toFixed(2));
       this.h23Arr.push(h23.toFixed(2));
       
    //    console.log(b23 + " " + c23 + " " + d23 + " " + e23+ " " + f23+ " " + g23   + " " + h23 );

        this.e12=100;
        
        return fv.toFixed(2);
    }

}
