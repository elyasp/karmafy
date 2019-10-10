// require("dotenv").config();
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import React, { Component } from "react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: this.props.items
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.items !== prevProps.items) {
      console.log("updated", this.props.items);
      this.setState({
        locations: this.props.items
      });
    }
  }

  displayMarkers = () => {
    return this.state.locations.map((place, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: place.location.lat,
            lng: place.location.lng
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  render() {
    console.log("filtered", this.state.locations);
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
        // initialCenter={{ lat: lat, lng: lng }}
        onClick={this.onMapClick}
        containerStyle={containerStyle}
      >
        {/* <Marker position={{ lat, lng }} /> */}
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer);
