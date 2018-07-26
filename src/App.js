import React, { Component } from 'react';
import {cities} from './data/cities.js';
import {countries} from './data/countries.js';
import Countries from './Countries';
import Cities from './Cities';
import map from 'lodash/map';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: cities,
      countries: countries,
    }
  }

  onDrop = (data) => {
    let childName = data.target.textContent;
    const cityId = childName.split('&&')[0];
    const {parentId} = data.dropData;
    const newCities = map(this.state.cities, (city, index) => {
      if (city.ID === cityId) {
        return {
          ...city, childOf: [{parent: [parentId]}]
        }
      }
      return city;
    });
    this.setState({
      cities: newCities
    });
  }

  onLeave = (data) => {
    const {cityId} = data.dragData;
    const newCities = map(this.state.cities, (city, index) => {
      if (city.ID === cityId) {
        delete city.childOf;
        return city;
      }
      return city;
    });
    this.setState({
      cities: newCities
    });
  }

  render() {
    console.log("Cities:::", this.state.cities);
    return (
      <div>
        <Countries
          countries={this.state.countries}
          cities={this.state.cities}
          onLeave={this.onLeave}
        />
      <Cities cities={this.state.cities} onDrop={this.onDrop} onLeave={this.onLeave}/>
      </div>
    );
  }
}


export default App;
