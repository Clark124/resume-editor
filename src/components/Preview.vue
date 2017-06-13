<template>
    <div class="preview">
        <div class="container-pre">
            <ResumePreview :preview="preview"/>
        </div>
    </div>
    
</template>

<script>
    import ResumePreview from './ResumePreview'
    export default{
        name: 'Preview',
        data(){
            return{
                preview:{
                    name:'返回',
                    link:'/'
                }
            }
        },
        components:{
            ResumePreview
        }
    }
</script>

<style lang="scss" scoped>
.preview{
    border: 1px solid #fff;
    background: #ccc;
    .container-pre {
        width: 750px;
        margin: 30px auto;
    }
}
    
</style>
