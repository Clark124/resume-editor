<template>
  <div>
    <router-view></router-view>
  </div>
  
</template>

<script>
import 'normalize.css/normalize.css'
import './assets/reset.css'


import icons from './assets/icons'
import './assets/ui.scss'

import AV from './lib/leancloud'
import getAVUser from './lib/getAVUser'

document.body.insertAdjacentHTML('afterbegin',icons)

export default {
  name: 'app',
  created(){
    this.$store.commit('initState')
    let resume = localStorage.getItem('resume')
    if(resume){
        this.$store.commit('setResume',JSON.parse(resume))
    }
    let user = getAVUser()
    // console.log(user)
    // this.$store.commit('setResumeId',{id:getAVUser().id})
    if(user){
      this.$store.dispatch('fetchResume')
      this.$store.state.user.id = user.id
      this.$store.state.user.username = user.username
    }
     
    // if(user.id){
    //   console.log(user.id)
    //   this.$store.dispatch('fetchResume').then(()=>{
    //     this.restoreResumeFromLocalStorage()
    //   })
    // }else{
    //   this.restoreResumeFromLocalStorage()
    // }
  },
  methods:{
    
  }
}
  
</script>

<style lang="scss" scoped></style>
