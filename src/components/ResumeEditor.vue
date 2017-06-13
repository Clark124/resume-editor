<template>
    <div id="resumeEditor">
       <nav>
           <ol>              
               <li v-for="(item,index) in resumeConfig"
               :class="{active: item.field === selected}"
               @click="selected = item.field"
               >
               <svg class="icon">
                   <use :xlink:href="`#icon-${item.icon}`"></use>
               </svg>
               </li>            
           </ol>
       </nav>
       <ol class="panels">
          <transition-group enter-active-class="animated fadeIn">
           <li v-for="item in resumeConfig" v-show="item.field === selected" :key="item">
               <div v-if="item.type==='array'">
                   <!--<h2>{{item.field}}</h2>-->
                   <h3>{{$t(`resume.${item.field}._`)}}</h3>
                   <transition-group enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight" >
                   <div class="subitem" v-for="(subitem,i) in resume[item.field]" :key="item">
                       <button class="btn btn-warning btn-sm" @click="removeResumeSubField(item.field,i)">删除</button>
                       <div class="form-group" v-for="(value,key) in subitem">
                           <!--<label> {{key}} </label>-->
                           <label> {{$t(`resume.${item.field}.${key}`)}} </label>
                           <input type="text" class="form-control" :value="value" @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)">
                       </div>
                       <hr>
                   </div>
                   </transition-group>
                   <button class="btn btn-success" @click="addResumeSubfield(item.field)">新增</button>                  
               </div>
               <div v-else class="form-group" v-for="(value,key) in resume[item.field]">
                   <!--<label>{{key}}</label>-->
                   <label> {{$t(`resume.profile.${key}`)}} </label>
                   <input type="text" class="form-control" :value="value" @input="changeResumeField(`${item.field}.${key}`,$event.target.value)">
               </div>
           </li>
           </transition-group> 
       </ol>
    </div>
</template>

<script>
    export default{
        name: 'ResumeEditor',
        computed:{
            selected:{
                get(){
                    return this.$store.state.selected
                },
                set(value){
                    return this.$store.commit('switchTab',value)
                }
            },
            resume(){
                return this.$store.state.resume
            },
            resumeConfig(){
                return this.$store.state.resumeConfig
            }
        },
        methods:{
           changeResumeField(path,value){
               this.$store.commit('updateResume',{
                   path,
                   value
               })
           },
           addResumeSubfield(field){
            this.$store.commit('addResumeSubfield',{field})
           
           },
           removeResumeSubField(field,index){
               this.$store.commit('removeResumeSubfield',{field,index})
           }
        }
    }
</script>

<style lang="scss" scoped>
    #resumeEditor{
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
        display: flex;
        flex-direction: row;
        overflow: auto;
    }
    #resumeEditor> nav{
        width: 80px;
        background: #12a8d4;
        color: white;
    }
    #resumeEditor> nav>ol>li{
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 16px;
        margin-bottom: 16px;
        &.active{
            background: white;
            color: black
        }
    }

    ol{
        list-style: none;
    }
    .panels{
        flex-grow: 1;
     }
     .panels li {
            padding: 24px;
            h3{
                margin-bottom:24px;
            }
            .form-group{
                margin-bottom: 30px;
                label{
                    font-size: 16px;
                }
            }
        }
        
    svg.icon{
        width: 24px;
        height: 24px;
    }

    .resumeField>label{           
        display: block;
    }
    .resumeField>input[type=text]{
        margin: 16px 0;
        border: 1px solid #ddd;
        box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.25);
        width: 100%;
        height: 40px;
        padding: 0 8px;
        font-size: 100%;
    }
    hr{
        border:none;
        border-top:1px solid #ddd;
        margin: 24px 0;
    }
    .panels .subitem{
        position: relative;
        .btn-warning{
            position: absolute;
            right: 0;
            top: -5px;
        }
    }
   
</style>