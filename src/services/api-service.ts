import { AuthService, DefaultService, OpenAPI } from './openapi';

OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

const apiService = {
  auth: AuthService,
  default: DefaultService,
};

export default apiService;
