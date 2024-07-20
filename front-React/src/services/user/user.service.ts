
import { httpClientGet } from '~/clients';

const { REACT_APP_IP_API } = process.env;

export const getClientIp = async (): Promise<UserService.GetClientIpDTO> => {

  const response = await httpClientGet<UserService.GetClientIpResponse>({
    url: REACT_APP_IP_API,
    path: '/json',
    params: {
      fields: [
        'query',
        'country',
        'city',
        'region',
        'lat',
        'lon',
      ],
    },
  });

  return {
    city: response.data.city,
    country: response.data.country,
    ip: response.data.query,
    state: response.data.region,
    geolocation: {
      latitude: response.data.lat,
      longitude: response.data.lon,
    },
  };
};
