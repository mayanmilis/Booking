import React, { Component } from "react";
import './Dashboard.css';
import Employee from './Employee'
import Total from './Total'
import axios from 'axios'

export default class App extends Component {
    state = { 
        isLoaded: false,
        employees: [],
        items: [],
        total: []
    }

    componentDidMount(){    
    this.getData();
    }

    async getData () {    
        let items = [];
        let total = [];
        try{    
            const list = await axios.get('https://interview-booking-api.herokuapp.com/api/bookings');
            const totalList = await axios.get('https://interview-booking-api.herokuapp.com/api/booking-snapshot');
            items = list.data;
            total = totalList.data;
        }catch (err){    
            console.log('something went wrong')
        };
        items.splice(19,1);

        function calculateHours(start, end){   
            let oneDay = 60*60*1000;
            let firstDate = new Date(start);
            let secondDate = new Date(end);
            let hours = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

            return hours;
        }

        for(let i =0; i<items.length; i++){ 
            let newCheckInDate = items[i].checkInDate.slice(6)+items[i].checkInDate.slice(2,6)+items[i].checkInDate.slice(0,2);
            let newCheckOutDate = items[i].checkOutDate.slice(6)+items[i].checkOutDate.slice(2,6)+items[i].checkOutDate.slice(0,2);
            items[i].hours = calculateHours(newCheckInDate,newCheckOutDate);
        };

        let employees = [];
        items.map(item =>{  
            return employees.push(item.employee);
        });
        
        let newEmployees = [];
        let obj=[];
        for(let i=0; i<employees.length; i++){   
            if(newEmployees.indexOf(JSON.stringify(employees[i]))!==-1){    
                continue
            }else{  
                newEmployees.push(JSON.stringify(employees[i]))
            };
        };

        newEmployees.map(item =>{   
            return obj.push((JSON.parse(item)))
        });

        obj.map(item =>{    
            return item.hours = 0
        });
        
        for(let i=0; i<obj.length; i++){    
            for(let j=0; j<items.length; j++){  
                if(items[j].employee.id===obj[i].id){    
                    obj[i].hours =+ items[j].hours
                }
            }
        };

        obj.sort(function (a, b) {
            return b.hours - a.hours;
          });

        this.setState({ 
            employees: obj,
            items: items,
            total: total,
            isLoaded: true
        });
    };

    render() {
        let {isLoaded, employees} = this.state;
        if(!isLoaded){  
            return <div>Loading...</div>
        }else{  
            return (
                <div className='Container'>   
                    <div className='Booking-Dashboard---simple'>
                        <Total  
                        availableRooms={this.state.total.availableRooms}
                        reservedRooms={this.state.total.reservedRooms}
                        checkedIn={this.state.total.checkedIn}
                        weekAvailabilityPercent={this.state.total.weekAvailabilityPercent}
                        />
                        <div className='Line'></div>
                        <div className='EmployeeContainer'>   
                            <div className='Employee-stats'>Employee stats</div>
                            <ul>    
                                {employees&&employees.map(item =>{  
                                    return( 
                                        <li key={item.id}>
                                            <Employee
                                            name={item.firstName + ' ' + item.lastName[0]+'.'}
                                            image={item.profileImageUrl}
                                            hours={item.hours + ' ' + ' hours'}
                                            />
                                        </li>
                                    )
                                }).slice(0,3)}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
    }
};
