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
           <li v-for="item in resumeConfig" v-show="item.field === selected">
               <div v-if="item.type==='array'">
                   <h2>{{item.field}}</h2>
                   <div class="subitem" v-for="(subitem,i) in resume[item.field]">
                       <button class="button remove small" @click="removeResumeSubField(item.field,i)">删除</button>
                       <div class="resumeField" v-for="(value,key) in subitem">
                           <label> {{key}} </label>
                           <input type="text" :value="value" @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)">
                       </div>
                       <hr>
                   </div>
                   <button class="button" @click="addResumeSubfield(item.field)">新增</button>                  
               </div>
               <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
                   <label>{{key}}</label>
                   <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`,$event.target.value)">
               </div>
           </li>
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
        background: black;
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
     .panels>li {
            padding: 24px;
            h2{
                margin-bottom:24px;
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
    .panels>li>div{
        position: relative;
        .button.remove{
            position: absolute;
            right: 0;
            top: 0;
        }
    }
   
</style>