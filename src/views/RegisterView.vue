<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '../store';

const router = useRouter();
const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeTerms = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref('');

const passwordsMatch = computed(() => {
  if (!confirmPassword.value) return true;
  return password.value === confirmPassword.value;
});

const passwordStrength = computed(() => {
  const p = password.value;
  if (!p) return 0;
  let score = 0;
  if (p.length >= 6) score++;
  if (p.length >= 10) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  return Math.min(score, 4);
});

const strengthLabel = computed(() => {
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  return labels[passwordStrength.value];
});

const strengthColor = computed(() => {
  const colors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e'];
  return colors[passwordStrength.value];
});

const handleRegister = () => {
  errorMessage.value = '';

  if (password.value !== confirmPassword.value) {
    return;
  }
  if (!fullName.value || !email.value || !password.value || !agreeTerms.value) {
    errorMessage.value = 'Please fill in all fields';
    return;
  }

  isSubmitting.value = true;
  setTimeout(() => {
    const result = registerUser(fullName.value, email.value, password.value);
    isSubmitting.value = false;

    if (result.success) {
      router.push('/');
    } else {
      errorMessage.value = result.error || 'Registration failed';
    }
  }, 600);
};
</script>

<template>
  <div class="register-page">
    <!-- Animated background orbs -->
    <div class="orb orb-1" aria-hidden="true"></div>
    <div class="orb orb-2" aria-hidden="true"></div>
    <div class="orb orb-3" aria-hidden="true"></div>

    <!-- Card -->
    <div class="register-card" :class="{ submitting: isSubmitting }">
      <!-- Logo / Brand -->
      <div class="brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M19 8v6M22 11h-6"/>
          </svg>
        </div>
        <h1>PriceWise</h1>
      </div>

      <div class="card-header">
        <h2>Create your account</h2>
        <p>Start tracking prices and never miss a deal</p>
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        <!-- Full Name -->
        <div class="input-group" :class="{ filled: fullName }">
          <div class="input-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <input
            v-model="fullName"
            type="text"
            id="reg-fullname"
            required
            placeholder=" "
            autocomplete="name"
          />
          <label for="reg-fullname">Full name</label>
        </div>

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
            id="reg-email"
            required
            placeholder=" "
            autocomplete="email"
          />
          <label for="reg-email">Email address</label>
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
            id="reg-password"
            required
            placeholder=" "
            autocomplete="new-password"
          />
          <label for="reg-password">Password</label>
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

        <!-- Password Strength -->
        <div v-if="password" class="strength-bar">
          <div class="strength-track">
            <div
              v-for="i in 4"
              :key="i"
              class="strength-segment"
              :style="{ background: i <= passwordStrength ? strengthColor : '#e2e8f0' }"
            ></div>
          </div>
          <span class="strength-label" :style="{ color: strengthColor }">{{ strengthLabel }}</span>
        </div>

        <!-- Confirm Password -->
        <div class="input-group" :class="{ filled: confirmPassword, error: !passwordsMatch }">
          <div class="input-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <input
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            id="reg-confirm-password"
            required
            placeholder=" "
            autocomplete="new-password"
          />
          <label for="reg-confirm-password">Confirm password</label>
          <button
            type="button"
            class="toggle-password"
            @click="showConfirmPassword = !showConfirmPassword"
            :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
          >
            <svg v-if="!showConfirmPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          </button>
        </div>

        <p v-if="!passwordsMatch" class="error-text">Passwords do not match</p>

        <!-- Terms -->
        <label class="checkbox-label">
          <input v-model="agreeTerms" type="checkbox" id="reg-terms" required />
          <span class="checkmark"></span>
          <span class="terms-text">
            I agree to the <a href="#" class="link">Terms</a> and <a href="#" class="link">Privacy Policy</a>
          </span>
        </label>

        <!-- Error Message -->
        <div v-if="errorMessage" class="error-banner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Submit -->
        <button type="submit" class="submit-btn" :disabled="isSubmitting || !passwordsMatch">
          <span v-if="!isSubmitting">Create Account</span>
          <span v-else class="spinner"></span>
        </button>
      </form>

      <!-- Footer -->
      <div class="card-footer">
        <p>Already have an account? <router-link to="/login" class="link">Sign in</router-link></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.register-page {
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f0e6ff 0%, #fdf2e9 40%, #e8f4fd 70%, #fef7ed 100%);
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
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
  top: -12%;
  left: -8%;
  animation: float1 9s ease-in-out infinite;
}

.orb-2 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, #f97316, #fb923c);
  bottom: -10%;
  right: -8%;
  animation: float2 11s ease-in-out infinite;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #06b6d4, #22d3ee);
  top: 40%;
  right: 20%;
  animation: float3 13s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, 50px) scale(1.06); }
  66% { transform: translate(-20px, -30px) scale(0.94); }
}

@keyframes float2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-40px, -30px) scale(1.07); }
  66% { transform: translate(25px, 20px) scale(0.93); }
}

@keyframes float3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, -40px) scale(1.12); }
}

/* ─── Card ──────────────────────────────────────────── */
.register-card {
  width: 100%;
  max-width: 460px;
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

.register-card.submitting {
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
  .register-card {
    padding: 2.5rem;
  }
}

/* ─── Brand ──────────────────────────────────────────── */
.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.brand-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(139, 92, 246, 0.35);
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
  margin-bottom: 1.75rem;
}

.card-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.02em;
  margin: 0 0 0.35rem;
}

.card-header p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

/* ─── Form ──────────────────────────────────────────── */
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

/* ─── Input Groups ─────────────────────────────────── */
.input-group {
  position: relative;
}

.input-group input {
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.7);
  font-size: 0.925rem;
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
  border-color: #8b5cf6;
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1), 0 4px 12px rgba(139, 92, 246, 0.08);
  background: #fff;
}

.input-group.error input {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.input-group label {
  position: absolute;
  left: 3rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.925rem;
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
  font-size: 0.72rem;
  font-weight: 600;
  color: #8b5cf6;
  background: white;
  padding: 0 6px;
  border-radius: 4px;
}

.input-icon {
  position: absolute;
  left: 0.85rem;
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
  color: #8b5cf6;
}

.input-group.error .input-icon {
  color: #ef4444;
}

.input-icon svg {
  width: 19px;
  height: 19px;
}

.toggle-password {
  position: absolute;
  right: 0.85rem;
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
  color: #8b5cf6;
}

.toggle-password svg {
  width: 19px;
  height: 19px;
}

/* ─── Password Strength ─────────────────────────────── */
.strength-bar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: -0.3rem;
}

.strength-track {
  display: flex;
  gap: 4px;
  flex: 1;
}

.strength-segment {
  height: 4px;
  flex: 1;
  border-radius: 2px;
  background: #e2e8f0;
  transition: background 0.3s ease;
}

.strength-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.error-text {
  font-size: 0.8rem;
  color: #ef4444;
  margin: -0.4rem 0 0;
  font-weight: 500;
}

/* ─── Checkbox ──────────────────────────────────────── */
.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  margin-top: 0.25rem;
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
  margin-top: 1px;
}

.checkbox-label input:checked + .checkmark {
  background: #8b5cf6;
  border-color: #8b5cf6;
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

.terms-text {
  font-size: 0.82rem;
  color: #64748b;
  line-height: 1.4;
}

.terms-text .link,
.card-footer .link {
  color: #8b5cf6;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s;
}

.terms-text .link:hover,
.card-footer .link:hover {
  color: #7c3aed;
  text-decoration: underline;
}

/* ─── Submit Button ─────────────────────────────────── */
.submit-btn {
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  font-size: 0.975rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  letter-spacing: -0.01em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
  margin-top: 0.25rem;
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #a78bfa, #8b5cf6);
  opacity: 0;
  transition: opacity 0.3s;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(139, 92, 246, 0.4);
}

.submit-btn:hover::before {
  opacity: 1;
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
}

.submit-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
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

:global(.dark) .error-banner {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
}

:global(.dark) .error-banner span {
  color: #fca5a5;
}

/* ─── Footer ───────────────────────────────────────── */
.card-footer {
  text-align: center;
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid #e2e8f0;
}

.card-footer p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

/* ─── Dark Mode ─────────────────────────────────────── */
:global(.dark) .register-page {
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
}

:global(.dark) .orb-1 { opacity: 0.2; }
:global(.dark) .orb-2 { opacity: 0.15; }
:global(.dark) .orb-3 { opacity: 0.1; }

:global(.dark) .register-card {
  background: rgba(30, 41, 59, 0.75);
  border-color: rgba(100, 116, 139, 0.2);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

:global(.dark) .brand h1 {
  background: linear-gradient(135deg, #f1f5f9, #cbd5e1);
  -webkit-background-clip: text;
  background-clip: text;
}

:global(.dark) .card-header h2 { color: #f1f5f9; }
:global(.dark) .card-header p { color: #94a3b8; }

:global(.dark) .input-group input {
  background: rgba(15, 23, 42, 0.6);
  border-color: #334155;
  color: #f1f5f9;
}

:global(.dark) .input-group input:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15), 0 4px 12px rgba(139, 92, 246, 0.1);
  background: rgba(15, 23, 42, 0.8);
}

:global(.dark) .input-group input:focus ~ label,
:global(.dark) .input-group input:not(:placeholder-shown) ~ label {
  background: #1e293b;
}

:global(.dark) .input-group label { color: #64748b; }
:global(.dark) .input-icon { color: #64748b; }
:global(.dark) .terms-text { color: #94a3b8; }
:global(.dark) .checkbox-label { color: #94a3b8; }
:global(.dark) .checkmark { border-color: #475569; }
:global(.dark) .toggle-password { color: #64748b; }
:global(.dark) .toggle-password:hover { color: #a78bfa; }
:global(.dark) .strength-segment { background: #334155; }

:global(.dark) .card-footer { border-top-color: #334155; }
:global(.dark) .card-footer p { color: #94a3b8; }
:global(.dark) .card-footer .link { color: #a78bfa; }
:global(.dark) .terms-text .link { color: #a78bfa; }

/* ─── Mobile ────────────────────────────────────────── */
@media (max-width: 480px) {
  .register-page {
    padding: 1rem;
  }

  .register-card {
    padding: 2rem 1.5rem;
    border-radius: 24px;
  }

  .card-header h2 {
    font-size: 1.3rem;
  }

  .orb-1 { width: 250px; height: 250px; }
  .orb-2 { width: 200px; height: 200px; }
  .orb-3 { width: 150px; height: 150px; }
}
</style>
