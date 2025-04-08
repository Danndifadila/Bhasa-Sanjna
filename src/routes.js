import { getAllTranslationsHandler, addTranslationHandler, getAllTranslationsDictionaryHandler, addTranslationsDictionaryHandler } from './handlers.js';

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
  }
];

export default routes;
