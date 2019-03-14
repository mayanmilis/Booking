import React, { Component } from "react";
import Dashboard from './Dashboard'
import Input from './Input'
import {BrowserRouter, Route } from 'react-router-dom'


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path='/' component={Dashboard}/>
                    <Route path='/input' component={Input}/>
                </div>
            </BrowserRouter>
        );
    }
}
