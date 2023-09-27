import createClient from 'openapi-fetch';
import { paths } from '../lib/api/api';

(global as unknown as { FormData: unknown }).FormData = class FormData {};

const fetchService = createClient<paths>({
  credentials: 'include',
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export default fetchService;
