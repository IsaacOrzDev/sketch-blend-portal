export const isClusterExist = () => {
  return process.env.NEXT_PUBLIC_IS_OFFLINE !== 'true';
};

export const getBaseUrl = () => {
  return isClusterExist()
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : process.env.NEXT_PUBLIC_TEMPORARY_API_BASE_URL;
};

export const getDocUrl = () => {
  return isClusterExist()
    ? process.env.NEXT_PUBLIC_DOCUMENTATION_URL
    : process.env.NEXT_PUBLIC_TEMPORARY_DOCUMENTATION_URL;
};
