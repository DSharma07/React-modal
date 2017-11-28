import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import _ from 'lodash';

import {Line} from 'react-chartjs-2';

export default class Graph extends Component {
    constructor() {
        super();

        this.state = {
            members: [],
            list: []
        }
    }

    async componentWillMount() {
        const res =  await axios.get('/api/graph/'+ this.props.memberId);
        const details = res.data;
        this.setState({list : details});
    }
   
    render() {
        var aa = ['','','','','','','','','','','',''];
        var bb = ['','','','','','','','','','','',''];
        var mainList = this.state.list;
        mainList.forEach(member => {
            if(member.type == "expense"){
                member.details.forEach(d => {
                    if(aa[d.month-1] == ''){
                      aa[d.month-1] = d.amount
                    }
                    else{
                        aa[d.month -1] = aa[d.month -1] + d.amount
                    }
                })
            }
            if(member.type == "income"){
                member.details.forEach(d => {
                    if(bb[d.month-1] == ''){
                        bb[d.month-1] = d.amount
                      }
                      else{
                        bb[d.month -1] = bb[d.month -1] + d.amount
                      }
                })
            }
        })

        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Aug','Sep','Oct','Nov','Dec'],
            datasets: [
              {
                label: 'Expense',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: 'red',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'black',
                pointHoverBorderColor: 'red',
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHitRadius: 10,
                data: aa
              },
              {
                label: 'Income',
                lineTension: 0.1,
                backgroundColor: "rgba(167,105,0,0.4)",
                borderColor: "rgb(167, 105, 0)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "white",
                pointBackgroundColor: "black",
                pointBorderWidth: 1,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: "brown",
                pointHoverBorderColor: "yellow",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                data: bb
              }
            ]
          };

          var options = {
            scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero:true
                          },
                          scaleLabel: {
                               display: true,
                               labelString: '( € ) Amount',
                               fontSize: 20 
                            }
                      }]            
                  }  
          };

        return (
            <div>
                <Line data={data} options={options} width={100} height={20}/>
            </div>
        )
    }
}