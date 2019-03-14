import React, { Component } from 'react';


class Input extends Component {
  state = { 
    input: '',
    value: ''
  }

  onChangeHandler = (event) =>{
    event.preventDefault()
    let number = event.target.value;
    const reg = /([\d])/g;
    let newNumber = number.match(reg) ? number.match(reg).join('') : number=''
    let plusOne = number ? '+1' : ''
    let start = newNumber ? newNumber.slice(0,3): ''
    let middle = newNumber ? ' ' + newNumber.slice(3,6) : '';
    let end = newNumber.length>6 ? '-' + newNumber.slice(6) : ''
    const input = document.getElementById('input')
    if(newNumber.length<4){ 
      input.setSelectionRange(newNumber.length+1, newNumber.length+1);
    }
    if(newNumber.length>0){ 
      this.setState({ 
        input: `(${start})`+middle+end,
        value: `+1${newNumber}`
      })
    }
    if(newNumber.length>9){  
      this.setState({ 
        input: newNumber,
        value: `+1${newNumber}`
      })
    }
    if(number===''){  
      this.setState({ 
        input: '',
        value: ''
      })
    }
  }

  render() {
    return (
      <div className="App">
      <h1>Exercise 1</h1>
        <input id='input' onChange={this.onChangeHandler} value={this.state.input} />
        <div> 
          <p>value: {this.state.value}</p>
        </div>
      </div>
    );
  }
}

export default Input;
