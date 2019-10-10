// require("dotenv").config();
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import React, { Component } from "react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      point: {
        lat: "",
        lng: ""
      }
    };
    this.updateCoord = this.updateCoord.bind(this);
  }

  onMapClick = (map, maps, e) => {
    const { latLng } = e;
    const latitude = e.latLng.lat();
    const longitude = e.latLng.lng();
    this.setState({
      point: {
        lat: latitude,
        lng: longitude
      }
    });
    this.updateCoord(this.state.point);
  };

  updateCoord(item) {
    this.props.updateCoord(this.state.point);
  }

  render() {
    const mapStyles = {
      width: "85%",
      height: "350px",
      display: "block",
      position: "static"
    };

    const containerStyle = { height: "350px" };

    const lat = this.state.point.lat;
    const lng = this.state.point.lng;

    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
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
