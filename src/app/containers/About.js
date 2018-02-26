import React, { Component } from 'react';

export default class About extends Component {
  static displayName = 'About'

  render() {
    return (
      <div className="Page Page-about">
        <div className="About-app">
          <h3>Worldmap-Git-User</h3>
          <p>
            An application built with great technologies:
          </p>
          <ul>
            <li>Express</li>
            <li>React</li>
            <li>React Router</li>
            <li>CSS Loaders</li>
            <li>Webpack</li>
            <li>Babel</li>
          </ul>
          <p>
            And Restful API, ES6, ES7 Support and React Simple Maps
          </p>
        </div>
      </div>
    );
  }
}
