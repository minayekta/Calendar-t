let data=[
    "شنبه","یکشنبه","دوشنبه","سشنبه","چهارشنبه","پنجشنبه","جمعه"
  ];
export  function createToday(dayObject){
  if(!dayObject){
    let today = new Date();  
    let irToday = today.toLocaleDateString("fa-IR");
    let d = irToday.split("/");
    let day=makeDate(d[2]);
    let month=makeDate(d[1]);
    let year=makeDate(d[0]);
    let wday=makeWday(today.getDay());
    let firstDay = findS(new MyDay(year,month,day,wday));
    return makeArray(firstDay);
  }else{
        return makeArray(dayObject);
  }  
  }
  function today(){
    let today = new Date();  
    let irToday = today.toLocaleDateString("fa-IR");
    let d = irToday.split("/");
    let day=makeDate(d[2]);
    let month=makeDate(d[1]);
    let year=makeDate(d[0]);
    return [year,month,day];
  }
  export const emrooz = today();
  console.log(emrooz,"emrooz");
  function makeDate(s){
    let year=[];
    let data={"۱":1,"۲":2,"۳":3,"۴":4,"۵":5,"۶":6,"۷":7,"۸":8,"۹":9,"۰":0}
    s.split("").map((number,index)=>{
      year[index] = data[number]; 
    })
        return Number(year.join(""));
    
  }
  function makeWday(w){
    let arr=["یکشنبه","دوشنبه","سشنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"];
    return arr[w];
  }
  export function createPreMonth(day){
    let ld=day.dec();
    let firstDay=findS(ld);
      return makeArray(firstDay);

  }
  class Year{
    constructor(year){
        this.year = year;
    }   
  inc(){
   this.year = this.year + 1;
    }
  clone(){
    let y=new Year(this.year);
    return y;
  }
  dec(){
    this.year = this.year - 1;
  }
  }
  class Month{
    constructor(month){
        this.month = month;
        this.next = null; 
    }  
  setNext(n){
      this.next = n;
  }
  inc(){
      if(this.month  + 1 <=12){
        this.month = this.month + 1;
      } else {
          if(this.next){
              this.next.inc();
              this.month = 1;
          } else{
            throw new Error("next is not set"); 
          }
      }
  }
  dec(){
    if(this.month  -1 > 0){
        this.month = this.month - 1;
      } else {
          if(this.next){
              this.next.dec();
              this.month = 12;
          } else{
            throw new Error("next is not set"); 
          }
      }
  }
  clone(){
      let m=new Month(this.month);
      return m;
  }  
  }
  class Day{
    constructor(day){
        this.day = day;
        this.next = null;
        this.bound=null;
    }
    setNext(n){
        this.next=n;
    }
    inc(){
        if(this.day + 1 <= this.bound){
            this.day=this.day + 1;
       }else{
           if(this.next){
            this.next.inc();
            this.day=1;
           }else{
               throw new Error("next is not set")
           }
           
       }
    }
    dec(){
        if(this.day - 1 > 0){
            this.day=this.day - 1;
       }else{
           if(this.next){
            this.next.dec();
            this.day=this.preBound;
           }else{
               throw new Error("next is not set")
           }
           
       }
    }
    clone(){
        let d=new Day(this.day);
        return d;
    }
  }
  class wDay{
    constructor(wday){
        this.wday = wday;
    }
    inc(){
       let index = data.indexOf(this.wday);
       let indexR = (index + 1) % 7;
       this.wday = data[indexR];
    }
    dec(){
      let index = data.indexOf(this.wday);
      if(index  > 0 ){
       let indexR = (index - 1);
       this.wday = data[indexR];
      }
      else{
           let indexR=6;
           this.wday=data[indexR];
       }
    }
    clone(){
        let w=new wDay(this.wday);
        return w;
    }
  }
  class MyDay {
    constructor(y,m,d,w){
        this.year = new Year(y);
        this.month = new Month(m);
        this.day = new Day(d);
        this.wday= new wDay(w);
        this.month.setNext(this.year);
        this.day.setNext(this.month);
        this.day.bound=this.assignBound(this.year.year,this.month.month);
        this.day.preBound=this.preData();
    }
    preData(){
        let y=this.year.year;
        let m=this.month.month;
        if( m > 1){
            return this.assignBound(y,m-1);
        }else{
            y=y-1;
            m=12;
            return this.assignBound(y,m);
    }
}
    assignBound(y,m){
        let lm;
        let a= [1,5,9,13,17,22,26,30];
        if (a.indexOf(y % 33) !== -1){
            lm = 30;
        }else{
            lm =29;
        }
        if(m<=6){
            return 31;
        }else if(m <=11){
            return 30;
        }else{
            return lm;
        }
      }
    inc(){ 
       let instant = this.clone();
       let obj= new MyDay(instant.year,instant.month,instant.day,instant.wday);
        obj.day.inc();
        obj.wday.inc();
        return obj;
    }
    dec(){
      let instant = this.clone();
      let obj= new MyDay(instant.year,instant.month,instant.day,instant.wday);
      obj.day.dec();
      obj.wday.dec();
        return obj;
    }
  
    clone(){
     let ret = {
        year :this.year.clone().year,
        month : this.month.clone().month,
        day : this.day.clone().day,
        wday : this.wday.clone().wday,
     };
        return ret;
    }
  }
    function findS(dayObject){
      let day =dayObject.day.day;
      let wday=dayObject.wday.wday;
      let index=data.indexOf(wday);
      day = (day % 7);
      if(day === 0){
          wday=data[(index + 1) % 7];
          return new MyDay(dayObject.year.year,dayObject.month.month,1,wday);
      }else if(day === 1){
          return new MyDay(dayObject.year.year,dayObject.month.month,1,wday);
      }
      else if(day > 1){
         if(index - (day - 1) >= 0){
             wday=data[index - (day - 1)];
              return new MyDay(dayObject.year.year,dayObject.month.month,1,wday);
         }else if(index - (day - 1) < 0){
              wday = data[index - (day - 1) + 7]
              return new MyDay(dayObject.year.year,dayObject.month.month,1,wday);
         }
      }
  }
 
  export function makeArray(d){
    let arr=[null,null,null,null,null,null,null];
    let wday=d.wday.wday;
    let bound=d.inc().day.bound;
    let rows;
    let index;
    if(wday === "جمعه"){
      index =6;
  }else if(wday === "شنبه"){
      index=0;}
  else if(wday === "یکشنبه"){
      index=1;}
  else if(wday === "دوشنبه"){
      index=2;}
  else if(wday === "سشنبه"){
      index=3;}
  else if(wday === "چهارشنبه"){
      index=4;}
  else if(wday === "پنجشنبه"){
  index=5;}
  rows= Math.ceil((bound -(7-index))/7) + 1;
  let array=Array(rows);
  arr[index]=d;
  for(let i =index +1;i<arr.length ;i++){
    arr[i]=arr[i -1].inc();
  }
    let high=7;
    array[0]=arr;
    for(let i =1;i<array.length; i++){
      let r=[];
      r[0]=array[i-1][6].inc();
      if(i===array.length-1){
        high= bound - ((rows-2) * 7 + (7-index));
      }
      for(let i=1;i<high;i++){
        r[i]=r[i-1].inc();
      }
      if(high<8){
        for(let i=high;i<7;i++){
          r[i]=null;
        }
      }
      array[i]=r
    }
    return array;
  }
  