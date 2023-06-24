const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    API_BASE_URL : Joi.string().required().description("API base url"),
    CLIENT_APP_URL : Joi.string().required().description("Client app url"),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    MONGODB_URL_TEST: Joi.string().required().description('Mongo DB test url')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  api_url : envVars.NODE_ENV === 'development' ? `${envVars.API_BASE_URL}:${envVars.PORT}` : envVars.API_BASE_URL,
  client_app_url : envVars.CLIENT_APP_URL,
  mongoose: {
    url: envVars.NODE_ENV === 'test' ? envVars.MONGODB_URL_TEST : envVars.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }
};
