
import * as yup from 'yup';

export const base = () => yup.object();

export const name = () => yup
  .string()
  .required('Required field.')
  .min(2, 'Nomes devem possuir 2 ou mais caracteres.')
  .max(32, 'Nomes devem possuir no máximo 32 caracteres.');

export const cnpj = () => yup
  .string()
  .required('Campo obrigatório.')
  .min(14, 'CNPJ inválido.')
  .max(14, 'CNPJ inválido.');
