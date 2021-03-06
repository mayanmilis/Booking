import React, { Component } from 'react';

class Input extends Component {
  state = { 
    input: '',
    value: ''
  }

  backSpaceHandler = (event) =>{    
    if(event.keyCode=== 8 && event.target.value.length===5){ 
       event.target.value=event.target.value.slice(0,4)
    }
    else if(event.keyCode=== 8 && event.target.value.length===4){ 
        event.target.value=event.target.value.slice(0,3)
    }
    else if(event.keyCode=== 8 && event.target.value.length===3){  
        event.target.value=' '
    }
  }

  onChangeHandler = (event) =>{
    let number = event.target.value;
    const reg = /([\d])/g;
    let newNumber = number.match(reg) ? number.match(reg).join('') : number='';
    let start = newNumber ? newNumber.slice(0,3): ''
    let middle = newNumber.length>3 ? ' ' + newNumber.slice(3,6) : '';
    let end = newNumber.length>6 ? '-' + newNumber.slice(6) : '';

    if(newNumber.length>0){ 
      this.setState({ 
        input: `(${start})`+middle+end,
        value: `+1${newNumber}`
      })
    };
    if(newNumber.length>9){  
      this.setState({ 
        input: newNumber,
        value: `+1${newNumber}`
      })
    };
    if(number===''){  
      this.setState({ 
        input: '',
        value: ''
      })
    };

  }

  render() {
    return (
      <div className="App">
      <h1>Exercise 1</h1>
        <input id='input' onChange={this.onChangeHandler} value={this.state.input} onKeyDown={this.backSpaceHandler} />
        <div> 
          <p>value: {this.state.value}</p>
        </div>
      </div>
    )
  }
};

export default Input;
