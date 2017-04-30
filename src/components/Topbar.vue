<template>
    <div id="topbar">
        <div class="wrapper">
            <span class="logo">Resumer</span>
            <div class="actions">
                <div class="userActions" v-if="this.$store.state.user.id">
                    <span class="welcome">你好，{{user.username}}</span>
                    <a href="#" class="button" @click.prevent="signOut">登出</a>
                </div>
                <div class="userActions" v-else>
                    <a href="#" class="button primary" @click.prevent="signUpDialogVisible=true">注册</a>
                    <a href="#" class="button" @click.prevent="signInDialogVisible=true">登录</a>
                </div>
                <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible=false">
                    <SignUpForm @success="signUp($event)"/>
                </MyDialog>
                <MyDialog title="登录" :visible="signInDialogVisible" @close="signInDialogVisible=false">
                    <SignInForm @successLogin="signIn($event)"/>
                </MyDialog>
            </div>
        </div>
    </div>
</template>

<script>
import MyDialog from './MyDialog'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import AV from '../lib/leancloud'

    export default {
        name: 'Topbar',
        data(){
            return {
                signUpDialogVisible:false,
                signInDialogVisible:false,
            }
        },
        computed:{
            user(){
                return this.$store.state.user
            },
            // logined(){
            //     console.log(this.user.id)
            //     return this.user.id
            // }
        },
        components: {
            MyDialog,SignUpForm,SignInForm
        },
        methods:{
            signOut(){
                AV.User.logOut()
                this.$store.commit('removeUser')
                // window.location.reload()
            },
            signUp(user){
                this.signUpDialogVisible = false
                this.signInDialogVisible = false
                this.$store.commit('setUser',user)
            },
            signIn(user){
                
                this.signUpDialogVisible = false
                this.signInDialogVisible = false
                this.$store.commit('setUser',user)
                this.$store.dispatch('fetchResume')
            },
            restoreResumeFromLocalStorage(){
                let resume = localStorage.getItem('resume')
                if(resume){
                    this.$store.commit('setResume',JSON.parse(resume))
                }
            },

            

        }
    }
</script>

<style scoped lang="scss">
    #topbar{
       background: #fff;
       box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
      >.wrapper{
          min-width: 1024px;
          max-width: 1440px;
          margin: 0 auto;
          height: 64px;
       }
      >.wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
       }
      .logo{
        font-size: 24px;
        color: #000;
        }
 

     }
    .actions {
        display: flex;
        .userActions{

            .welcome{
                margin-right: .5em;
            }
        }
     }
</style>