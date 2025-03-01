import { defineStore } from 'pinia';
import type { Account } from '@/types/account';

export const useAccountStore = defineStore('accountStore', {
  state: () => ({
    accounts: JSON.parse(localStorage.getItem('accounts') || '[]') as Account[]
  }),
  actions: {
    addAccount() {
      this.accounts.push({ label: [], type: 'Local', login: '', password: '' });
      this.saveAccounts();
    },
    removeAccount(index: number) {
      this.accounts.splice(index, 1);
      this.saveAccounts();
    },
    updateAccount(index: number, key: keyof Account, value: any) {
      if (key === 'label') {
        this.accounts[index].label = value.split(';').map(text => ({ text: text.trim() }));
      } else {
        this.accounts[index][key] = value;
      }
      if (key === 'type' && value === 'LDAP') this.accounts[index].password = null;
      this.saveAccounts();
    },
    saveAccounts() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts));
    }
  }
});