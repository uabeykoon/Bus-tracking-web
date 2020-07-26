import React from 'react';

const SingleDateSheduleChart = (props) => {
    return (
        <>
            <h4>From {props.destination}</h4><br />
            <table id="customers">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Bus</th>
                        <th>update</th>
                    </tr>
                </thead>
                <tbody>
                    {props.timeList.map((time)=>{
                        return (<tr key={time.id}>
                            <td>{time.departureTime}</td>
                            <td>
                                <select className="form-control" onChange={(e)=>props.onChangeBus(time.id,e)}>
                                <option key={0}>No Bus Assigned</option>
                                    {props.busList.map((bus)=>{
                                        return (
                                        <option key={bus.id}>{bus.id}</option>
                                        );
                                    })}
                                    
                                </select>
                                </td>
                                <td><button className="btn btn-primary" disabled={time.buttonDisable}>Update</button></td>
                        </tr>);
                    })}
                </tbody>
            </table>
        </>
    );
}

export default SingleDateSheduleChart;