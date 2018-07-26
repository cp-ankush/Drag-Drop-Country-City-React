import React from 'react';
import { DropTarget, DragDropContainer } from 'react-drag-drop-container';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';

class Countries extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      countryWithCities: (this.props.countries.map((country) => {
        return { [country.ID]: false };
      }))
    }
  }


  componentWillReceiveProps(nextProps) {
    const { cities, countries } = nextProps;
    this.updateCountriesForCities(nextProps);
  }

  updateCountriesForCities = (props) => {
    const { cities } = props;
    const countryWithCities = map(this.state.countryWithCities, (country, index) => {
      const citiesForCountry = filter(cities, (city, index) => {
        if (!isEmpty(city.childOf) && country.hasOwnProperty(city.childOf[0].parent[0])) {
          return true;
        }
        return false;
      });
      const key = Object.keys(country)[0];
      return { [key]: (citiesForCountry.length > 0) };
    });
    this.setState({
      countryWithCities
    });
  }

  render() {
    const { countries, cities, onLeave } = this.props;
    return (
      <ul style={{
        display: 'flex',
        justifyContent: 'space-around',
        margin: '0',
        padding: '0'
      }} >
        {
          map(countries, (country, index) => {
            const hasCities = filter(this.state.countryWithCities, (item, index) => {
              if (item.hasOwnProperty(country.ID) && item[country.ID]) {
                return true;
              }
              return false;
            });
            return (
              <div
                style={{
                  width: '450px',
                }}
                key={index}
              >
                <DropTarget
                  onDragLeave={onLeave}
                  targetKey={'country'}
                  dropData={{ parentId: country.ID }}
                >
                  <span style={{
                    padding: '30px',
                    border: '1px solid #b5b5',
                    borderRadius: '5px',
                    margin: '50px 10px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    backgroundColor: ((hasCities.length > 0) ? 'rgba(166, 187, 226, 1)' : 'rgba(243, 191, 156, 1)'),
                  }}>
                    <span style={{ display: 'none' }}>{`${country.ID}&&`}</span>
                    {country.LocationName}
                    <div>
                      {
                        map(cities, (city, index) => {
                          if (!isEmpty(city.childOf) && city.childOf[0].parent[0] === country.ID) {
                            return (
                              <DragDropContainer
                                targetKey={'city'}
                                dragData={{ cityId: city.ID }}
                                key={city.LocationName}
                              >
                                <div key={index} style={{
                                  backgroundColor: 'rgba(243, 191, 156, 1)',
                                  margin: '10px',
                                  borderRadius: '5px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'flex-end'
                                }}>
                                  <span style={{
                                    textAlign: 'right',
                                    padding: '0 5px',
                                    width: 'fit-content',
                                    fontSize: '14px'
                                  }} onClick={() => { onLeave({ dragData: { cityId: city.ID } }) }}>
                                    x
                            </span>
                                  <span style={{ padding: '0px 20px 15px' }}>{city.LocationName}</span>
                                </div>
                              </DragDropContainer>
                            );
                          }
                        })
                      }
                    </div>
                  </span>
                </DropTarget>
              </div >
            );
          })
        }
      </ul >
    )
  }
}

export default Countries;
