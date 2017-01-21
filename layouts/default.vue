<template>
  <div v-cloak>
    <a href="https://github.com/sunya9/ttg"><img style="position: absolute; top: 0; right: 0; border: 0; z-index: 1" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>
    <div class="container">
      <header>
        <h1><router-link to="/">TwiTokenGetter</a></h1>
        <p>TwiTokenGetterはTwitterのアクセストークン類を取得できるツールです。</p>
        <steps />
      </header>
      <main>
        <nuxt/>
      </main>
      <footer>
        Presented by <a href="https://unsweets.net">&lt;unsweets/&gt;</a>
      </footer>
    </div>
  </div>
</template>

<style>
@import 'milligram-cssnext';
@import '../assets/css/variables.css';

body {
  font-family: var(--font-family);
  font-weight: normal;
  /* Background pattern from subtlepatterns.com */
  background: url(../assets/img/asanoha-400px.png);
}

input[type='text'] {
  background: #fff;
  width: auto;
  max-width: 100%;
}

.container {
  max-width: 96rem;
}

.page-enter-active, .page-leave-active {
  transition: all ease .5s;
  transform-origin: top center;
}

.page-enter, .page-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

</style>

<script>
import steps from '../components/steps.vue'

export default {
  components: {
    steps
  }
}
</script>