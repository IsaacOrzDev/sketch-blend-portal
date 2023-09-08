import createClient from 'openapi-fetch';
import { paths } from '../lib/api/api';

const fetchService = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export default fetchService;
