<template>
    <div>
        <form @submit.prevent="resetPassword">
            <div class="form-group">
                <label>邮箱</label>
                <input class="form-control" type="email" v-model="formData.email"   required>
            </div>
           
            <div class="actions">
                <input type="submit" class="btn btn-primary" value="提交">
                <a href="#" class="returnSign" @click="returnSign">返回登录</a>
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

    export default{
        name: 'FindPassword',
        data(){
            return {
                formData:{
                    email:'',
                },
                errorMessage:''
            }
        },
        methods:{
            returnSign(){
                this.$emit('returnSignIn')
            },
            resetPassword(){
                let email = this.formData.email;
                if (this.isEmail(this.formData.email) === false && this.formData.email !== "") {
                    this.errorMessage = '请输入正确的邮箱'
                    this.formData.email = ""
                    this.$nextTick(() => {
                    this.$refs.errMsg.style.display = 'block'
                })
                    return
                }
                AV.User.requestPasswordReset(email).then((res)=>{
                    alert('重置成功，请到邮箱修改密码')
                    this.$emit('resetSuccess')
                },(error)=>{
                    alert(error)
                })
            },  
   

            isEmail(str) {
                return /^\w+@\w+\.\w+$/.test(str)
            }, 
                   
        }
    }
</script>

<style lang="scss" scoped>
    .form-group{
        margin-top: 40px;
        label{
            font-size: 16px;
        }
    }
    .actions{
        margin-top: 30px;
        .returnSign{
            margin-left: 30px;
        }
        .alert-danger{
            margin-top: 30px;
            display: none;
        }
    }
    
</style>