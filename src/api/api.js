import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://workoutapi2.azurewebsites.net',
});

instance.interceptors.request.use(
    async (config) => {
      config.headers['X-AppName'] = 'Artsko';
      return config;
    },
    (err) => {
      return Promise.reject(err);
    },
  );

export default instance;
