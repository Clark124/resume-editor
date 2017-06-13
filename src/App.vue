<template>
  <div>
    <div v-show="!hidden">
      <transition enter-active-class="animated fadeIn">
        <router-view></router-view>
      </transition>
    </div>
    <RingLoader :loading="loading" :color="color" :size="size" v-if="hidden"></RingLoader>
    <p class="loadText" v-if="hidden">loading...</p>
  </div>
</template>

<script>
import 'normalize.css/normalize.css'
import './assets/reset.css'


import icons from './assets/icons'
import './assets/ui.scss'

import AV from './lib/leancloud'
import getAVUser from './lib/getAVUser'

import RingLoader from 'vue-spinner/src/RingLoader.vue'
document.body.insertAdjacentHTML('afterbegin', icons)

export default {
  name: 'app',
  data() {
    return {
      hidden: true,
      color: '#03a9f4',
      size: '150px',
      loading: true,
    }
  },
  mounted() {
    let _this = this
    setTimeout(function () {
      _this.hidden = false
    }, 3000)
    this.loadTop = window.screen.height * 0.28
  },
  created() {
    this.$store.commit('initState');
    let resume = localStorage.getItem('resume');
    if (resume) {
      this.$store.commit('setResume', JSON.parse(resume))
    }
    let user = getAVUser();
    // console.log(user)
    // this.$store.commit('setResumeId',{id:getAVUser().id})
    if (user) {
      this.$store.dispatch('fetchResume');
      this.$store.state.user.id = user.id;
      this.$store.state.user.username = user.username
    };
  },
  components: {
    RingLoader
  }
}

</script>

<style lang="scss" scoped>
.v-spinner {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-55%, -50%)
}

.loadText {
  position: fixed;
  left: 50%;
  top: 38%;
  transform: translate(-50%, -50%);
  font-size: 20px;
}
</style>
