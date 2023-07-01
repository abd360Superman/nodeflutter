'use strict'

const isObject = require('lodash.isobject')
const isUndefined = require('lodash.isundefined')
const isNull = require('lodash.isnull')
const isNumber = require('lodash.isnumber')
const isDate = require('lodash.isdate')
const isCurrencyCode = require('is-currency-code')

const validateRequiredArgument = require('./required')

const error = message => { throw new Error(message) }

const validateOpt = o => {
	const message = 'opt must be an object or undefined'
	if (!isObject(o) && !isUndefined(o)) error(message)
	return true
}

const validateStationsOpt = o => {
	validateOpt(o)
	return true
}

const validateStationsSearchOpt = o => {
	validateOpt(o)
	return true
}

const validateStationsNearbyOpt = o => {
	validateOpt(o)
	if (isObject(o)) {
		validateOptDistance(o.distance)
	}
	return true
}

// careful! alters `o`
const validateWhenDepartureAfterArrivalBefore = o => {
	if (o.when && o.arrivalBefore) error(`opt.when and opt.arrivalBefore are mutually exclusive`)
	if (o.departureAfter && o.arrivalBefore) error(`opt.departureAfter and opt.arrivalBefore are mutually exclusive`)
	if ((o.when && o.departureAfter) && !(+o.when === +o.departureAfter)) error(`opt.when is a synonym to opt.departureAfter, they cannot contain different values`)
	if (o.when || o.departureAfter) {
		const date = [o.when, o.departureAfter].find(x => !!x)
		o.when = date
		o.departureAfter = date
	}
}

const validateJourneysOpt = o => {
	validateOpt(o)
	if (isObject(o)) {
		validateOptWhen(o.when)
		validateOptDepartureAfter(o.departureAfter)
		validateOptArrivalBefore(o.arrivalBefore)
		validateWhenDepartureAfterArrivalBefore(o) // careful: alters `o`
		validateOptResults(o.results)
		validateOptInterval(o.interval)
		validateOptTransfers(o.transfers)
		validateOptVia(o.via)
		validateOptCurrency(o.currency)
	}
	return true
}

const validateStopoversOpt = o => {
	validateOpt(o)
	if (isObject(o)) {
		// todo: remove duplicate code
		validateOptWhen(o.when)
		validateOptDepartureAfter(o.departureAfter)
		validateOptArrivalBefore(o.arrivalBefore)
		validateWhenDepartureAfterArrivalBefore(o) // careful: alters `o`
		validateOptResults(o.results)
		validateOptInterval(o.interval)
		validateOptDirection(o.direction)
	}
	return true
}

const validateOptDistance = d => {
	if (!isNull(d) && !isUndefined(d)) {
		const message = `opt.distance must be a non-negative number or null/undefined`
		if (!isNumber(d)) error(message)
		if (d < 0) error(message)
	}
	return true
}

const createValidateOptWhen = role => w => {
	if (!isNull(w) && !isUndefined(w)) {
		const message = `opt.${role} must be a date object or null/undefined`
		if (!isDate(w)) error(message)
	}
	return true
}

const validateOptWhen = createValidateOptWhen('when')
const validateOptDepartureAfter = createValidateOptWhen('departureAfter')
const validateOptArrivalBefore = createValidateOptWhen('arrivalBefore')

const validateOptResults = r => {
	if (!isNull(r) && !isUndefined(r)) {
		const message = `opt.results must be a positive integer or null/undefined`
		if (!Number.isInteger(r)) error(message)
		if (r <= 0) error(message)
	}
	return true
}

const validateOptInterval = i => {
	if (!isNull(i) && !isUndefined(i)) {
		const message = `opt.interval must be a non-negative number or null/undefined`
		if (!isNumber(i)) error(message)
		if (i < 0) error(message)
	}
	return true
}

const validateOptTransfers = t => {
	if (!isNull(t) && !isUndefined(t)) {
		const message = `opt.transfers must be a non-negative integer or null/undefined`
		if (!Number.isInteger(t)) error(message)
		if (t < 0) error(message)
	}
	return true
}

const createValidateOptStation = role => s => {
	if (!isNull(s) && !isUndefined(s)) {
		const validateStation = validateRequiredArgument.createValidateStation('opt.' + role)
		validateStation(s)
	}
	return true
}

const validateOptVia = createValidateOptStation('via')
const validateOptDirection = createValidateOptStation('direction')

const validateOptCurrency = c => {
	if (!isNull(c) && !isUndefined(c)) {
		const message = `opt.currency must be an ISO 4217 currency code string or null/undefined`
		if (!isCurrencyCode(c)) error(message)
	}
	return true
}

const validateArgument = ({
	opt: validateOpt,
	stationsOpt: validateStationsOpt,
	stopsOpt: validateStationsOpt,
	regionsOpt: validateStationsOpt,
	stationsSearchOpt: validateStationsSearchOpt,
	stopsSearchOpt: validateStationsSearchOpt,
	regionsSearchOpt: validateStationsSearchOpt,
	stationsNearbyOpt: validateStationsNearbyOpt,
	stopsNearbyOpt: validateStationsNearbyOpt,
	regionsNearbyOpt: validateStationsNearbyOpt,
	journeysOpt: validateJourneysOpt,
	stopoversOpt: validateStopoversOpt,
	optDistance: validateOptDistance,
	optWhen: validateOptWhen,
	optDepartureAfter: validateOptDepartureAfter,
	optArrivalBefore: validateOptArrivalBefore,
	optResults: validateOptResults,
	optInterval: validateOptInterval,
	optTransfers: validateOptTransfers,
	optVia: validateOptVia,
	optDirection: validateOptDirection,
	optCurrency: validateOptCurrency
})

module.exports = validateArgument
