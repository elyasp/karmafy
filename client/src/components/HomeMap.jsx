import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  InfoWindow,
  Marker,
  MarkerWithLabel
} from "google-maps-react";
import OrgMarker from "../images/marker.svg";
import GreenMarker from "../images/greenMarker.svg";
import styles from "../images/GoogleMapStyles.json";
require("dotenv").config();

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: this.props.items,
      showingInfoWindow: false,
      activeMarker: {}
    };
  }
  zoom = event => {
    window.location = "#" + event.id._id;
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.items !== prevProps.items) {
      this.setState({
        locations: this.props.items
      });
    }
  }

  displayMarkers = () => {
    return this.state.locations.map(place => {
      let markerImg = OrgMarker;
      if (place.itemStatus === "Found") {
        markerImg = GreenMarker;
      }
      const markerStyles = {
        textShadow: "4px 4px 5px red"
      };
      return (
        <Marker
          style={{ markerStyles }}
          key={place._id}
          id={place}
          position={{
            lat: place.location.lat,
            lng: place.location.lng
          }}
          label={{
            text: place.title,
            color: "black",
            backgroundColor: "red",
            textShadow: "4px 4px 5px red",
            fontSize: "15px",
            fontFamily: "Krub",
            fontWeight: "600"
          }}
          icon={{
            url: markerImg
          }}
          onClick={this.zoom}
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

    const containerStyle = { height: "450px", width: "80%" };

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: 38.7223, lng: -9.1393 }}
        onClick={this.onMapClick}
        containerStyle={containerStyle}
        onBoundsChange={this._onBoundsChange}
        disableDefaultUI={true} // disable default map UI
        draggable={true} // make map draggable
        zoomControl={true} // allow scale controle
        styles={styles} // change default map styles
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer);
