
import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';
import map from '../static/world-50m.json';
import API from 'app/utils/API';
import Modal, { closeStyle } from 'simple-react-modal'

export default class WorldMap extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      selectedCountry: null,
      isShowed: false
    };
  }

  componentWillMount() {
    API.getCountries().then(data => {
      this.setState({ countries: data });
    });
  }

  handleMarkerClick(country) {
    this.setState({ isShowed: true });
  }

  handleCountryChange(target) {
    const { countries } = this.state;
    const index = target.selectedIndex - 1;

    // reset selected country if user chooses to the first option
    if (index === -1) {
      this.setState({ selectedCountry: null, gitUsers: {} });
    }

    const country = countries[index];

    API.getGitUsers(`location:${country.name}`, 'followers').then(data => {
      this.setState({ gitUsers: data });
    });
    this.setState({ selectedCountry: country });
  }

  renderCountryOptions() {
    const { countries } = this.state;

    const options = [<option value='' key='0'>Select country...</option>]

    countries.forEach((item, index) => {
      const { name } = item;

      options.push(<option value={name} key={index + 1}> {name} </option>);
    });

    return options;
  }

  renderUserList() {
    const {
      gitUsers: {
        total_count = 0,
        items = []
      } = {}
    } = this.state;

    return (
      <div className="user_list">
        <h3> Total Git Users: {total_count} </h3>
        {
          items.map((user, index) => {
            return (
              <div key={index}>
                <img src={user.avatar_url} />
                <span> {user.login} </span>
              </div>
            )
          })
        }
      </div>
    );
  }

  closeModal() {
    this.setState({ isShowed: false });
  }

  render() {
    const { selectedCountry, isShowed } = this.state;
    return (
      <div className="world-map">
        <h1> World Map Git Users </h1>
        <select onChange={(e) => this.handleCountryChange(e.target)}>
          {this.renderCountryOptions()}
        </select>
        <ComposableMap
          projectionConfig={{ scale: 205 }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
        >
          <ZoomableGroup center={[0, 20]} disablePanning>
            <Geographies geography="/assets/world-50m.json">
              {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                <Geography
                  key={i}
                  geography={geography}
                  projection={projection}
                  style={{
                    default: {
                      fill: "#ECEFF1",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    hover: {
                      fill: "#607D8B",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#FF5722",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                />
              ))}
            </Geographies>
            {selectedCountry &&
              <Markers>
                <Marker
                  marker={selectedCountry}
                  onClick={() => this.handleMarkerClick(selectedCountry)}
                >
                  <circle
                    cx={0}
                    cy={0}
                    r={6}
                    fill="#FF5722"
                    stroke="#DF3702"
                  />
                </Marker>
              </Markers>
            }
          </ZoomableGroup>
        </ComposableMap>

        <Modal show={isShowed} containerStyle={{ margin: "5% auto" }}>
          <a style={closeStyle} onClick={() => this.closeModal()}>X</a>
          {this.renderUserList()}
        </Modal>
      </div>
    )
  }
}