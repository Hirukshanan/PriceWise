<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '../store';

const router = useRouter();
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref('');

const handleLogin = () => {
  errorMessage.value = '';

  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter both email and password';
    return;
  }

  isSubmitting.value = true;
  setTimeout(() => {
    const result = loginUser(email.value, password.value);
    isSubmitting.value = false;

    if (result.success) {
      router.push('/');
    } else {
      errorMessage.value = result.error || 'Login failed';
    }
  }, 600);
};
</script>

<template>
  <div class="login-page">
    <!-- Animated background orbs -->
    <div class="orb orb-1" aria-hidden="true"></div>
    <div class="orb orb-2" aria-hidden="true"></div>
    <div class="orb orb-3" aria-hidden="true"></div>

    <!-- Card -->
    <div class="login-card" :class="{ submitting: isSubmitting }">
      <!-- Logo / Brand -->
      <div class="brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        <h1>PriceWise</h1>
      </div>

      <div class="card-header">
        <h2>Welcome back</h2>
        <p>Sign in to continue tracking your best deals</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <!-- Email -->
        <div class="input-group" :class="{ filled: email }">
          <div class="input-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><path d="m2 4 10 10 10-10"/>
            </svg>
          </div>
          <input
            v-model="email"
            type="email"
            id="login-email"
            required
            placeholder=" "
            autocomplete="email"
          />
          <label for="login-email">Email address</label>
        </div>

        <!-- Password -->
        <div class="input-group" :class="{ filled: password }">
          <div class="input-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="login-password"
            required
            placeholder=" "
            autocomplete="current-password"
          />
          <label for="login-password">Password</label>
          <button
            type="button"
            class="toggle-password"
            @click="showPassword = !showPassword"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
          >
            <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          </button>
        </div>

        <!-- Remember / Forgot -->
        <div class="form-extras">
          <label class="checkbox-label">
            <input v-model="rememberMe" type="checkbox" id="login-remember" />
            <span class="checkmark"></span>
            Remember me
          </label>
          <a href="#" class="forgot-link">Forgot password?</a>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="error-banner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Submit -->
        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          <span v-if="!isSubmitting">Sign In</span>
          <span v-else class="spinner"></span>
        </button>
      </form>

      <!-- Footer -->
      <div class="card-footer">
        <p>Don't have an account? <router-link to="/register" class="link">Create one free</router-link></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #fef7ed 0%, #fdf2e9 30%, #f0e6ff 70%, #e8f4fd 100%);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* ─── Animated Orbs ─────────────────────────────────── */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  pointer-events: none;
  will-change: transform;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #f97316, #fb923c);
  top: -10%;
  right: -5%;
  animation: float1 8s ease-in-out infinite;
}

.orb-2 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
  bottom: -15%;
  left: -10%;
  animation: float2 10s ease-in-out infinite;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float3 12s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-30px, 40px) scale(1.05); }
  66% { transform: translate(20px, -20px) scale(0.95); }
}

@keyframes float2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(40px, -30px) scale(1.08); }
  66% { transform: translate(-20px, 20px) scale(0.92); }
}

@keyframes float3 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-40%, -60%) scale(1.1); }
}

/* ─── Card ──────────────────────────────────────────── */
.login-card {
  width: 100%;
  max-width: 440px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(40px) saturate(1.8);
  -webkit-backdrop-filter: blur(40px) saturate(1.8);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 28px;
  padding: 2.5rem 2rem;
  position: relative;
  z-index: 10;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.06),
    0 2px 8px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  animation: cardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.login-card.submitting {
  transform: scale(0.98);
  opacity: 0.7;
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (min-width: 640px) {
  .login-card {
    padding: 3rem 2.5rem;
  }
}

/* ─── Brand ──────────────────────────────────────────── */
.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.brand-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, #f97316, #ea580c);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(249, 115, 22, 0.35);
}

.brand-icon svg {
  width: 22px;
  height: 22px;
  color: white;
}

.brand h1 {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #1e293b, #475569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ─── Card Header ──────────────────────────────────── */
.card-header {
  text-align: center;
  margin-bottom: 2rem;
}

.card-header h2 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.02em;
  margin: 0 0 0.4rem;
}

.card-header p {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

/* ─── Form ──────────────────────────────────────────── */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ─── Input Groups ─────────────────────────────────── */
.input-group {
  position: relative;
}

.input-group input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  font-family: inherit;
  color: #1e293b;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

.input-group input::placeholder {
  color: transparent;
}

.input-group input:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1), 0 4px 12px rgba(249, 115, 22, 0.08);
  background: #fff;
}

.input-group label {
  position: absolute;
  left: 3rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.95rem;
  color: #94a3b8;
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  padding: 0 4px;
}

.input-group input:focus ~ label,
.input-group input:not(:placeholder-shown) ~ label {
  top: 0;
  left: 0.85rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #f97316;
  background: white;
  padding: 0 6px;
  border-radius: 4px;
}

.input-icon {
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: color 0.3s ease;
  color: #94a3b8;
}

.input-group:focus-within .input-icon,
.input-group.filled .input-icon {
  color: #f97316;
}

.input-icon svg {
  width: 20px;
  height: 20px;
}

.toggle-password {
  position: absolute;
  right: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #94a3b8;
  transition: color 0.2s;
  display: flex;
  align-items: center;
}

.toggle-password:hover {
  color: #f97316;
}

.toggle-password svg {
  width: 20px;
  height: 20px;
}

/* ─── Extras Row ────────────────────────────────────── */
.form-extras {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #475569;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
}

.checkbox-label input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  position: relative;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.checkbox-label input:checked + .checkmark {
  background: #f97316;
  border-color: #f97316;
}

.checkbox-label input:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.forgot-link {
  font-size: 0.85rem;
  color: #f97316;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #ea580c;
  text-decoration: underline;
}

/* ─── Submit Button ─────────────────────────────────── */
.submit-btn {
  width: 100%;
  padding: 0.95rem;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: white;
  font-size: 1rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  letter-spacing: -0.01em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.3);
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #fb923c, #f97316);
  opacity: 0;
  transition: opacity 0.3s;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(249, 115, 22, 0.4);
}

.submit-btn:hover::before {
  opacity: 1;
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
}

.submit-btn:disabled {
  cursor: not-allowed;
}

.submit-btn span {
  position: relative;
  z-index: 1;
}

.spinner {
  display: inline-block;
  width: 22px;
  height: 22px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ─── Error Banner ─────────────────────────────────── */
.error-banner {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1rem;
  background: #fef2f2;
  border: 1.5px solid #fecaca;
  border-radius: 12px;
  animation: shake 0.4s ease;
}

.error-banner svg {
  width: 18px;
  height: 18px;
  color: #ef4444;
  flex-shrink: 0;
}

.error-banner span {
  font-size: 0.85rem;
  font-weight: 600;
  color: #dc2626;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}


/* ─── Footer ───────────────────────────────────────── */
.card-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.card-footer p {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
}

.card-footer .link {
  color: #f97316;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s;
}

.card-footer .link:hover {
  color: #ea580c;
  text-decoration: underline;
}


/* ─── Mobile ────────────────────────────────────────── */
@media (max-width: 480px) {
  .login-page {
    padding: 1rem;
  }

  .login-card {
    padding: 2rem 1.5rem;
    border-radius: 24px;
  }

  .card-header h2 {
    font-size: 1.4rem;
  }

  .orb-1 { width: 250px; height: 250px; }
  .orb-2 { width: 200px; height: 200px; }
  .orb-3 { width: 150px; height: 150px; }
}
</style>
