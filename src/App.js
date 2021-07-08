import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherDay from './components/WeatherDay';
import MoviesDay from './components/MoviesDay';

class App extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      cityData: {},
      searchQuery: '',
      showMap: false,
      weatherInfo: [],
      moviesInfo: [],

    }
  }
  getlocation = async (e) => {
    e.preventDefault();
    await this.setState({
      searchQuery: e.target.city.value,
    })
    // console.log(this.state.searchQuery)
    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
    let responseData = await axios.get(url);
    await this.setState({

      cityData: responseData.data[0],
      showMap: true,
    })
    this.getWeather();
    this.reWeather();
    this.reMovies();

  }
  reWeather = async () => {

    let city = this.state.searchQuery;
    let weatherUrl = `https://city-explore-sereen.herokuapp.com/weather?cityName=${city}`;
    // let weatherUrl = `https://localhost:3030/weather?cityName=${city}&format=json`;
    let weatherData = await axios.get(weatherUrl)
    await this.setState({ WeatherInfo: weatherData.data, });
  }

  reMovies = async () => {
    let city = this.state.searchQuery;
    let moviesUrl = `https://city-explore-sereen.herokuapp.com/movies?cityName=${city}`;
    // let moviesUrl = `https://localhost:3030/movies?cityName=${city}&format=json`;
    let moviesData = await axios.get(moviesUrl);
    await this.setState({ moviesInfo: moviesData.data, })
  }
  getWeather = async () => {
    let city = this.state.searchQuery
    // .charAt(0).toUpperCase() + this.state.cityName.slice(1);
    // let pokemonData = await axios.get(`${process.env.REACT_APP_SERVER}/getPokeInfo?pokeName=charmander`);
    //https://city-explore-sereen.herokuapp.com/weather?cityName=Paris
    let cityData = await axios.get(`https://city-explore-sereen.herokuapp.com/weather?cityName=${city}`)
    await this.setState({ weatherInfo: cityData.data, })
  }

  render() {
    return (

      <>
        <h1>
          City Explorer
        </h1>

        <form onSubmit={this.getlocation} >
          <input type='text' placeholder='city name' name='city' />
          <input type='submit' value='get City data' />
        </form>

        <p>City Name:{this.state.cityData.display_name}</p>
        <p>Latitude :{this.state.cityData.lat}</p>
        <p>Longitude :{this.state.cityData.lon}</p>
        {this.state.showMap && <img alt='map' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} />
        }
        <WeatherDay weatherInfo={this.state.weatherInfo} />
        <MoviesDay moviesInfo={this.state.moviesInfo} />
        {/* {this.state.MoviesInfo.map((ele, index) => {
         return(        
         <div key={index}>
           <h4>Movies</h4>
           <p>  {ele.original_title}</p>
                   <p> {ele.overview}</p>
{ <p>{this.reMovies}</p>}
        </div>
        
         )
        }
        )} */}

      </>
    )
  }
}

export default App;
