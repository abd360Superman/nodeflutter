'use strict'

const omit = require('lodash.omit')

const validateRequired = require('./required')
const validateOpt = require('./opt')

const validateArgument = ({
	...omit(validateRequired, ['createValidateStation']),
	...validateOpt
})

module.exports = validateArgument
