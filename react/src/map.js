import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';


const Wrapper = styled.div`
  width: $(props -> props.width);
  height: $(props -> props.height);
`;

const getPointColor = function (point){
  let speedThreshold = [10, 20, 25];
  if (point.speed < speedThreshold[0]) return 'green'
  if (point.speed < speedThreshold[1]) return 'yellow'
  if (point.speed < speedThreshold[2]) return 'orange'
  return 'red'
}

class Leafmap extends Component {
  drawLineOnMap(color, pointList){
    let firstpolyline = new L.Polyline(pointList, {
      color: color,
      weight: 3,
      opacity: 0.5,
      smoothFactor: 1
    });
    firstpolyline.addTo(this.map);
  }
  componentDidMount() {
    this.map = L.map('map', {
      center: {lat: 37.77, lng: -122.43},
      zoom: 15,
      zoomControl: false
    })
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}", {
      detectRetina: true,
      maxZoom: 20,
      maxNativeZoom: 17,
    }).addTo(this.map);

    setTimeout( () => this.map.invalidateSize(), 10 )

  }
  componentDidUpdate() {
    let redLines = [];
    let orangeLines = [];
    let yellowLines = [];
    let greenLines = [];

    this.props.data.forEach( (trip) => {
      let currentLine = [];
      let currentColor = null;
      trip.coords.forEach( point => {
        currentLine.push(new L.LatLng(point.lat, point.lng));
        if (currentColor == null) {
          currentColor = getPointColor(point);
        } else {          
          if (currentColor !== getPointColor(point)) {
            if (getPointColor(point) === 'red') redLines.push(currentLine);
            if (getPointColor(point) === 'orange') orangeLines.push(currentLine);
            if (getPointColor(point) === 'yellow') yellowLines.push(currentLine);
            if (getPointColor(point) === 'green') greenLines.push(currentLine);
            currentLine = [];
            currentColor = null;
          }
        }
      })
    })
    redLines.forEach(pointList => {
      this.drawLineOnMap('red', pointList)
    })
    orangeLines.forEach(pointList => {
      this.drawLineOnMap('blue', pointList)
    })
    yellowLines.forEach(pointList => {
      this.drawLineOnMap('yellow', pointList)
    })
    greenLines.forEach(pointList => {
      this.drawLineOnMap('green', pointList)
    })
  }
  render () {
    return <Wrapper id="map"/>
  }
}


export default Leafmap;