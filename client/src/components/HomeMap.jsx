import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  InfoWindow,
  Marker,
  MarkerWithLabel
} from "google-maps-react";
import OrgMarker from "../images/marker.png";
import GreenMarker from "../images/greenMarker.png";
import styled from "styled-components";
import styles from "../images/GoogleMapStyles.json";
require("dotenv").config();

// const {
//   MarkerWithLabel
// } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

const Sizer = styled.div`
  display: flex;
  height: 500px;
  max-width: 90vh;
  margin-left: 4%;
`;

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
    return this.state.locations.map((place, index) => {
      let markerImg = OrgMarker;
      if (place.itemStatus === "Found") {
        markerImg = GreenMarker;
      }
      const labelSize = { width: 220 };
      const labelPadding = 8;
      return (
        <Marker
          key={place._id}
          id={place}
          position={{
            lat: place.location.lat,
            lng: place.location.lng
          }}
          label={place.title}
          icon={{
            url: markerImg
          }}
          onClick={this.zoom}
        />
        // <MarkerWithLabel
        //   labelStyle={{
        //     textAlign: "center",
        //     width: labelSize.width + "px",
        //     backgroundColor: "#7fffd4",
        //     fontSize: "14px",
        //     padding: labelPadding + "px"
        //   }}
        //   id={place}
        //   labelAnchor={{ x: labelSize.width / 2 + labelPadding, y: 80 }}
        //   key={place.title}
        //   position={{ lat: place.location.lat, lng: place.location.lng }}
        //   icon={{
        //     url: markerImg
        //   }}
        //   onClick={this.zoom}
        // >
        //   <span>{place.name}</span>
        // </MarkerWithLabel>
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

    const containerStyle = { height: "450px", width: "85%" };

    return (
      <Sizer>
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
      </Sizer>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer);
