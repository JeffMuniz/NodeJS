import axios from 'axios';
import qs from 'querystring';

const authRoute = process.env.AUTH_API_URL || '';

export const auth = async (user: string, password: string): Promise<{
  accessToken: string;
  email: string;
  name: string;
  user: string;
}> => {
  const requestBody = {
    usuario: user,
    senha: password
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const response = await axios({
    method: 'post',
    url: authRoute,
    data: qs.stringify(requestBody),
    headers
  });

  const { access_token } =  response.headers;
  const { email, nome, usuario } = response.data;

  localStorage.setItem('token', access_token);

  return {
    accessToken: access_token,
    email,
    name: nome,
    user: usuario,
  };
};
