import { useFetch } from '../Utils/useFetch';

export const getPortfoly = async (userId: number) => {
  const response = await useFetch(`portfolio/${userId}`);
  return response;
};

export const createOrUpdatePortfolio = async (userId: number, portfolioData: any) => {
  const response = await useFetch(`portfolio/${userId}`, {
    method: 'PATCH',
    body: portfolioData
  });
  return response;
}