// Calendar integration service for Google/Outlook calendars
class CalendarService {
  constructor() {
    this.googleCalendarId = null;
    this.outlookCalendarId = null;
    this.isGoogleAuthenticated = false;
    this.isOutlookAuthenticated = false;
  }

  // Initialize Google Calendar API
  async initGoogleCalendar() {
    try {
      // Load Google API client
      await this.loadGoogleAPI();

      // Initialize client
      await gapi.client.init({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar.events'
      });

      this.isGoogleAuthenticated = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize Google Calendar:', error);
      return false;
    }
  }

  // Initialize Outlook Calendar API
  async initOutlookCalendar() {
    try {
      // Microsoft Graph API initialization would go here
      // This is a placeholder for Outlook integration
      this.isOutlookAuthenticated = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize Outlook Calendar:', error);
      return false;
    }
  }

  // Authenticate with Google
  async authenticateGoogle() {
    try {
      await gapi.auth2.getAuthInstance().signIn();
      this.isGoogleAuthenticated = true;
      return true;
    } catch (error) {
      console.error('Google authentication failed:', error);
      return false;
    }
  }

  // Authenticate with Outlook
  async authenticateOutlook() {
    try {
      // Microsoft authentication flow would go here
      // This is a placeholder
      this.isOutlookAuthenticated = true;
      return true;
    } catch (error) {
      console.error('Outlook authentication failed:', error);
      return false;
    }
  }

  // Create event in Google Calendar
  async createGoogleEvent(eventData) {
    if (!this.isGoogleAuthenticated) {
      throw new Error('Google Calendar not authenticated');
    }

    try {
      const event = {
        summary: eventData.title,
        description: eventData.description,
        start: {
          dateTime: eventData.startTime,
          timeZone: eventData.timeZone || 'UTC'
        },
        end: {
          dateTime: eventData.endTime,
          timeZone: eventData.timeZone || 'UTC'
        },
        location: eventData.location,
        attendees: eventData.attendees || []
      };

      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
      });

      return response.result;
    } catch (error) {
      console.error('Failed to create Google Calendar event:', error);
      throw error;
    }
  }

  // Create event in Outlook Calendar
  async createOutlookEvent(eventData) {
    if (!this.isOutlookAuthenticated) {
      throw new Error('Outlook Calendar not authenticated');
    }

    try {
      // Microsoft Graph API call would go here
      // This is a placeholder implementation
      const event = {
        subject: eventData.title,
        body: {
          contentType: 'HTML',
          content: eventData.description
        },
        start: {
          dateTime: eventData.startTime,
          timeZone: eventData.timeZone || 'UTC'
        },
        end: {
          dateTime: eventData.endTime,
          timeZone: eventData.timeZone || 'UTC'
        },
        location: {
          displayName: eventData.location
        },
        attendees: eventData.attendees || []
      };

      // Placeholder for API call
      console.log('Creating Outlook event:', event);
      return { id: `outlook_${Date.now()}`, ...event };
    } catch (error) {
      console.error('Failed to create Outlook Calendar event:', error);
      throw error;
    }
  }

  // Check for conflicting events
  async checkConflicts(startTime, endTime, calendarType = 'google') {
    try {
      if (calendarType === 'google' && this.isGoogleAuthenticated) {
        const response = await gapi.client.calendar.events.list({
          calendarId: 'primary',
          timeMin: startTime,
          timeMax: endTime,
          singleEvents: true,
          orderBy: 'startTime'
        });

        return response.result.items || [];
      } else if (calendarType === 'outlook' && this.isOutlookAuthenticated) {
        // Microsoft Graph API call for conflicts
        // Placeholder
        return [];
      }

      return [];
    } catch (error) {
      console.error('Failed to check calendar conflicts:', error);
      return [];
    }
  }

  // Sync booking to calendar
  async syncBookingToCalendar(bookingData, calendarType = 'google') {
    const eventData = {
      title: `Service Booking: ${bookingData.service}`,
      description: `Booking with ${bookingData.providerName} for ${bookingData.clientName}`,
      startTime: bookingData.date + 'T' + bookingData.time,
      endTime: this.calculateEndTime(bookingData.date + 'T' + bookingData.time, bookingData.duration || 60),
      location: bookingData.location,
      attendees: [
        { email: bookingData.clientEmail },
        { email: bookingData.providerEmail }
      ].filter(attendee => attendee.email)
    };

    try {
      // Check for conflicts first
      const conflicts = await this.checkConflicts(eventData.startTime, eventData.endTime, calendarType);

      if (conflicts.length > 0) {
        throw new Error('Time slot conflicts with existing calendar events');
      }

      // Create the event
      if (calendarType === 'google') {
        return await this.createGoogleEvent(eventData);
      } else if (calendarType === 'outlook') {
        return await this.createOutlookEvent(eventData);
      }
    } catch (error) {
      console.error('Failed to sync booking to calendar:', error);
      throw error;
    }
  }

  // Calculate end time based on duration
  calculateEndTime(startTime, durationMinutes) {
    const start = new Date(startTime);
    start.setMinutes(start.getMinutes() + durationMinutes);
    return start.toISOString();
  }

  // Load Google API script
  loadGoogleAPI() {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        window.gapi.load('client:auth2', resolve);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Get available time slots (considering calendar conflicts)
  async getAvailableSlots(date, duration = 60, calendarType = 'google') {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) { // 30-minute intervals
        const startTime = new Date(date);
        startTime.setHours(hour, minute, 0, 0);

        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + duration);

        // Check for conflicts
        const conflicts = await this.checkConflicts(
          startTime.toISOString(),
          endTime.toISOString(),
          calendarType
        );

        if (conflicts.length === 0) {
          slots.push({
            time: startTime.toTimeString().substring(0, 5),
            available: true
          });
        }
      }
    }

    return slots;
  }
}

export default new CalendarService();
