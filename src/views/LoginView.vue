<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/api/auth'

const username = ref('')
const password = ref('')
const loading = ref(false)
const showTip = ref(false)
const tipSuccess = ref(false)
const tipMessage = ref('')

function showResult(ok: boolean, text: string) {
  tipSuccess.value = ok
  tipMessage.value = text
  showTip.value = true
}

async function handleLogin() {
  if (!username.value || !password.value) {
    showResult(false, '请输入用户名和密码')
    return
  }
  loading.value = true
  showTip.value = false
  try {
    const res = await login(username.value, password.value)
    if (res.code === 200) {
      showResult(true, `登录成功，欢迎 ${res.data.username}`)
    } else {
      showResult(false, `登录失败：${res.message}`)
    }
  } catch (error) {
    showResult(false, `登录失败：${(error as Error).message}`)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="title">欢迎回来</h1>
      <p class="subtitle">personal-project 数据平台</p>

      <form class="login-form" @submit.prevent="handleLogin">
        <label class="field">
          <span class="field-label">用户名</span>
          <input
            v-model.trim="username"
            type="text"
            placeholder="请输入用户名"
            autocomplete="username"
          />
        </label>

        <label class="field">
          <span class="field-label">密码</span>
          <input
            v-model.trim="password"
            type="password"
            placeholder="请输入密码"
            autocomplete="current-password"
          />
        </label>

        <button class="login-button" type="submit" :disabled="loading">
          {{ loading ? '登录中…' : '登 录' }}
        </button>

        <p v-if="showTip" class="tip" :class="tipSuccess ? 'tip-success' : 'tip-error'">
          {{ tipMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:
    linear-gradient(180deg, rgba(8, 12, 36, 0.35), rgba(8, 12, 36, 0.55)),
    url('/login-bg.png') center / cover no-repeat;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 44px 40px 36px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(20, 26, 58, 0.55);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  color: #fff;
}

.title {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
}

.subtitle {
  margin-top: 8px;
  margin-bottom: 32px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 2px;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.field input {
  height: 44px;
  padding: 0 14px;
  font-size: 14px;
  color: #fff;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.08);
  outline: none;
  transition:
    border-color 0.2s,
    background-color 0.2s;
}

.field input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.field input:focus {
  border-color: #6ea8ff;
  background: rgba(255, 255, 255, 0.12);
}

.login-button {
  height: 46px;
  margin-top: 8px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 4px;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: linear-gradient(135deg, #4f7bff, #8b5cf6 55%, #c084fc);
  box-shadow: 0 10px 24px rgba(99, 102, 241, 0.35);
  transition:
    transform 0.15s,
    box-shadow 0.15s,
    opacity 0.15s;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(99, 102, 241, 0.45);
}

.login-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.tip {
  margin-top: 4px;
  font-size: 13px;
  text-align: center;
}

.tip-success {
  color: #4ade80;
}

.tip-error {
  color: #f87171;
}
</style>
