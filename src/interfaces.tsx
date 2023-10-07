export interface BasicUserCredentials {
  email: string;
  password: string;
}

export interface ExtendedUserCredentials extends BasicUserCredentials {
  name: string;
}

export interface AuthData {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export type TextBookValuesTypes = { group: number; page: number };
