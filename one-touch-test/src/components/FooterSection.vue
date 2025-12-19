<script setup></script>

<template>
  <footer class="app-footer">
    <img class="app-footer__logo" src="@/assets/images/logo.svg" alt="Olympians Books" />

    <a class="app-footer__phone" href="tel:+30922040281">+30922040281</a>

    <nav class="app-footer__nav" aria-label="Footer navigation">
      <a class="app-footer__link" href="#">Главная</a>
      <a class="app-footer__link" href="#">Каталог</a>
      <a class="app-footer__link" href="#">Корзина</a>
    </nav>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-block: calc(100px * var(--scale));
  padding-inline: var(--page-gutter);
  padding-block: calc(24px * var(--scale));
  background-color: #1596c1;
  color: #fff;

  display: grid;
  align-items: center;

  grid-template-columns: auto auto 1fr;
  column-gap: calc(120px * var(--scale));
}

.app-footer__logo {
  display: block;
  height: calc(90px * var(--scale));
  width: auto;
}

.app-footer__phone {
  color: #fff;
  font-family: 'Raleway', sans-serif;
  text-decoration: none;
  font-size: clamp(18px, calc(24px * var(--scale)), 24px);
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.app-footer__nav {
  justify-self: end;
  display: flex;
  gap: calc(126px * var(--scale));
}

.app-footer__link {
  color: #fff;
  font-family: 'Raleway', sans-serif;
  text-decoration: none;
  font-size: clamp(18px, calc(24px * var(--scale)), 24px);
  letter-spacing: 0.02em;
}

@media (max-width: 1024px) {
  .app-footer {
    column-gap: calc(60px * var(--scale));
  }
  .app-footer__nav {
    gap: calc(60px * var(--scale));
  }
}

@media (max-width: 640px) {
  .app-footer {
    align-items: start;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'logo nav'
      'phone nav';
    row-gap: calc(120px * var(--scale));
    column-gap: calc(24px * var(--scale));
    padding-inline: var(--page-gutter);
    padding-block: 40px;
    margin-top: 100px;
  }

  .app-footer__logo {
    grid-area: logo;
    height: 50px;
    padding-top: 10px;
  }

  .app-footer__phone {
    grid-area: phone;
    align-self: end;
  }

  .app-footer__nav {
    grid-area: nav;
    justify-self: end;
    display: flex;
    flex-direction: column;
    text-align: right;
    gap: calc(120px * var(--scale));
  }
}
</style>
