// Import handlers for translations and authentication
import {
  getAllTranslationsHandler,
  addTranslationHandler,
  getAllTranslationsDictionaryHandler,
  addTranslationsDictionaryHandler,
} from './handlers.js';

import { loginHandler, registerHandler } from './authHandlers.js';

// Define routes for the application
const routes = [
  // Translation routes
  {
    method: 'GET',
    path: '/translations',
    handler: getAllTranslationsHandler, // Fetch all translations
  },
  {
    method: 'POST',
    path: '/translations',
    handler: addTranslationHandler, // Add a new translation
  },
  {
    method: 'GET',
    path: '/translations/dictionary',
    handler: getAllTranslationsDictionaryHandler, // Fetch all dictionary translations
  },
  {
    method: 'POST',
    path: '/translations/dictionary',
    handler: addTranslationsDictionaryHandler, // Add a new dictionary translation
  },

  // Authentication routes
  {
    method: 'POST',
    path: '/register',
    handler: registerHandler, // User registration
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler, // User login
  },
];

// Export routes for use in the application
export default routes;
