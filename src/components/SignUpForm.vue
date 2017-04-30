<template>
    <div>
        <form @submit.prevent="signUp">
            <div class="row">
                <label>用户名</label>
                <input type="text" v-model="formData.username" @input="isValidPassword(formData.username)" required>            
            </div>
            <div class="row">
                <label>密码</label>
                <input type="password" v-model="formData.password" required>
            </div>
            <div class="actions">
                <input type="submit" value="提交">
                <span class="errorMessage">{{errorMessage}}</span>
                <span >{{isValid}}</span>
            </div>
        </form>
    </div>
</template>

<script>
    import AV from '../lib/leancloud'
    import getErrorMessage from '../lib/getErrorMessage'
    import getAVUser from '../lib/getAVUser'

    export default{
        name: 'SignUpForm',
        data(){
            return {
                formData:{
                    username:'',
                    password: ''
                },
                errorMessage:'',
                isValid:''
            }
        },
        methods:{
            signUp(){
                let {username,password}=this.formData;
                var user = new AV.User();
                user.setUsername(username);
                user.setPassword(password);
                user.signUp().then(()=>{
                    this.$emit('success',getAVUser())
                    localStorage.setItem('resume',"")
                },(error)=>{
                    this.errorMessage = getErrorMessage(error)
                })
            },
            isValidPassword(str){
                if(str.length<6 || str.length>20 || /\W/.test(str)){
                    console.log("输入错误")
                   this.isValid = '请输入正确的用户名'
                }
                var count = 0;
                if(/[a-z]/g.test(str))  count++;
                if(/[A-Z]/g.test(str))  count++;
                if(/[0-9]/g.test(str))  count++;
                if(/_/g.test(str))  count++;
                if(count >= 2){
                    this.isValid = '用户名有效'
                }
            },

        }
    }
</script>

<style>
    .row{
        margin-bottom: 1em;
        display:flex;
        justify-content: space-between;
    }
    
</style>