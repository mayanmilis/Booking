import React from 'react'

const employee = (props) =>{    
    const {name, image, hours} = props
    return( 
        <div className='EmployeeLineContainer'>   
            <div id='Image' className='Bitmap' style={{backgroundImage:`url(${image})`}}></div>
                <div className='NameAndHours'>   
                <div className='EmployeeName'>{name}</div>
                <div className='Hours'>{hours}</div>
            </div>
        </div>
    )
}

export default employee;