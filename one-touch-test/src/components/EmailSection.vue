<script setup>
import { computed, ref } from 'vue'

const email = ref('')
const touched = ref(false)
const errorText = ref('')

const isValidEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))

function onSubmit() {
  touched.value = true
  const v = email.value.trim()

  if (!v) {
    errorText.value = 'Введите email.'
    return
  }

  if (!isValidEmail.value) {
    errorText.value = 'Введите корректный email.'
    return
  }

  errorText.value = ''
  alert('Кнопка работает')

  email.value = ''
  touched.value = false
}
</script>

<template>
  <section class="subscribe">
    <h3 class="subscribe__title">ХОТИТЕ ЗНАТЬ О КНИГАХ ВСЁ?</h3>
    <p class="subscribe__subtitle">Подпишитесь на нашу новостную рассылку</p>

    <form class="subscribe__form" @submit.prevent="onSubmit">
      <label class="subscribe__field">
        <span class="subscribe__sr-only">Email</span>
        <input
          v-model.trim="email"
          class="subscribe__input"
          type="email"
          inputmode="email"
          autocomplete="email"
          placeholder=""
          @blur="touched = true"
        />
      </label>

      <button class="subscribe__btn" type="submit">ОТПРАВИТЬ</button>
    </form>

    <p v-if="touched && errorText" class="subscribe__error">{{ errorText }}</p>
  </section>
</template>

<style scoped>
.subscribe {
  padding-inline: var(--page-gutter);
  padding-block: calc(80px * var(--scale));
  text-align: center;
}

.subscribe__subtitle {
  color: #000;
}

.subscribe__form {
  margin-top: calc(60px * var(--scale));
  display: flex;
  justify-content: center;
  gap: calc(20px * var(--scale));
  margin-inline: auto;
  padding-inline: calc(180px * var(--scale));
}

.subscribe__field {
  flex: 1;
  max-width: calc(620px * var(--scale));
  min-width: 0;
}

.subscribe__input {
  width: 100%;
  max-width: 100%;
  height: 60px;
  box-sizing: border-box;
  border: 3px solid #000;
  padding-inline: calc(14px * var(--scale));
  font-size: clamp(14px, calc(18px * var(--scale)), 18px);
  outline: none;
}

.subscribe__btn {
  padding-inline: calc(70px * var(--scale));
  border: 3px solid #000;
  background: transparent;
  cursor: pointer;
  font-family: 'Forum', serif;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  line-height: 45px;
  font-size: clamp(18px, calc(30px * var(--scale)), 30px);
  color: #000;
}

.subscribe__error {
  margin: calc(14px * var(--scale)) 0 0;
  font-size: clamp(12px, calc(14px * var(--scale)), 14px);
  color: #b00020;
}

.subscribe__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 768px) {
  .subscribe__input,
  .subscribe__btn {
    height: 50px;
  }
}

@media (max-width: 640px) {
  .subscribe {
    overflow-x: hidden;
  }

  .subscribe__form {
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    padding-top: 30px;
    margin-inline: 0;
    max-width: 100%;
    padding-inline: 0px;
  }

  .subscribe__field {
    max-width: none;
  }

  .subscribe__btn {
    padding-inline: 30px;
    align-self: center;
    width: auto;
  }
}
</style>
