export interface WeatherData {
  temperature: number;
  humidity: number;
  aqi: number;
  pollen: 'Low' | 'Moderate' | 'High' | 'Very High';
  pm25: number;
  windSpeed: number;
  pressure: number;
  timestamp: string;
}

export interface RiskAssessment {
  level: 'Low' | 'Moderate' | 'High' | 'Extreme';
  reasoning: string;
  recommendations: string[];
}

export interface Transcription {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface AppNotification {
  id: string;
  type: 'danger' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
}

export enum Role {
  CLIENT = 'client',
  PROVIDER = 'provider',
  ADMIN = 'admin'
}

export enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor'
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  ON_THE_WAY = 'on_the_way',
  ARRIVED = 'arrived',
  IN_PROGRESS = 'in_progress',
  PROVIDER_COMPLETED = 'provider_completed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum AppSection {
  Dashboard = 'dashboard',
  Forecast = 'forecast',
  LiveAssistant = 'assistant',
  MapForecast = 'map_forecast',
  DoctorConnect = 'doctor_connect',
  Notifications = 'notifications',
  About = 'about'
}
