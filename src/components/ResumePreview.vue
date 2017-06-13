<template>
    <div id="resumePreview">
        <button class="btn btn-info" @click="save">保存</button>
        <router-link class="btn btn-success" :to='preview.link'>{{preview.name}}</router-link>
        <section class="profile" data-name="profile" v-if="resume.profile && resume.profile.name">
            <h2>
                {{resume.profile.name}}
            </h2>
            <div class="profession">
                <h3>{{resume.profile.title}}</h3>
                <div class="city">
                    <span>{{resume.profile.city}}</span>
                    <span>{{resume.profile.birthday}}</span>
                </div>
            </div>
        </section>
        <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
            <section data-name="education" v-if="resume.education && resume.education.length>0">
                <h3 class="item-title">毕业院校</h3>
                <ol class="list-group">
                    <transition-group enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
                        <li class="list-group-item" v-for="item in resume.education" :key="item">
                            <h4>{{item.school}}
                                <span v-show="item.details">-{{item.details}}</span>
                            </h4>
                        </li>
                    </transition-group>
                </ol>
            </section>
        </transition>
        <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
            <section data-name="projects" v-show="resume.projects && resume.projects.length>0">
                <h3>项目经历</h3>
                <ol class="list-group">
                    <transition-group enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
                        <li class="list-group-item" v-for="item in resume.projects" :key="item">
                            <h3>{{item.name}}</h3>
                            <p v-show="item.details">{{item.details}}</p>
                        </li>
                    </transition-group>
                </ol>
            </section>
        </transition>
        <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
            <section data-name="workHistory" v-if="resume.workHistory && resume.workHistory.length>0">
                <h3>工作经历</h3>
                <ol class="list-group">
                    <transition-group enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
                        <li class="list-group-item" v-for="item in resume.workHistory" :key="item">
                            <h3>{{item.company}}</h3>
                            <p v-show="item.details">{{item.details}}</p>
                        </li>
                    </transition-group>
                </ol>
            </section>
        </transition>
    
        <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
            <section data-name="awards" v-if="resume.awards && resume.awards.length>0">
                <h3>获奖情况</h3>
                <ol class="list-group">
                    <transition-group enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
                        <li class="list-group-item" v-for="item in resume.awards" :key="item">
                            <h3>{{item.name}}</h3>
                            <p v-show="item.details">{{item.details}}</p>
                        </li>
                    </transition-group>
                </ol>
            </section>
        </transition>
    
        <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
            <section data-name="contacts" v-if="resume.contacts && resume.contacts.length>0">
                <h3>联系方式</h3>
                <table>
                    <tr v-for="item in resume.contacts">
                        <td>{{item.contact}}</td>
                        <td v-show="item.content">{{item.content}}</td>
                    </tr>
                </table>
            </section>
        </transition>
    
    </div>
</template>

<script>
export default {
    name: 'ResumePreview',
    props: {
        preview: {
            type: Object,
            default() {
                return {
                    name: '预览',
                    link: '/preview'
                }
            }
        }
    },

    computed: {
        resume() {
            return this.$store.state.resume
        }
    },
    methods: {
        save() {
            this.$store.dispatch('saveResume')
        }
    }
}
</script>

<style lang="scss" scoped>
#resumePreview {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
    padding: 2em;
    color: #333;
    overflow: auto;
    line-height: 1.2;
}

* {
    box-sizing: border-box;
    font-variant: normal;
    font-weight: normal;
}

ol {
    list-style: none;
}

section+section {
    margin-top: 1.5em;
}

p {
    white-space: pre-line;
}

section {
    >h3:first-child {
        background: #ddd;
        display: inline-block;
        padding: .3em;
        margin-top: .3em;
        border-radius: 0.3em;
    }
}

section[data-name="profile"] {
    >h2 {
        display: inline-block;
        vertical-align: top;
        margin: .3em 0;
        font-size: 3em;
    }
    >.profession {
        display: inline-block;
        vertical-align: top;
        margin-left: 2em;
        margin-top: 0.9em;
        h3 {
            margin: 0;
        }
        .city {
            margin-top: 0.8em;
            font-size: 16px;
            span {
                margin-right: 1em;
            }
        }
    }
}

section[data-name="workHistory"],
section[data-name="projects"],
section[data-name="awards"] {
    li+li {
        margin-top: 1em;
    }
    li {
        h3 {
            border-bottom: 1px solid #999;
            padding-bottom: .3em;
            margin-bottom: .3em;
            margin-top: .3em;
        }
    }
}

section[data-name="education"] {
    li {
        line-height: 1.5;
    }
    h4 {
        font-weight: bold;
    }
}

section[data-name="contacts"] {
    font-size: 1.2em;
    td:first-child {
        padding-right: 1em;
    }
}
</style>