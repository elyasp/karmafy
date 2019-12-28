import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React, { Component } from "react";
import styles from "../images/GoogleMapStyles.json";
require("dotenv").config();

export class MapContainer extends Component {
  render() {
    const mapStyles = {
      width: "100%",
      height: "250px",
      display: "block",
      position: "static",
      margin: "0 auto"
    };

    const containerStyle = {
      height: "300px",
      width: "85%",
      position: "static"
    };
    const item = this.props.item;

    const lat = item && item.lat;
    const lng = item && item.lng;

    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        initialCenter={{ lat: lat, lng: lng }}
        onClick={this.onMapClick}
        containerStyle={containerStyle}
        disableDefaultUI={true} // disable default map UI
        draggable={true} // make map draggable
        zoomControl={true} // allow scale controle
        styles={styles} // change default map styles
      >
        <Marker position={{ lat, lng }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer);
