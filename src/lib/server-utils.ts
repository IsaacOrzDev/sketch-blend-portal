export const isClusterExist = () => {
  return process.env.NEXT_PUBLIC_IS_OFFLINE !== 'true';
};

export const getBaseUrl = () => {
  return isClusterExist()
    ? process.env.NEXT_PUBLIC_BASE_URL
    : process.env.NEXT_PUBLIC_TEMPORARY_API_BASE_URL;
};
