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
const MARKER_DELAY = 1000;

// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
    [-71.093729, 42.359244],
    [-71.094915, 42.360175],
    [-71.0958, 42.360698],
    [-71.099558, 42.362953],
    [-71.103476, 42.365248],
    [-71.106067, 42.366806],
    [-71.108717, 42.368355],
    [-71.110799, 42.369192],
    [-71.113095, 42.370218],
    [-71.115476, 42.372085],
    [-71.117585, 42.373016],
    [-71.118625, 42.374863],
];

// Load our MapBox access token
mapboxgl.accessToken = 'pk.eyJ1IjoidGptY29kZSIsImEiOiJjbDByNms5YjQwMGljM2prMHBldzNpZTV6In0.6E-vpO8VyPE1BhEoo9ptIw';

// #endregion

// #region  P R I V A T E   F I E L D S

// This is the map instance
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.091542, 42.358862],
    zoom: 14,
});

// This is our moving Marker in the map, initialized to the first coordinates in the array busStops.
var marker = new mapboxgl.Marker()
    .setLngLat([busStops[0][0], busStops[0][1]])
    .addTo(map);

// index of the current bus stop
var markerIndex = 0;

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  M E T H O D S – P U B L I C

/**
 * move() – moves a map marker to the next position in a fixed array of Bus Stops.
 *
 * @api public
 *
 * @returns {side-effects} updates position in bus stops ('markerIndex') and updates map display.
 *
 * @example
 *
 *      move();
 *
 */
function move()
{
    setTimeout(() =>
    {
        // wrap back to 1st bus stop
        if (markerIndex >= busStops.length)
        {
            markerIndex = 0;
        }

        // set marker
        marker.setLngLat(busStops[markerIndex++]);

        // update Map display
        move();

    }, MARKER_DELAY);
}

// #endregion

// #region  M E T H O D S – P R I V A T E

// #endregion

// #region  M E T H O D - E X P O R T S

if (typeof module !== 'undefined')
{
    module.exports = { move };
}

// #endregion

// #endregion
// #endregion