// This Java-Script file contains the script which is responsible for 
// the functionalities and representations of the webmap.

//----------------------------------------
//--- Part 1: Adding a Basemap ----
//----------------------------------------

// L.map instantiates the webmap. The variable 'map' must match the DOM ID of the div element in the HTML document.
// Center and zoom define how the map is displayed when called.  

var map = L.map('map').setView([45.1592, 8.0186], 14);

// Basemaps are instantiated with L.tileLayer. Attributation is important to show where the basemap comes from.
// Minzoom and maxzoom are useful to set the minimum and maximum zoom level for the user.  

// Open Street map
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.tileLayer(osmUrl, {
	minZoom: 12, 
	maxZoom: 17, 
	attribution: osmAttrib
}).addTo(map);

//Watercolor basemap
var waterColorUrl = 'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg'
var waterColorAttrib = '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
var Watercolor = L.tileLayer( waterColorUrl, {
	minZoom: 12,
	maxZoom: 17,
	attribution: waterColorAttrib
});

var imageUrl = 'data/topo_1800_v2.jpg'
var latLngBounds = L.latLngBounds([[45.221477, 7.928469], [45.100422, 8.127926]]);
var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.8,
    interactive: true
}).addTo(map);

var imageUrl2 = 'data/topo_1800_v3.jpg'
var latLngBounds2 = L.latLngBounds([[45.198551, 7.9538189], [45.146619, 8.0927177]]);
var imageOverlay2 = L.imageOverlay(imageUrl2, latLngBounds2, {
    opacity: 0.8,
    interactive: true
}).addTo(map);


var basemaps = {
    "OpenStreetMap": osm,
    "WaterColor": Watercolor
};



// Add geojson
// define icon styles

var icon = L.icon({
    iconUrl: 'css/Images/bus-stop.png',
    iconSize: [30,30],
	});



// Create a GeoJSON layer and add it to the map
var industria_archeo = L.geoJSON(industria, {
    onEachFeature: function (feature, layer) {
        // Add a popup displaying the properties of each point
        if (feature.properties) {
            layer.bindPopup(
                "<strong>Name:</strong> " + feature.properties.Name 
            );
        }
    }
})
industria_archeo.addTo(map);

var poi_monteu = L.geoJSON(monteu, {
    pointToLayer: function (feature, latlng) {
       	return L.marker(latlng)
		
    },
    onEachFeature: function (feature, layer) {
        // Add a popup displaying the properties of each point
        if (feature.properties) {
            layer.bindPopup(
                "<strong>Name:</strong> " + feature.properties.Name 
            );
        }
    }
})
poi_monteu.addTo(map);



var overlayMaps = {
    "Punti di interesse": poi_monteu,
    "Sito Industria": industria_archeo,
    "rast": imageOverlay,
    "rast_clip": imageOverlay2
};

// Add a control to switch between basemaps
L.control.layers(basemaps, overlayMaps).addTo(map);




L.control.scale().addTo(map);

        map.on('click', 
          function(e){
            var coord = e.latlng.toString().split(',');
            var lat = coord[0].split('(');
            var lng = coord[1].split(')');
            console.log("You clicked the map at latitude: " + lat[1] + " and longitude:" + lng[0]);

          map.flyTo([lat[1], lng[0]], 16, {
            animate: true,
            duration: 2 // in seconds
          });

        });












