<template>
    <div>
        <form @submit.prevent="signIn">
            <div class="from-group">
                <label>用户名</label>
                <input class="form-control" type="text" v-model="formData.username" required>
            </div>
            <div class="from-group">
                <label>密码</label>
                <input class="form-control" type="password" v-model="formData.password" required>
            </div>
            <div class="actions">
                <input type="submit" class="btn btn-primary" value="提交">
                <a href="#" class="findPassword" @click="findPassword">找回密码</a>
                <div class="alert alert-danger alert-dismissible" role="alert" ref="errMsg">
                    <strong>{{errorMessage}}</strong>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import AV from '../lib/leancloud'
import getErrorMessage from '../lib/getErrorMessage'
import getAVUser from '../lib/getAVUser'

export default {
    name: 'SignInForm',
    data() {
        return {
            formData: {
                username: '',
                password: ''
            },
            errorMessage: ''
        }
    },
    methods: {
        findPassword() {
            this.$emit('findPassword')
        },
        signIn() {
            let { username, password } = this.formData;
            AV.User.logIn(username, password).then(() => {
                this.$emit('successLogin', getAVUser())
            }, (error) => {
                this.errorMessage = getErrorMessage(error)
                this.$nextTick(() => {
                    this.$refs.errMsg.style.display = 'block'
                })
            })
        },

    }
}
</script>

<style lang="scss" scoped>
.from-group {
    margin-top: 20px;
    label {
        font-size: 16px;
    }
}

.actions {
    margin-top: 30px;
    .findPassword {
        margin-left: 30px;
    }
    .alert-danger {
        margin-top: 30px;
        display: none;
    }
}
</style>