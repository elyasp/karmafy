// require("dotenv").config();
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import React, { Component } from "react";
// const styles = require("../images/GoogleMapStyles.json");
import styles from "../images/GoogleMapStyles.json";
export class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mapStyles = {
      width: "100%",
      height: "250px",
      display: "block",
      position: "static",
      margin: "0 auto"
    };

    const containerStyle = { height: "250px", position: "static" };
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
