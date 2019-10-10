// require("dotenv").config();
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

import React, { Component } from "react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: this.props.items,
      showingInfoWindow: false,
      activeMarker: {}
    };
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.items !== prevProps.items) {
      this.setState({
        locations: this.props.items
      });
    }
  }

  displayMarkers = () => {
    return this.state.locations.map((place, index) => {
      return (
        <Marker
          key={place._id}
          id={place}
          position={{
            lat: place.location.lat,
            lng: place.location.lng
          }}
          onClick={this.test}
        />
      );
    });
  };

  render() {
    const mapStyles = {
      width: "85%",
      height: "450px",
      display: "block",
      position: "static"
    };

    const containerStyle = { height: "450px" };

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: 38.7223, lng: -9.1393 }}
        onClick={this.onMapClick}
        containerStyle={containerStyle}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer);
