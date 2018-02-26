import React, { Component } from 'react';
import Helmet from 'react-helmet';
import WorldMap from 'app/components/WorldMap';

export default class Home extends Component {
  static displayName = 'Home'

  render() {
    return (
      <div className="Page Page-home">
        <Helmet title="World Map" />
        <WorldMap />
      </div>
    );
  }
}
