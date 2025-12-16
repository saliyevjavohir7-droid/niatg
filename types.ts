export interface FormData {
  ism: string;
  telefon: string;
  biznes: string;
  biznes_turi: string;
  xodimlar: string;
  manzil: string;
  muammo: string;
  byudjet: string;
  natija: string;
}

export interface ApiResponse {
  status: 'success' | 'error';
  message?: string;
}

export enum FormStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}