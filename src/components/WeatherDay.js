import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './Weather';


class WeatherDay extends React.Component{
render(){
return (<>
< Weather weatherdayinfo={this.props.weatherInfo}/>
</>
)
}}
export default WeatherDay;
