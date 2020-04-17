import React,{Component} from 'react';
import {Line} from 'react-chartjs-2';



    const state = {
       labels: ['2016','2017','2018','2019','2020'],
       datasets: [
         {
      label: 'Articles',
      fill: true,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [250,300,200,500,420]
    }
  ]
  
}

 class Chart extends Component {


 render() {
  let ingg=this.props.input;
    state.datasets[0].data=this.props.dArr;
 
   return (
          <div>
            
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Articles per year of '+ingg,
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}


export default Chart;