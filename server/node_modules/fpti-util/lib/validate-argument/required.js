'use strict'

const validateFptf = require('validate-fptf')()
const isString = require('lodash.isstring')
const isObject = require('lodash.isobject')

const error = message => { throw new Error(message) }

const createValidateStation = role => s => {
	const message = role + ' must be an FPTF `station` object or id'
	validateFptf(s)
	if (isString(s)) {
		if (s.length === 0) error(message)
	} else if (isObject(s)) {
		if (s.type !== 'station') error(message)
	} else error(message)
	return true
}

const validateQuery = q => {
	const message = 'query must be an non-empty string'
	if (!isString(q)) error(message)
	if (q.length === 0) error(message)
	return true
}

const validateLocation = l => {
	const message = 'location must be an FPTF `location` object containing `longitude` and `latitude`'
	validateFptf(l)
	if (!isObject(l)) error(message)
	if (l.type !== 'location') error(message)
	if (!l.longitude || !l.latitude) error(message)
	return true
}

const validateArgument = ({
	station: createValidateStation('station'),
	origin: createValidateStation('origin'),
	destination: createValidateStation('destination'),
	query: validateQuery,
	location: validateLocation,

	createValidateStation
})

module.exports = validateArgument
