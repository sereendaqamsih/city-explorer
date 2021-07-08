import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Weather extends React.Component{
    render(){
        return(
            <div>
            {this.props.weatherdayinfo.map((ele, index) => {
                return(        
                                    <div key={index}>
                  <h3>Weather</h3>
                  <p>  {ele.valid_date}
                          </p>
                          <p> {ele.description}</p>
               </div>
               
                )
               }
               )}
        </div>
        
        )

    }
}

export default Weather;
