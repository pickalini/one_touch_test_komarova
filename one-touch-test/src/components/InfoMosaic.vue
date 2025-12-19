<script setup></script>

<template>
  <section class="info-mosaic">
    <div class="info-mosaic__inner">
      <div class="info-mosaic__cell info-mosaic__cell--about info-mosaic__cell--blue">
        <h2 class="info-mosaic__title">О НАС</h2>
        <p class="info-mosaic__text">
          Книжное наследие от мыслителей Древней Греции и до людей современности. Это не просто
          магазин, а настоящий клуб любителей книги, который объединяет в своем культурном
          пространстве людей самых разных интересов.
        </p>
      </div>

      <div class="info-mosaic__cell info-mosaic__cell--book">
        <img class="info-mosaic__img" src="@/assets/images/photo-book.png" alt="" />
      </div>

      <div class="info-mosaic__cell info-mosaic__cell--harmony info-mosaic__cell--blue">
        <h2 class="info-mosaic__title">ГАРМОНИЯ</h2>
        <p class="info-mosaic__text">
          Наш проект «Гармония» объединяет читателей и авторов в реальности и в интернете. Каждую
          неделю проводятся встречи онлайн и вживую. Из наших регулярных рубрик вы узнаете много
          нового о книгах и писателях.
        </p>
      </div>

      <div class="info-mosaic__cell info-mosaic__cell--statue">
        <img class="info-mosaic__img" src="@/assets/images/photo-statue.png" alt="" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.info-mosaic {
  padding-inline: var(--page-gutter);
  padding-block: calc(70px * var(--scale));
}

.info-mosaic__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'book about'
    'harmony statue';
}

.info-mosaic__cell--book {
  grid-area: book;
}
.info-mosaic__cell--about {
  grid-area: about;
}
.info-mosaic__cell--harmony {
  grid-area: harmony;
}
.info-mosaic__cell--statue {
  grid-area: statue;
}

.info-mosaic__cell {
  max-width: calc(650px * var(--scale));
  overflow: hidden;
}

.info-mosaic__cell--blue {
  background: #1596c1;
  color: #fff;
  padding: calc(60px * var(--scale)) calc(120px * var(--scale));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: calc(40px * var(--scale));
}

.info-mosaic__title {
  font-size: clamp(32px, calc(64px * var(--scale)), 64px);
  text-align: center;
}

.info-mosaic__text {
  margin: 0;
  font-size: clamp(16px, calc(24px * var(--scale)), 24px);
  text-align: center;
}

.info-mosaic__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 645px) {
  .info-mosaic__inner {
    --tile-height: 380px;
    display: flex;
    flex-direction: column;
    padding-inline: var(--page-gutter);
  }

  .info-mosaic__cell {
    max-width: none;
    height: var(--tile-height);
    box-sizing: border-box;
    overflow: hidden;
  }
  .info-mosaic__cell--blue {
    padding: 60px;
    justify-content: center;
  }
  .info-mosaic__img {
    width: 100%;
    height: var(--tile-height);
    object-fit: cover;
    display: block;
  }
  .info-mosaic {
    padding-inline: 0px;
  }
}
@media (max-width: 425px) {
  .info-mosaic__cell--blue {
    padding: 60px 90px;

    justify-content: space-between;
  }
  .info-mosaic__inner {
    --tile-height: 500px;
    padding-inline: var(--page-gutter);
  }
}
@media (max-width: 377px) {
  .info-mosaic__cell--blue {
    padding: 60px 30px;
  }
}
</style>
