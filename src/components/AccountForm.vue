<template>
    <div class="form-container">
      <div class="header">
        <h2>Учётные записи</h2>
        <n-button class="add-btn" @click="store.addAccount">+</n-button>
      </div>
    
      <!-- column title -->
      <div class="account-list">
        <div v-if="store.accounts.length" class="column-titles">
          <span class="title">Метки</span>
          <span class="title">Тип записи</span>
          <span class="title">Логин</span>
          
        </div>
  
        <div v-for="(account, index) in store.accounts" :key="index" class="account-row">
          <n-input v-model="account.label" placeholder="Метки" @blur="store.updateAccount(index, 'label', account.label)" class="small-input" />
  
          <!-- LDAP/Local Drpd. -->
          <n-select
            v-model="account.type"
            :options="[{ label: 'Локальная', value: 'Local' }, { label: 'LDAP', value: 'LDAP' }]"
            @update:value="store.updateAccount(index, 'type', $event)"
            class="fixed-dropdown"
            :filterable="false"
            :clearable="false"
            placeholder="Локальная"
          />
  
          <!-- Login Field -->
          <n-input
            v-model="account.login"
            placeholder="Логин"
            @blur="store.updateAccount(index, 'login', account.login)"
            :class="{'expanded-input': account.type === 'LDAP', 'small-input': account.type === 'Local'}"
          />
  
          <!-- Password Field -->
          <div class="password-container" v-if="account.type === 'Local'">
            <n-input
              v-model="account.password"
              :type="passwordVisibility[index] ? 'text' : 'password'"
              placeholder="Пароль"
              @blur="store.updateAccount(index, 'password', account.password)"
              class="small-input"
            />
            <n-button class="eye-icon" @click="togglePassword(index)">
              <span v-if="passwordVisibility[index]">👁️‍🗨️</span>
              <span v-else>👁️</span>
            </n-button>
          </div>
  
          <n-button @click="store.removeAccount(index)" class="delete-btn">🗑</n-button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAccountStore } from '@/stores/accountStore';
  
  const store = useAccountStore();
  const passwordVisibility = ref([]);
  
  const togglePassword = (index) => {
    passwordVisibility.value[index] = !passwordVisibility.value[index];
  };
  </script>
  
  <style scoped>

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    margin: auto;
    padding: 20px;
  }
  

  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 20px; 
  }
  
  h2 {
    margin: 0;
    margin-right: 10px;
  }
  
  .add-btn {
    margin: 0;
  }
  
  
  .column-titles {
    display: flex;
    justify-content: center;
    gap: 10px;
    font-size: 10px; 
    font-weight: bold;
    margin-bottom: 5px;
    width: 53%;
    text-align: center;
  }
  
  .title {
    width: 130px;
    text-align: center;
  }
  
  .account-list {
    width: 100%;
  }
  
  .account-row {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    flex-wrap: nowrap;
  }
  
  .small-input {
    width: 130px;
    min-width: 130px;
    max-width: 130px;
  }
  
  .fixed-dropdown {
    width: 130px !important;
    min-width: 130px !important;
    max-width: 130px !important;
    text-align: center;
  }
  
  
  .expanded-input {
    width: 275px !important;
    min-width: 275px !important;
    max-width: 275px !important;
  }
  
  
  .password-container {
    display: flex;
    align-items: center;
  }
  

  .eye-icon {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    margin-left: 5px;
  }
  
  
  .delete-btn {
    background: none;
    border: none;
    color: black;
    cursor: pointer;
    font-size: 18px;
    margin-left: 5px;
  }
  
  /* 📱 Mobile */
  @media (max-width: 600px) {
    .account-row {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }
  
    .small-input, .fixed-dropdown, .expanded-input, .password-container {
      width: 100%;
    }
  
    .eye-icon {
      margin-left: -30px;
    }
  
    .delete-btn {
      align-self: flex-end;
    }
  }
  </style>
  