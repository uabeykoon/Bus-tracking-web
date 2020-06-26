import React, { Component } from 'react';
import './BusList.css'

class BusList extends Component {
    render() {
        return (
            <div>
                <br />
                <table id="customers">
                    <thead>
                        <tr>
                            <th>Bus Name</th>
                            <th>Route</th>
                            <th>Registration Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Samarasekara</td>
                            <td>138/Maharagama-Colombo</td>
                            <td>ND-5486</td>
                        </tr>
                        <tr>
                            <td>V-Lion</td>
                            <td>02/Colombo-Kandy</td>
                            <td>ND-5586</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        );
    }
}

export default BusList;