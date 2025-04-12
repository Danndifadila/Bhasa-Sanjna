import { getAllTranslationsHandler, addTranslationHandler, getAllTranslationsDictionaryHandler, addTranslationsDictionaryHandler } from './handlers.js';
import { loginHandler, registerHandler } from './authHandlers.js';

const routes = [
  {
    method: 'GET',
    path: '/translations',
    handler: getAllTranslationsHandler,
  },
  {
    method: 'POST',
    path: '/translations',
    handler: addTranslationHandler,
  },
  {
    method: 'GET',
    path: '/translations/dictionary',
    handler: getAllTranslationsDictionaryHandler,
  },
  {
    method: 'POST',
    path: '/translations/dictionary',
    handler: addTranslationsDictionaryHandler,
  },
  {
    method: 'POST',
    path: '/register',
    handler: registerHandler
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler
  }
];

export default routes;
