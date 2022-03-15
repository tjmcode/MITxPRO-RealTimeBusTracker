// #region  H E A D E R
// <copyright file="mapanimation.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE Incorporated Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    JavaScript for the Real-Time Bus Tracker
 *      Module:   Styles (./mapanimation.css)
 *      Project:  MIT xPRO Real-Time Bus Tracker
 *      Customer: MIT xPRO: MERN Course
 *      Creator:  MicroCODE Incorporated
 *      Date:     March 2022
 *      Author:   Timothy J McGuire
 *
 *      Designed and Coded: 2022 MicroCODE Incorporated
 *
 *      This software and related materials are the property of
 *      MicroCODE Incorporated and contain confidential and proprietary
 *      information. This software and related materials shall not be
 *      duplicated, disclosed to others, or used in any way without the
 *      written of MicroCODE Incorported.
 *
 *
 *      DESCRIPTION:
 *      ------------
 *
 *      This module implements the JS code for a Real-Time Bus Tracker for the city of Boston.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MIT xPRO Starter code for 'Real-Time Bus Tracker' - by Dr. Sanchez
 *         https://student.emeritus.org/courses/3291/discussion_topics/239496?module_item_id=944654
 *
 *
 *      DEMONSTRATION VIDEOS:
 *      --------------------
 *
 *      1. MIT xPRO - WEEK 9 Videos
 *         https://student.emeritus.org/courses/3291/discussion_topics/239496?module_item_id=944654
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:     Description:
 *
 *  14-Mar-2022   TJM-MCODE  {0001}    New module for MIT xPRO - WEEK 9 Assignment.
 *
 *
 */
"use strict";

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S

// Milliseconds between map marker movements
const MARKER_DELAY = 200;

// Milliseconds between MBTA Data Requests
const REQUEST_DELAY = 15000;

// Load our MapBox access token
mapboxgl.accessToken = 'pk.eyJ1IjoidGptY29kZSIsImEiOiJjbDByNms5YjQwMGljM2prMHBldzNpZTV6In0.6E-vpO8VyPE1BhEoo9ptIw';

// #endregion

// #region  P R I V A T E   F I E L D S

// This is the MapBox instance
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.091542, 42.358862],
    zoom: 14,
});

// This array contains the coordinates for all bus positions being tracked
// and their Map Markers
var vehicles = [];

// index to the current bus location data
var vehicleIndex = 0;

// {TBD} -- allow user to select one of the buses to follow
var specificVehicleId = "1910";

// toggled by the "Start/Stop Tracking" button
var trackingActive = false;

// toggled by the "Start/Stop Follow" button
var followingBus = false;

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  M E T H O D S – P U B L I C

/**
 * pollForVehicleLocations() -- repeatedly polls the MBTA Server for bus locations.
 *
 * @returns {side-effects} updates the 'locations' object with current bus locations.
 */
async function pollForVehicleLocations()
{
    // get the data from the Mass. Boston Transit Authority (MBTA)
    const locations = await getVehicleLocations();

    // write to console for debugging only
    console.log(timeStamp());
    console.log(locations);

    let newVehicles = [];

    // extract the bus locations
    for (let locationIndex = 0; locationIndex < locations.length; locationIndex++)
    {
        let vehicle = locations[locationIndex];

        newVehicles.push(
            {
                // grab teh data we care about
                id: vehicle.attributes.label,
                position: [vehicle.attributes.longitude, vehicle.attributes.latitude],
                bearing: vehicle.attributes.bearing,
                occupancy: vehicle.attributes.occupancy_status ?? "FULL",

                // make a MapBox Marker
                marker: new mapboxgl.Marker()
                    .setLngLat([vehicle.attributes.longitude, vehicle.attributes.latitude])
                    .setPopup(new mapboxgl.Popup({ offset: 25 })
                        .setHTML('<ul><li>Bus #' + vehicle.attributes.label + '</li><li>Bearing:' + vehicle.attributes.bearing + '</li><li>Status:' + (vehicle.attributes.occupancy_status ?? "FULL") + '</li></ul>'))
                    .addTo(map)
            });

        newVehicles[locationIndex].marker.label = newVehicles[locationIndex].id + ", " + newVehicles[locationIndex].status;
    }

    // remove the old markers from the map
    for (let vehicleIndex = 0; vehicleIndex < vehicles.length; vehicleIndex++)
    {
        vehicles[vehicleIndex].marker.remove();
    }

    // update the 'live' data for the bus markers
    vehicles = newVehicles;
}

/**
 * getVehicleLocations() -- fetches Boston Bus location data.
 *
 * @returns {JSON} data represention the current locations of the MBTA Buses.
 */
async function getVehicleLocations()
{
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json = await response.json();

    return json.data;
}

/**
 * followSelectedBus() – moves a map marker to the next position in a fixed array of Bus Stops.
 *
 * @api public
 *
 * @returns {side-effects} updates position in bus stops ('markerIndex') and updates map display.
 */
function followSelectedBus()
{
    for (let vehicleIndex = 0; vehicleIndex < vehicles.length; vehicleIndex++)
    {
        // pan the map to the currently selected bus
        if (vehicles[vehicleIndex].id === specificVehicleId)
        {
            // follow the moving marker, pan map
            map.panTo(vehicles[vehicleIndex].position);
        }
    }
}

// #endregion

// #region  M E T H O D S – P R I V A T E

// #endregion

// #region  M E T H O D - E X P O R T S

if (typeof module !== 'undefined')
{
    module.exports = { move: trackVehicles };
}

// #endregion

// #endregion
// #endregion