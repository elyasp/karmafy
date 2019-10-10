// require("dotenv").config();
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import React, { Component } from "react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mapStyles = {
      width: "100%",
      height: "300px",
      display: "block",
      position: "static"
    };

    const containerStyle = { height: "300px" };
    const item = this.props.item;

    const lat = item && item.lat;
    const lng = item && item.lng;

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: lat, lng: lng }}
        onClick={this.onMapClick}
        containerStyle={containerStyle}
      >
        <Marker position={{ lat, lng }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer);
