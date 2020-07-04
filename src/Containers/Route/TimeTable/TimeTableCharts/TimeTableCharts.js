import React, { Component } from 'react';


const TimeTableCharts = (props) => {

        return(
            <>
            <h4>From {props.destination}</h4><br />
            {props.input2}
            <table id="customers">
                <thead>
                    <tr>
                        <th>Route</th>
                        <th>Departure Time</th>

                    </tr>
                </thead>
                <tbody>
                {props.timeList.map((time)=>{
                                    return (<tr key={time.id}>
                                        <td>138</td>
                                        <td>{time.departureTime}</td>
                                    </tr>);
                                })}  
                </tbody>
            </table>
            </>
        );

}
export default TimeTableCharts;

