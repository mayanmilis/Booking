import React from 'react'

const employee = (props) =>{    
    const {availableRooms, reservedRooms, checkedIn, weekAvailabilityPercent} = props
    return( 
        <div> 
            <div className='NumbersContainer'>   
                <div id='Rooms_available' className='Title'>{availableRooms}</div>
                <div id='Reserved_rooms' className='Title'>{reservedRooms}</div>
                <div id='Checked_in' className='Title'>{checkedIn}</div>
            </div>
            <div className='RoomsContainer'>       
                <div id='Rooms_available' className='Rooms-available'>Rooms available</div>
                <div id='Reserved_rooms' className='Rooms-available'>Reserved rooms</div>
                <div id='Checked_in' className='Rooms-available'>Checked in</div>
            </div>
        </div>
    )
}

export default employee;