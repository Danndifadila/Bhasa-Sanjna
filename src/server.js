// Import Hapi framework
import Hapi from '@hapi/hapi';
// Import routes configuration
import routes from './routes.js';

// Initialize the server
const init = async () => {
  // Create a Hapi server instance with configuration
  const server = Hapi.server({
    port: 5000, // Server port
    host: 'localhost', // Server host
    routes: {
      cors: {
        origin: ['*'], // Allow all origins for CORS
      },
    },
  });

  // Register routes
  server.route(routes);

  // Start the server
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

// Execute the initialization function
init().catch((err) => {
  console.error('Failed to start server:', err);
});
