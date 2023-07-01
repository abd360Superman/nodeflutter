'use strict'

const validateArgument = require('./validate-argument')

// stations/stops/regions
const validateStations = (opt) => {
	validateArgument.stationsOpt(opt)
	return true
}
const validateStops = (opt) => {
	validateArgument.stopsOpt(opt)
	return true
}
const validateRegions = (opt) => {
	validateArgument.regionsOpt(opt)
	return true
}

// stations/stops/regions.search
const validateStationsSearch = (query, opt) => {
	validateArgument.query(query)
	validateArgument.stationsSearchOpt(opt)
	return true
}
const validateStopsSearch = (query, opt) => {
	validateArgument.query(query)
	validateArgument.stopsSearchOpt(opt)
	return true
}
const validateRegionsSearch = (query, opt) => {
	validateArgument.query(query)
	validateArgument.regionsSearchOpt(opt)
	return true
}

// stations/stops/regions.nearby
const validateStationsNearby = (opt) => {
	validateArgument.stationsNearbyOpt(opt)
	return true
}
const validateStopsNearby = (opt) => {
	validateArgument.stopsNearbyOpt(opt)
	return true
}
const validateRegionsNearby = (opt) => {
	validateArgument.regionsNearbyOpt(opt)
	return true
}

// stopovers
const validateStopovers = (station, opt) => {
	validateArgument.station(station)
	validateArgument.stopoversOpt(opt)
	return true
}

// journeys
const validateJourneys = (origin, destination, opt) => {
	validateArgument.origin(origin)
	validateArgument.destination(destination)
	validateArgument.journeysOpt(opt)
	return true
}

module.exports = ({
	stations: validateStations,
	stops: validateStops,
	regions: validateRegions,
	stationsSearch: validateStationsSearch,
	stopsSearch: validateStopsSearch,
	regionsSearch: validateRegionsSearch,
	stationsNearby: validateStationsNearby,
	stopsNearby: validateStopsNearby,
	regionsNearby: validateRegionsNearby,
	stopovers: validateStopovers,
	journeys: validateJourneys
})
