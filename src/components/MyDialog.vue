<template>
    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <div class="dialogWrapper" v-show="visible">
            <div class="dialog">
                <header>
                    <h4>{{title}}</h4>
                    <span class="close glyphicon glyphicon-remove" @click="close"></span>
                </header>
                <main>
                    <slot></slot>
                </main>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'MyDialog',
    props: ['title', 'visible'],
    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>

<style scoped lang="scss">
.dialogWrapper {
    position: fixed;
    z-index: 100;
    background: hsla(0, 0%, 0%, 0.25);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog {

    background: #f5f8db;
    background-size: cover;
    border-radius: 0.5em;
    min-height: 30em;
    min-width: 22em;
    >header {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        h4 {
            flex: 1;
            text-align: center;
            font-weight: bold;
            font-size: 20px;
        }
        span {
            cursor: pointer;
            line-height: 42px;
        }
    }
    >main {
        padding: 0 16px;
    }
}
</style>