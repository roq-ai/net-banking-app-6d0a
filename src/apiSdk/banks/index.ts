import axios from 'axios';
import queryString from 'query-string';
import { BankInterface, BankGetQueryInterface } from 'interfaces/bank';
import { GetQueryInterface } from '../../interfaces';

export const getBanks = async (query?: BankGetQueryInterface) => {
  const response = await axios.get(`/api/banks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBank = async (bank: BankInterface) => {
  const response = await axios.post('/api/banks', bank);
  return response.data;
};

export const updateBankById = async (id: string, bank: BankInterface) => {
  const response = await axios.put(`/api/banks/${id}`, bank);
  return response.data;
};

export const getBankById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/banks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBankById = async (id: string) => {
  const response = await axios.delete(`/api/banks/${id}`);
  return response.data;
};
