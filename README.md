# Trip speed visualizer on map (React + Node)
Client side was generated using create-react-app (https://github.com/facebook/create-react-app)
Server side has single api route: "/api/comma-data", which returns array where each element is object read from provided data.

#### Used libraries 
Visualizing trip on map - Leaflet (https://leafletjs.com/)
Client API calls - Axios (https://www.npmjs.com/package/axios)
Reverse proxy server - Nginx (https://www.nginx.com/)


#### App Details
Live demo is on AWS EC2. Access url http://3.18.93.156.

![enter image description here](https://lh3.googleusercontent.com/9weSpcU0I9votT4DJ3ijBEV5WmUdgDUYCTyNUU71u-ZNcT97y9xAhh9ss7ylFBW24Yet0GxT5F4)

![enter image description here](https://lh3.googleusercontent.com/vE1jtHqBy9dBaKT3P-xG8-d6HxUnFWo6nZhO9jc5quxtjPt0KFoAYlP932S4nNxSUxNDPU0gTeQ)

Colors above represent speed (m/s) of trip at current location.
0 - 10 Green
10 - 20 Yellow
20 - 25 Blue
Above 25 Red

####  Possible Fixes/Improvements

 1. On zoom-in or zoom-out leaflet map gets re-rendered, which makes browser glitch sometimes.
 2. Build selection area, where user can select specific trip and map visualizes that trip only.
