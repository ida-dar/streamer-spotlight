export const routes = Object.freeze({
  HOME: {
    name: 'Home',
    link: '/',
  },
  STREAMER_RECORDS: {
    name: 'Streamer Records',
    link: '/records',
  },
});

export const singleViewRoutes = Object.freeze({
  STREAMER_DETAILS: {
    name: 'Streamer Details',
    link: '/streamer/:id',
  },
});
