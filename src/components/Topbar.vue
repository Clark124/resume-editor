<template>
    <div id="topbar">
        <div class="wrapper">
            <span class="logo">简历编辑器</span>
            <div class="actions">
                <div class="userActions" v-if="this.$store.state.user.id">
                    <span class="welcome">你好，{{user.username}}</span>
                    <a href="#" class="btn btn-info" @click.prevent="signOut">登出</a>
                </div>
                <div class="userActions" v-else>
                    <button class="btn btn-info" @click="signUpDialogVisible=true">注册</button>
                    <button class="btn btn-default" @click.prevent="signInDialogVisible=true">登录</button>
                </div>
    
                <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible=false">
                    <SignUpForm @success="signUp($event)" />
                </MyDialog>
    
                <MyDialog title="登录" :visible="signInDialogVisible" @close="signInDialogVisible=false">
                    <SignInForm @successLogin="signIn($event)" @findPassword="showResetPassword" />
                </MyDialog>
    
                <MyDialog title="重置密码" :visible="resetPasswordVisible" @close="resetPasswordVisible=false">
                    <FindPassword @returnSignIn="returnSignIn" @resetSuccess="returnSignIn" @error="showerror" />
                </MyDialog>
    
            </div>
        </div>
    </div>
</template>

<script>
import MyDialog from './MyDialog'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import FindPassword from './FindPassword'
import AV from '../lib/leancloud'

export default {
    name: 'Topbar',
    data() {
        return {
            signUpDialogVisible: false,
            signInDialogVisible: false,
            resetPasswordVisible: false
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        // logined(){
        //     console.log(this.user.id)
        //     return this.user.id
        // }
    },
    components: {
        MyDialog, SignUpForm, SignInForm, FindPassword
    },
    methods: {
        showerror(error) {
            console.log(error)
        },
        showResetPassword() {
            this.resetPasswordVisible = true
            this.signInDialogVisible = false
        },
        returnSignIn() {
            this.resetPasswordVisible = false
            this.signInDialogVisible = true
        },
        signOut() {
            AV.User.logOut()
            this.$store.commit('removeUser')
        },
        signUp(user) {
            this.signUpDialogVisible = false
            this.signInDialogVisible = false
            this.$store.commit('setUser', user)
        },
        signIn(user) {

            this.signUpDialogVisible = false
            this.signInDialogVisible = false
            this.$store.commit('setUser', user)
            this.$store.dispatch('fetchResume')
        },
        restoreResumeFromLocalStorage() {
            let resume = localStorage.getItem('resume')
            if (resume) {
                this.$store.commit('setResume', JSON.parse(resume))
            }
        },



    }
}
</script>

<style scoped lang="scss">
#topbar {
    background: #5e60c5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
    >.wrapper {
        min-width: 1024px;
        max-width: 1440px;
        margin: 0 auto;
        height: 64px;
    }
    >.wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
    }
    .logo {
        font-size: 24px;
        color: #fff;
    }
}

.actions {
    display: flex;
    .userActions {

        .welcome {
            margin-right: .5em;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
        }
    }
}
</style>