import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import {createToday,makeArray,createPreMonth,emrooz} from "./calender";
import {
  Card,
CardBody,
InputGroup,
Input,
InputGroupAddon,
InputGroupText
} from "reactstrap"

const today = emrooz;
let dataBase = createToday(null);
class Head extends React.Component{
constructor(props){
  super(props);
  this.state={
    onClickMonth: false
  };
  this.convertMonth=this.convertMonth.bind(this);
  // this.OnMonthClick = this.OnMonthClick.bind(this);
}
convertMonth(number){
  let data=["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
  return data[number -1];
}
// OnMonthClick(){
//   this.setState({
//     onClickMonth: true
//   });
// console.log("THIS A TEST CLICKMONTH:", this.state.onClickMonth)
// }

render(){
  return(
    <div className="header">
          
        <div className="left HeaderDates next" >
            {/* <span className="next "  > &#8592;</span>             */}
            <i className="glyphicon glyphicon-arrow-left icon"  onClick={this.props.handleNext} ></i>
          
            <span className="month"> ماه بعد </span>
        </div>
        <div className="dates">
    

        <a class="dropdown" href="#"  data-toggle="dropdown"   id= "123" aria-expanded="false">
          <i className= "glyphicon glyphicon-chevron-down icon2"></i> 
        </a>
        {/* <div class=" dropdown-menu drop-menu2 " >
         
        <InputGroup class="col-md-8 drop-menu  drop-down ">
        <Input class="" type="text"></Input>
        <span class="btn input-group-addon addon-year" onClick=""> برو به سال</span>
        </InputGroup> 
       
        </div>  */}
        <InputYear/>
        
         
        <span className= "jalaliYear"> {this.props.data.year.year}</span> <span className="jalaliMonth">{this.convertMonth(this.props.data.month.month)}</span>
        <a class="dropdown-togglebtn" href="#"  data-toggle="dropdown"  aria-expanded="false">
          <i className= "glyphicon glyphicon-chevron-down icon2"></i>
        </a>
        <div class="container dropdown-menu drop-menu ">
    

    <a class= "col-md-4  col-lg-4 dropdown-item drop-month " href="#"> فروردین </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> اردیبهشت </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> خرداد </a> 
    <a class=" col-md-4  dropdown-item drop-month" href="#"> تیر </a> 
    <a class=" col-md-4  dropdown-item drop-month" href="#"> مرداد </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> شهریور </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> مهر </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> آبان </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> آذر </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> دی </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> بهمن </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> اسفند </a>
    </div>
        {/* <MonthClick  OnMonthClick={this.OnMonthClick}/> */}
        </div> 
        <div className="right HeaderDates before"  >
          <span className="month"> ماه قبل </span>
          <i className="glyphicon glyphicon-arrow-right icon"  onClick={this.props.handlePrev}></i>
         
          {/* <span className="before "  ></span>     */}
      
        </div>
        
       
    </div>
    )
  
}
}


function HeaderRow(props){
    return(
      // <div className=" container  dayHeader ">
        // <Card>
        //     <CardBody>
              <div className="dayHeader">
              <div  className="day">ش</div>
              <div className="day">ی</div>
              <div className="day">د</div>
              <div className="day">س</div>
              <div className="day">چ</div>
              <div className="day">پ</div>
              <div className="day">ج</div>
              </div>
        //     </CardBody>
        // </Card>
        
      // </div>

    )
  }







class Row extends React.Component{
  constructor(props){
    super(props);
   
  }

  


  reverse(array){
    let arr=[];
    for(let i=0;i<array.length;i++){
      arr.unshift(array[i]);
    }
    return arr;
  }
  render(){
    let ar = this.props.dateRow;
    let list = ar.map((element,index)=>{
      return(<div className="cell"> <Cell  date={element} today={this.props.today}  key={index.toString()} />  </div>)
    })
   return(
     <div className="row">
       {list}
     </div>
   )
}
}

function isSelected(d){
  if(d===15 ||d=== 16 || d===17 || d===18){
    return "cell selected";
  } else {
    return "cell";
  }
}

function Cell(props){
  let today = props.today;
  let sel = "cell"; 
  let myStyle={};
  if(!props.date){
      return (<div className="cell translate"> ... </div>);
  }else{
      sel = isSelected(props.date.day.day);
      if(today[0] === props.date.year.year && today[1] === props.date.month.month && today[2] === props.date.day.day && props.date.wday.wday === "جمعه"){
          myStyle={
              color : "red",
              // backgroundColor: "DodgerBlue"
          }
      }else if(today[0] === props.date.year.year && today[1] === props.date.month.month && today[2] === props.date.day.day && props.date.wday.wday !== "جمعه"){
          myStyle={
            // backgroundColor: "DodgerBlue",
            // border: "2px solid #d04514" ,
            // borderRadius:"3px",
            padding: "2px",
            textAlign: "center",
            color: "#ff5722"
          }
      }else if(today[2] !== props.date.day.day && props.date.wday.wday === "جمعه"){
          myStyle={
              color : "red",
          }
      }
      else{
          myStyle={
              color : "black"
          }
        
         
      } 
  }
  return (<div className={sel} style={myStyle}>
            <div className="jalali">
              {props.date.day.day}  
            </div>
          </div>);
  }   






class Calender extends React.Component{
  constructor(props){
    super(props);
    this.state={
      scope : this.props.cal,
      des: null,
      today : today,
      // click : false,
    }
    console.log("SCOPE",this.props.cal);
  this.next=this.next.bind(this);
  this.prev=this.prev.bind(this);
  // this.onClick = this.onClick.bind(this);
  }
  componentDidMount(){
    /*let f=fetch();
    f.then((response)=>{
      if(response.ok){
        return response.json();
      }else{
        throw Error(response.status);
      }
    }).then((json)=>{
      this.setState({
        des : json.parse()
      })
    })
    .catch((error)=>{
        console.log(error);
    })*/
  }
  next(){
    console.log("NEXT");
    let lRow=this.state.scope[this.state.scope.length-1];
    let nextFirstDay;
    if(lRow.indexOf(null)=== -1){
     nextFirstDay =lRow[lRow.length -1].inc();
    }else{
      let index=lRow.indexOf(null) -1;
       nextFirstDay=lRow[index].inc();
    }
    this.setState({
      scope : makeArray(nextFirstDay),
    })
  }
  prev(){
    let fRow=this.state.scope[0];
    let day;
    if(fRow.indexOf(null)=== -1){
        day = fRow[0];
    }else{
       let index=fRow.lastIndexOf(null) +1;
       day=fRow[index];
    }
      this.setState({
        scope : createPreMonth(day),
      })
    
  }


    onClick(){
      
    }

  render(){
    let list=this.state.scope.map((arr,index)=>{
      return(<Row dateRow={arr} today={this.state.today} key={this.state.scope.indexOf(arr).toString()} />);
    })
    return(
      <div className="container col-md-8  Claneder border border-secondary">
        <Card>
           <CardBody>
        <Head  data={this.state.scope[1][0]} handleNext={this.next} handlePrev={this.prev} />
        <HeaderRow/>
        {list}
          </CardBody>
        </Card>
      </div>
    )
  }
}
ReactDOM.render(<Calender cal={dataBase}/>,document.getElementById("root"));

// var arabicNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
// $('.translate').text(function(i, v) {
// 	var chars = v.split('');
//     for (var i = 0; i < chars.length; i++) {
//     	if (/\d/.test(chars[i])) {
//         	chars[i] = arabicNumbers[chars[i]];
//         }
//     }
//     return chars.join('');
// })



class MonthClick extends React.Component{
  constructor(props){
    super(props);
    // this.state={
    //   monthClick : ""
    // }
    // this.OnMonthClick = this.OnMonthClick.bind(this);
  }


  // OnMonthClick(){
  //   this.setState ({
  //     monthClick: this.props.scope
  //   });
  // }
  render(){
    return(
 <div>
      <a class="dropdown-togglebtn" href="#"  data-toggle="dropdown"  aria-expanded="false">
        <i className= "glyphicon glyphicon-chevron-down icon2"></i>
      </a>
    <div class="container dropdown-menu drop-menu ">
    <a class= "col-md-4  col-lg-4 dropdown-item drop-month " href="#" onClick={this.props.OnMonthClick}> فروردین </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> اردیبهشت </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> خرداد </a> 
    <a class=" col-md-4  dropdown-item drop-month" href="#"> تیر </a> 
    <a class=" col-md-4  dropdown-item drop-month" href="#"> مرداد </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> شهریور </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> مهر </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> آبان </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> آذر </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> دی </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> بهمن </a>
    <a class=" col-md-4  dropdown-item drop-month" href="#"> اسفند </a>
    </div>
      </div>
    )
  }
}



function InputYear(props){
  return(
    <div class=" dropdown-menu drop-menu2 " >
         
    <InputGroup class="col-md-8 drop-menu  drop-down ">
    <Input class="" type="text"></Input>
    <span class="btn input-group-addon addon-year" onClick=""> برو به سال</span>
    </InputGroup> 
   
    </div> 

  )
}