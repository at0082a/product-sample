import React from 'react';
import CanvasJSReact from './canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
export default class DailyEventsChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [], 
      type: ''
    };
  }

  componentDidMount() {
    let type = this.props.type;
    this.setState({type: type});
    this.setState({data: this.props.data});
  }

  componentWillReceiveProps (prevProps) {
    if(this.props.data !== prevProps.data){
      if (this.state.data.length < 1) {
        this.setState({data: prevProps.data});
      }
    }
  }

 render() {
    let daily = this.state.data;
    for (let i = 0; i < daily.length; i++) {
      let day = daily[i].date.slice(0, 10);
      daily[i] = { 'y': parseInt(daily[i].events), label: day };
    } 
		const options = {
				animationEnabled: true,	
				title:{
					text: "Daily Events"
				},
				axisY : {
					title: "Number of Events",
					includeZero: false
        },
        axisX: {
          title: "Date"
        },
				toolTip: {
					shared: true
				},
				data: [{
					type: "spline",
					name: "Events",
					showInLegend: true,
					dataPoints: daily
        }
				]
		};
		
		return (
		<div className='charts'>
			<CanvasJSChart options = {options}/>
		</div>
		);
  }
};