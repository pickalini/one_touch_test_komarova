<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import book1Img from '@/assets/images/book-1.png'
import book2Img from '@/assets/images/book-2.png'
import book3Img from '@/assets/images/book-3.png'

import arrowLeft from '@/assets/icons/arrow-left.svg'
function onBuyClick() {
  alert('Кнопка работает')
}

const items = ref([
  {
    id: 1,
    img: book1Img,
    title: 'Ж. Верн, “Двадцать тысяч лье под водой”',
    genre: 'Приключения',
    price: '168 р.',
  },
  {
    id: 2,
    img: book2Img,
    title: 'Н. Кун, “Легенды и мифы Древней Греции”',
    genre: 'Эпос и фольклор',
    price: '174 р.',
  },
  { id: 3, img: book3Img, title: 'Гомер, “Илиада”', genre: 'Эпос и фольклор', price: '155 р.' },
])

const CLONES = 3

const extended = computed(() => {
  const arr = items.value
  const n = arr.length
  if (n === 0) return []

  const left = arr.slice(-CLONES)
  const right = arr.slice(0, CLONES)

  return [...left, ...arr, ...right]
})

const active = ref(CLONES)

const isAnimating = ref(true)
const isLocked = ref(false)

const trackRef = ref(null)
const stepPx = ref(0)

function measure() {
  const track = trackRef.value
  if (!track) return

  const firstSlide = track.querySelector('.hot-slider__slide')
  if (!firstSlide) return

  const slideW = firstSlide.getBoundingClientRect().width
  const styles = window.getComputedStyle(track)
  const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0

  stepPx.value = slideW + gap
}

function applyTransform() {
  const track = trackRef.value
  if (!track) return
  track.style.transition = isAnimating.value ? 'transform 350ms ease' : 'none'
  track.style.transform = `translateX(-${active.value * stepPx.value}px)`
}

function jumpTo(index) {
  const track = trackRef.value
  if (!track) return

  isAnimating.value = false
  active.value = index
  applyTransform()

  void track.offsetHeight

  isAnimating.value = true
}

function goNext() {
  if (isLocked.value || extended.value.length === 0) return
  isLocked.value = true
  active.value += 1
  applyTransform()
}

function goPrev() {
  if (isLocked.value || extended.value.length === 0) return
  isLocked.value = true
  active.value -= 1
  applyTransform()
}

function goToDot(i) {
  if (isLocked.value) return
  isLocked.value = true
  active.value = CLONES + i
  applyTransform()
}

const activeDot = computed(() => {
  const n = items.value.length
  if (n === 0) return 0

  const real = (active.value - CLONES) % n
  return (real + n) % n
})

function onTransitionEnd() {
  const n = items.value.length
  if (n === 0) return

  if (active.value < CLONES) {
    jumpTo(active.value + n)
  }

  if (active.value >= CLONES + n) {
    jumpTo(active.value - n)
  }

  isLocked.value = false
}

function onResize() {
  measure()
  applyTransform()
}

onMounted(async () => {
  await nextTick()
  measure()
  applyTransform()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <section class="hot-slider">
    <h2 class="hot-slider__title" id="catalog">ГОРЯЧИЕ НОВИНКИ</h2>

    <div class="hot-slider__viewport" ref="viewportRef">
      <div class="hot-slider__track" ref="trackRef" @transitionend="onTransitionEnd">
        <article
          v-for="(book, idx) in extended"
          :key="`${book.id}-${idx}`"
          class="hot-slider__slide"
        >
          <div class="hot-card">
            <img class="hot-card__img" :src="book.img" alt="" />

            <p class="hot-card__name">{{ book.title }}</p>
            <p class="hot-card__genre">{{ book.genre }}</p>

            <div class="hot-card__bottom">
              <p class="hot-card__price">{{ book.price }}</p>
              <button class="hot-card__buy" type="button" @click="onBuyClick">КУПИТЬ</button>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div class="hot-slider__controls">
      <button
        class="hot-slider__arrow hot-slider__arrow--left"
        type="button"
        aria-label="Назад"
        :disabled="isLocked"
        @click="goPrev"
      >
        <img class="hot-slider__arrow-img" :src="arrowLeft" alt="" />
      </button>

      <div class="hot-slider__dots" aria-label="Пагинация">
        <button
          v-for="i in items.length"
          :key="i"
          class="hot-slider__dot"
          type="button"
          :class="{ 'hot-slider__dot--active': activeDot === i - 1 }"
          :aria-label="`Слайд ${i}`"
          :disabled="isLocked"
          @click="goToDot(i - 1)"
        />
      </div>

      <button
        class="hot-slider__arrow hot-slider__arrow--right"
        type="button"
        aria-label="Вперед"
        :disabled="isLocked"
        @click="goNext"
      >
        <img class="hot-slider__arrow-img hot-slider__arrow-img--flip" :src="arrowLeft" alt="" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.hot-slider {
  padding-inline: var(--page-gutter);
  padding-top: 110px;
  padding-bottom: 110px;
  text-align: center;
}
.hot-slider p {
  color: #000;
}
.hot-slider__title {
  margin: 0 0 70px;
  color: #000;
  font-size: clamp(32px, calc(64px * var(--scale)), 64px);
}

.hot-slider {
  --card-w: 420px;
  --card-h: 650px;
  --gap: 20px;
  --card-pad: 34px;
}

@media (max-width: 1024px) {
  .hot-slider {
    --card-w: 340px;
    --card-h: 585px;
    --gap: 0px;
    --card-pad: 28px;

    padding-top: 90px;
    padding-bottom: 90px;
  }
}

@media (max-width: 640px) {
  .hot-slider {
    --card-w: 290px;
    --card-h: 500px;
    --gap: 0px;
    --card-pad: 22px;

    padding-top: 70px;
    padding-bottom: 70px;
  }
}

.hot-slider__viewport {
  overflow: hidden;
  margin: 0 auto;

  width: calc(var(--card-w) * 3 + var(--gap) * 2);
  max-width: 100%;
}

@media (max-width: 1024px) {
  .hot-slider__viewport {
    width: var(--card-w);
  }
}

.hot-slider__track {
  display: flex;
  column-gap: var(--gap);
  will-change: transform;
}

.hot-slider__slide {
  flex: 0 0 var(--card-w);
}

.hot-card {
  width: var(--card-w);
  height: var(--card-h);
  border: 3px solid #000;
  padding: var(--card-pad);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.hot-card__img {
  width: 200px;
  height: 300px;
  object-fit: contain;
  display: block;
}

@media (max-width: 1024px) {
  .hot-card__img {
    width: 200px;
    height: 300px;
  }
}

@media (max-width: 640px) {
  .hot-card__img {
    width: 132px;
    height: 200px;
  }
}

.hot-card__name {
  margin: 50px 0 0;

  font-size: clamp(18px, calc(24px * var(--scale)), 24px);
  line-height: 1.35;
}

.hot-card__genre {
  margin: 30px 0 0;
  font-size: clamp(16px, calc(18px * var(--scale)), 18px);
  line-height: 1.35;
}

.hot-card__bottom {
  margin-top: auto;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hot-card__price {
  margin: 0;
  font-size: clamp(22px, calc(30px * var(--scale)), 30px);
}

.hot-card__buy {
  font-size: clamp(24px, calc(30px * var(--scale)), 30px);
  font-family: 'Forum', serif;
  border: 3px solid #000;
  background: transparent;
  padding: 10px 22px;
  cursor: pointer;
}

.hot-slider__controls {
  margin-top: 70px;
  display: inline-flex;
  align-items: center;
  gap: 70px;
}

.hot-slider__arrow {
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0;
  line-height: 0;
}

.hot-slider__arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.hot-slider__arrow-img {
  height: 50px;

  display: block;
}

.hot-slider__arrow-img--flip {
  transform: scaleX(-1);
}

.hot-slider__dots {
  display: inline-flex;
  align-items: center;
  gap: 18px;
}

.hot-slider__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #000;
  background: transparent;
  padding: 0;
  cursor: pointer;
}
.hot-slider__dots {
  display: inline-flex;
  align-items: center;
  gap: 60px;
}
.hot-slider__dot {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #000;
  background: transparent;
  padding: 0;
  cursor: pointer;
}
.hot-slider__dot--active {
  background: #000;
}
@media (max-width: 1024px) {
  .hot-slider__dots {
    display: none;
  }

  .hot-slider__controls {
    margin-top: 0;
    display: flex;
    margin-inline: auto;

    position: relative;
    top: calc(-1 * (var(--card-h) / 2));
    transform: translateY(-50%);
    justify-content: center;
    gap: 500px;
    pointer-events: none;
  }

  .hot-slider__arrow {
    pointer-events: auto;
  }

  .hot-slider__arrow-img {
    height: 100px;
  }
}

@media (max-width: 640px) {
  .hot-slider__controls {
    position: static;
    transform: none;
    top: auto;
    gap: 0px;
    width: var(--card-w);
    margin-top: 40px;
    justify-content: space-around;
  }

  .hot-slider__arrow-img {
    height: 40px;
  }
}

@media (max-width: 323px) {
  .hot-card {
    width: 288px;
  }
}
</style>
