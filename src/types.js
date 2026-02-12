/**
 * @typedef {Object} WeatherData
 * @property {number} temperature
 * @property {number} humidity
 * @property {number} aqi
 * @property {'Low' | 'Moderate' | 'High' | 'Very High'} pollen
 * @property {number} pm25
 * @property {number} windSpeed
 * @property {number} pressure
 * @property {string} timestamp
 */

/**
 * @typedef {Object} RiskAssessment
 * @property {'Low' | 'Moderate' | 'High' | 'Extreme'} level
 * @property {string} reasoning
 * @property {string[]} recommendations
 */

/**
 * @typedef {Object} Transcription
 * @property {'user' | 'assistant'} role
 * @property {string} text
 * @property {Date} timestamp
 */

/**
 * @typedef {Object} AppNotification
 * @property {string} id
 * @property {'danger' | 'warning' | 'info'} type
 * @property {string} title
 * @property {string} message
 * @property {string} time
 */

export const Role = {
  CLIENT: 'client',
  PROVIDER: 'provider',
  ADMIN: 'admin'
};

export const BookingStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  ON_THE_WAY: 'on_the_way',
  ARRIVED: 'arrived',
  IN_PROGRESS: 'in_progress',
  PROVIDER_COMPLETED: 'provider_completed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const AppSection = {
  Dashboard: 'dashboard',
  Forecast: 'forecast',
  LiveAssistant: 'assistant',
  MapForecast: 'map_forecast',
  About: 'about'
};
