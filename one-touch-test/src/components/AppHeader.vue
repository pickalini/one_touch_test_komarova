<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isMenuOpen = ref(false)
function onBuyClick() {
  alert('Кнопка работает')
}
function openMenu() {
  isMenuOpen.value = true
}

function closeMenu() {
  isMenuOpen.value = false
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function onKeydown(e) {
  if (e.key === 'Escape') closeMenu()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="app-header">
    <div class="app-header__left">
      <img class="app-header__logo" src="@/assets/images/logo.svg" alt="Olympians Books" />
    </div>

    <button
      class="app-header__center app-header__btn"
      type="button"
      aria-label="Открыть меню"
      :aria-expanded="isMenuOpen"
      @click="toggleMenu"
    >
      <img
        class="app-header__icon app-header__icon--menu"
        src="@/assets/icons/arrow-down.svg"
        alt="иконка открыть меню"
        :class="{ 'app-header__icon--rotated': isMenuOpen }"
      />
    </button>

    <button
      class="app-header__right app-header__btn"
      type="button"
      aria-label="Корзина"
      @click="onBuyClick"
    >
      <img class="app-header__icon" src="@/assets/icons/shop.svg" alt="иконка корзины" />
    </button>

    <teleport to="body">
      <div v-if="isMenuOpen" class="menu-overlay" @click.self="closeMenu">
        <nav class="menu-panel" aria-label="Меню">
          <img
            class="menu-panel__arrow"
            src="@/assets/icons/arrow-up-black.svg"
            alt="закрыть навигацию"
            @click.self="closeMenu"
          />

          <div class="menu-panel__nav">
            <a class="menu-panel__link" href="#home" @click="closeMenu">Главная</a>
            <a class="menu-panel__link" href="#catalog" @click="closeMenu">Каталог</a>
            <a class="menu-panel__link" href="#cart" @click="closeMenu">Корзина</a>
          </div>
        </nav>
      </div>
    </teleport>
  </header>
</template>

<style scoped>
.app-header {
  height: calc(100px * var(--scale));
  padding-inline: var(--page-gutter);

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding-top: 10px;
}

.app-header__left {
  justify-self: start;
}

.app-header__center {
  justify-self: center;
}

.app-header__right {
  justify-self: end;
}

.app-header__logo {
  display: block;
  height: calc(60px * var(--scale));
  width: auto;
}

.app-header__btn {
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  line-height: 0;
}

.app-header__icon {
  display: block;
  width: calc(64px * var(--scale));
  height: auto;
}

.app-header__icon--rotated {
  transform: rotate(180deg);
  transition: transform 220ms ease;
}

.app-header__icon--menu {
  transition: transform 220ms ease;
}

@media (max-width: 640px) {
  .app-header__logo {
    height: 24px;
  }

  .app-header__center .app-header__icon {
    width: 40px;
    height: auto;
  }

  .app-header__right .app-header__icon {
    width: auto;
    height: 40px;
  }
}
</style>

<style>
.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: transparent;
}
.menu-panel {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  background: #fff;
  width: 420px;
  height: 460px;
  padding-top: 40px;
  padding-bottom: 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: menuSlideDown 220ms ease forwards;
}

.menu-panel__arrow {
  width: 56px;
  height: auto;
  display: block;
}

.menu-panel__nav {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70px;
}

.menu-panel__link {
  font-family: 'Forum', serif;
  color: #000;
  text-decoration: none;
  font-size: 30px;
  line-height: 1;
}

@media (max-width: 1024px) {
  .menu-panel {
    width: 340px;
    height: 330px;
  }
  .menu-panel__nav {
    gap: 55px;
    margin-top: 20px;
  }
}

@media (max-width: 640px) {
  .menu-panel {
    width: 320px;
    height: 330px;
  }
}

@keyframes menuSlideDown {
  from {
    transform: translateX(-50%) translateY(-18px);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}
</style>
