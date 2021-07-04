import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      cityData: {},
      searchQuery: '',
      showMap: false,

    }
  }
  getlocation = async (e) => {
    e.preventDefault();

    await this.setState({

      searchQuery: e.target.city.value,
    })

    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

    let responseData = await axios.get(url);
    // console.log(responseData)
    // console.log(responseData.data)
    // console.log(responseData.data[0])

     this.setState({

      cityData: responseData.data[0],
      showMap: true,
    })

  }

  render() {
    return (

      <>
        <h1>
          City Explorer
        </h1>

        <form onSubmit={this.getLocation}>
          <input type='text' placeholder='city name' name='city' />
          <input type='submit' value='get City data' />
        </form>

        <p>City Name:{this.state.cityData.display_name}</p>
        <p>Latitude :{this.state.cityData.lat}</p>
        <p>Longitude :{this.state.cityData.lon}</p>
        {this.state.showMap && <img alt='map' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} />
 }

      </>
    )
  }
}

export default App;
