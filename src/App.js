import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      cityData: {},
      searchQuery: '',
      showMap: false,
      WeatherInfo: [],

    }
  }
  getlocation = async (e) => {
    e.preventDefault();

    await this.setState({

      searchQuery: e.target.city.value.toLowerCase(),
    })
console.log(this.state.searchQuery)
    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

    let responseData = await axios.get(url);
    console.log(responseData)
    console.log(responseData.data)
    console.log(responseData.data[0])

     this.setState({

      cityData: responseData.data[0],
      showMap: true,
    })
    this.getWeather();

  }


  getWeather = async () => {
    let city = this.state.cityName.charAt(0).toUpperCase() + this.state.cityName.slice(1);
    // let pokemonData = await axios.get(`${process.env.REACT_APP_SERVER}/getPokeInfo?pokeName=charmander`);

   let cityData = await axios.get(`${process.env.REACT_APP_SERVER}/weather?cityName=${city}&format=json`)
   console.log(cityData.data);
    await this.setState({
      WeatherInfo: cityData.data,
    })
  }
  render() {
    return (

      <>
        <h1>
          City Explorer
        </h1>

        <form onSubmit = {this.getlocation} >
          <input type='text' placeholder='city name' name='city' />
          <input type='submit' value='get City data' />
        </form>

        <p>City Name:{this.state.cityData.display_name}</p>
        <p>Latitude :{this.state.cityData.lat}</p>
        <p>Longitude :{this.state.cityData.lon}</p>
        {this.state.showMap && <img alt='map' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} />
  }
        <p> weather {this.state.WeatherInfo}  {this.getWeather} </p>

      </>
    )
  }
}

export default App;
