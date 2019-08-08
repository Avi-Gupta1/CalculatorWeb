import React, { Component } from 'react';
import Button from './Button';
import "./css/style.css";

class App extends Component{
  constructor(props){
    super(props);

    this.state={
      current:'0',
      previous:[],
      nextIsReset:false
    }
  }

reset=()=>{
  this.setState({current:'0',previous:[]});

}
addtoCurrent=(symbol)=>{
  if(["+","-","*","/"].indexOf(symbol) > -1){
    let {previous}=this.state;
    previous.push(this.state.current + symbol);
    this.setState({previous,nextIsReset:true});
  }
  else{
    if(this.state.current==="0"||this.state.nextIsReset)
this.setState({current:symbol,nextIsReset:false});
else
this.setState({current:this.state.current+symbol,nextIsReset:false});
}
}

Calculate=(symbol)=>{
  let {current,previous,nextIsReset}=this.state;
  if(this.state.previous.length>0){
    let x="";
    let i=0;
    while(i<previous.length){
      x=x+previous[i];
      i++;
    }
    current=eval(String(x + current));
    this.setState({current,previous:[],nextIsReset:true});
  }
}

  render(){
    const buttons=[
      {symbol:'C',cols:3,action:this.reset},
      {symbol:'/',cols:1,action:this.addtoCurrent},
      {symbol:'9',cols:1,action:this.addtoCurrent},
      {symbol:'8',cols:1,action:this.addtoCurrent},
      {symbol:'7',cols:1,action:this.addtoCurrent},
      {symbol:'*',cols:1,action:this.addtoCurrent},
      {symbol:'6',cols:1,action:this.addtoCurrent},
      {symbol:'5',cols:1,action:this.addtoCurrent},
      {symbol:'4',cols:1,action:this.addtoCurrent},
      {symbol:'+',cols:1,action:this.addtoCurrent},
      {symbol:'3',cols:1,action:this.addtoCurrent},
      {symbol:'2',cols:1,action:this.addtoCurrent},
      {symbol:'1',cols:1,action:this.addtoCurrent},
      {symbol:'-',cols:1,action:this.addtoCurrent},
      {symbol:'0',cols:2,action:this.addtoCurrent},
      {symbol:'=',cols:2,action:this.Calculate}
      ];
  

  return(
    <div className="app">
     {(this.state.previous.length > 0) ?
     <div className="floaty-ele">{this.state.previous[this.state.previous.length-1]}</div> : null}
      <input type="text" className="result" value={this.state.current}/><br/>
      {buttons.map((btn,i)=>{
     return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol)=>btn.action(symbol)}/>
      }
      )}
  </div>
    );
  }
}
export default App;

