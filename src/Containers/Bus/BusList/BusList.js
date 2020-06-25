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
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        );
    }
}

export default BusList;