export interface Account {
    label: { text: string }[];
    type: 'Local' | 'LDAP';
    login: string;
    password: string | null;
  }