<template>
    <div>
        <form @submit.prevent="signUp">
            <div class="from-group">
                <label for="email" class="">邮箱</label>
                <input class="form-control" type="email" v-model="formData.email" @blur="validateForm" required>
            </div>
            <div class="from-group">
                <label>用户名</label>
                <input class="form-control" type="text" v-model="formData.username" @blur="validateForm" required>
            </div>
            <div class="from-group">
                <label>密码</label>
                <input class="form-control" type="password" v-model="formData.password" @blur="validateForm" required>
            </div>
    
            <div class="actions">
                <input type="submit" value="提交" class="btn btn-primary" role="button">
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
    name: 'SignUpForm',
    data() {
        return {
            formData: {
                email: '',
                username: '',
                password: ''
            },
            errorMessage: '',
            isValid: ''
        }
    },
    methods: {
        signUp() {
            let { email, username, password } = this.formData;
            if (email === "") {
                alert('必须填写邮箱')
                return
            }
            if (username === "") {
                alert('必须填写用户名')
                return
            }
            if (password === "") {
                alert('必须填写密码')
                return
            }
            
            var user = new AV.User();
            user.setUsername(username);
            user.setPassword(password);
            user.setEmail(email)

            user.signUp().then(() => {
                this.$emit('success', getAVUser())
                localStorage.setItem('resume', "")
            }, (error) => {
                this.errorMessage = getErrorMessage(error)
                this.$nextTick(()=>{
                    this.$refs.errMsg.style.display = 'block'
                })
            })
        },
        validateForm() {
            if (this.isEmail(this.formData.email) === false && this.formData.email !== "") {
                this.errorMessage = '请输入正确的邮箱'
                this.formData.email = ""
                this.$nextTick(()=>{
                    this.$refs.errMsg.style.display = 'block'
                })
            }
            if (this.isValidUsername(this.formData.username) === false && this.formData.username !== "") {
                this.errorMessage = '请输入正确的用户名'
                this.formData.username = ""
                this.$nextTick(()=>{
                    this.$refs.errMsg.style.display = 'block'
                })
            }
            if (this.isValidPassword(this.formData.password) === false && this.formData.password !== "") {
                this.errorMessage = '请输入正确的密码'
                this.formData.password = ""
                this.$nextTick(()=>{
                    this.$refs.errMsg.style.display = 'block'
                })
            }
        },

        isEmail(str) {
            return /^\w+@\w+\.\w+$/.test(str)
        },

        isValidUsername(str) {
            return /^\w{6,20}$/.test(str)
        },
        isValidPassword(str) {
            if (str.length < 6 || str.length > 20 || /\W/.test(str)) {
                return false;
            }
            var count = 0;
            if (/[a-z]/g.test(str)) count++;
            if (/[A-Z]/g.test(str)) count++;
            if (/[0-9]/g.test(str)) count++;
            if (/_/g.test(str)) count++;
            if (count >= 2) {
                return true;
            }else{
                return false;
            }
        },

    }
}
</script>

<style lang="scss" scoped>
.row {
    margin-bottom: 1em;
    display: flex;
    justify-content: space-between;
}
.from-group{
    margin-top: 10px;
    label{
        font-size: 16px;
    }
}
.alert-danger{
    display: none;
    margin-top: 20px;
}
.actions .btn{
    margin-top: 10px;
}
</style>