import firebase from 'firebase/compat/app';

export default interface IPessoa {
  id: number;
  nomeCompleto: string;
  cpf: string;
  login: string;
  role: {
    id: string;
    denominacao: string;
  };
}
