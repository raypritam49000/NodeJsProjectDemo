const Joi = require('joi');

exports.EmployeeValidation = Joi.object({
  FirstName: Joi.string().max(200).required(),
  MiddleName: Joi.string().max(200).required(),
  LastName: Joi.string().max(200).required(),
  Email: Joi.string().max(200).required(),
  Password: Joi.string().max(100).required(),
  Gender: Joi.string().max(100).required(),
  DOB: Joi.date().required()
    .messages({
      'string.empty': "dob cannot be an empty field",
      'any.required': "dob is a required field",
      'date.base': "Please enter valid date"
    }),
  DateOfJoining: Joi.date().required(),
  TerminateDate: Joi.date().optional(),
  Deleted: Joi.optional(),
  Photo: Joi.optional(),
  ContactNo: Joi.string().max(20).required(),
  EmployeeCode: Joi.string().max(100).required(),
  Account: Joi.number().min(15).required()
});

exports.EmployeeValidationUpdate = Joi.object().keys({
  FirstName: Joi.string().max(200).required(),
  MiddleName: Joi.string().max(200).required(),
  LastName: Joi.string().max(200).required(),
  Email: Joi.string().max(200).required(),
  Gender: Joi.string().max(100).required(),
  DOB: Joi.date().required()
  .messages({
    'string.empty': "dob cannot be an empty field",
    'any.required': "dob is a required field",
    'date.base': "Please enter valid date"
  }),
  DateOfJoining: Joi.date().required(),
  TerminateDate: Joi.date().optional(),
  Deleted: Joi.optional(),
  Photo: Joi.optional(),
  ContactNo: Joi.string().max(20).required(),
  EmployeeCode: Joi.string().max(100).required(),
  Account: Joi.number().min(15).required()
});