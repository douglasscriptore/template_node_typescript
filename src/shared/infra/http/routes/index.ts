import { Router } from 'express';

const routes = Router();

routes.use('/', (request, response) => {
  response.json('Hello World');
});

export default routes;
