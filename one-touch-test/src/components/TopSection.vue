<script setup>
import AppHeader from '@/components/AppHeader.vue'
function onBuyClick() {
  alert('Кнопка работает')
}
</script>

<template>
  <section class="top-section" id="home">
    <AppHeader />

    <div class="top-section__content">
      <h1 class="top-section__title">КНИГИ, КОТОРЫЕ ВОЗНЕСУТ ВАС НА ОЛИМП</h1>

      <button class="top-section__btn" type="button" @click="onBuyClick">УЗНАТЬ БОЛЬШЕ</button>
    </div>
  </section>
</template>

<style scoped>
.top-section {
  background-image: url('@/assets/images/background.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 940px;
}

.top-section__content {
  padding-inline: var(--page-gutter);
  padding-bottom: calc(256px * var(--scale));
  padding-top: calc(120px * var(--scale));
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  max-height: calc(720px * var(--scale));
  gap: calc(100px * var(--scale));
  width: 56%;
}

.top-section__title {
  font-size: clamp(36px, calc(80px * var(--scale)), 120px);
}

.top-section__btn {
  padding: calc(20px * var(--scale)) calc(40px * var(--scale));
  background: transparent;
  border: calc(3px * var(--scale)) solid #fff;
  cursor: pointer;
  font-size: clamp(24px, calc(42px * var(--scale)), 42px);
  font-family: 'Forum', serif;
  font-weight: 400;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: 0.07em;

  color: #fff;
  font-weight: 300;
}
@media (max-width: 768px) {
  .top-section {
    min-height: 820px;
  }

  .top-section__content {
    width: 54%;
  }
}

@media (max-width: 640px) {
  .top-section {
    min-height: 590px;
    background-position: calc(50% - 60px) center;
  }
}
@media (max-width: 392px) {
  .top-section__content {
    width: 66%;
  }
}
</style>
