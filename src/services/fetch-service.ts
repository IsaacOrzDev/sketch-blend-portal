import createClient from 'openapi-fetch';
import { paths } from '../lib/api/api';
import { getBaseUrl } from '@/lib/server-utils';

(global as unknown as { FormData: unknown }).FormData = class FormData {};

const fetchService = createClient<paths>({
  credentials: 'include',
  baseUrl: getBaseUrl(),
});

export default fetchService;
