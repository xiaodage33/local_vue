<style scoped>
    .wrap {
        width: 1310px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        margin: 0 auto;
        color: white;
        font-size: 14px;
    }

    .svgbox {
        position: relative;
        width: 100%;
        height: 100%;
        background-size: contain;
    }

    .login {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
        /*background: url("../static/img/login/bg.png") no-repeat;*/
        background-size: 100% 100%;
    }

    .top {
        width: 100%;
        height: 44px;
        border-bottom: 1px solid rgba(256, 256, 256, .14);
    }

    .center {
        position: relative;
        /*width: 1366px;*/
        margin: 0 auto;
        height: calc(100% - 45px);
        min-height: 550px;
    }

    .bottom {
        bottom: 0;
        width: 100%;
        padding-bottom: 20px;
        color: white;
        font-size: 12px;
        text-align: center;
        opacity: .7;
    }

    .animation {
        position: relative;
        width: 697px;
        height: 485px;
        margin-left: 100px;
        box-sizing: border-box;
        /*background: url("../static/img/login/pic.png") no-repeat;*/
        background-size: 100% 100%;
    }

    .absolute {
        position: absolute;
    }

    .title {
        /* top: 10%;
        left: 0; */
        text-align: left;
        align-self: flex-start;
        margin-top: 100px;
        color: #ffffff;
        animation: title 800ms linear 0ms;
    }

    @keyframes title {
        0% {
            opacity: 0;
            transform: translate(0, 100px);
        }
        100% {
            opacity: 1;
            transform: translate(0, 0px);
        }
    }

    .title1 {
        font-size: 34px;
        font-weight: 500;
    }

    .title2 {
        width: 50px;
        height: 3px;
        background-color: #f3b944;
        margin: 10px 0;
    }

    .title3 {
        font-size: 26px;
        font-weight: 300;
    }

    /*云*/
    /* .cloud {
        top: 160px;
        left: 225px;
        width: 135px;
        height: 135px;
        background: url(../static/img/login/cloudy.png) no-repeat center;
        background-size: 100% 100%;
        animation: yun-guang 1600ms linear infinite alternate 0ms;
    } */
    @keyframes yun-guang {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0.5;
        }
    }

    /*建筑上的光*/
    .build1 {
        top: 113px;
        left: 18px;
    }

    .light1 {
        /* top: 134px;
        left: 11px; */
        width: 86px;
        height: 65px;
        /*background: url(../static/img/login/faguang.png) no-repeat center;*/
        background-size: 100% 100%;
        animation: yun-guang 600ms linear infinite alternate 0ms;
        position: relative;
    }

    /*烟花*/
    .bg-icon {
        width: 8px;
        height: 8px;
        position: absolute;
        border-radius: 4px;

    }

    .bg1-icon1 {
        left: 35px;
        top: -40px;
        background-color: #fdd10d;
        animation: doIcon1 2.5s 500ms linear infinite;
    }

    .bg1-icon2 {
        left: 35px;
        top: -60px;
        background-color: #87cbf8;
        animation: doIcon1 2.5s 500ms linear infinite;
    }

    .bg1-icon3 {
        left: 35px;
        top: -80px;
        background-color: #6cf59e;
        animation: doIcon1 2.5s 500ms linear infinite;
    }

    @keyframes doIcon1 {
        0% {
            transform: translate(0, 80px);
            opacity: 1;
        }
        100% {
            transform: translate(0, 0px);
            opacity: 0;
        }
    }

    .build2 {
        top: 13px;
        left: 512px;
    }

    .light2 {
        width: 86px;
        height: 65px;
        /*background: url(../static/img/login/faguang.png) no-repeat center;*/
        background-size: 100% 100%;
        animation: yun-guang 600ms linear infinite alternate 0ms;
        position: relative;
    }

    .bg2-icon1 {
        left: 25px;
        top: -60px;
        background-color: #87cbf8;
        animation: doIcon1 2.5s 500ms linear infinite;
    }

    .bg2-icon2 {
        left: 25px;
        top: -40px;
        background-color: #6cf59e;
        animation: doIcon1 2.5s 500ms linear infinite;
    }

    .bg2-icon3 {
        left: 53px;
        top: -38px;
        background-color: #3780ef;
        animation: doIcon1 2.5s 500ms linear infinite;
    }

    .bg2-icon4 {
        left: 52px;
        top: -62px;
        background-color: #a5ac6d;
        animation: doIcon1 2.5s 500ms linear infinite;
    }

    .bg2-icon5 {
        left: 39px;
        top: -23px;
        background-color: #6cf59e;
        animation: doIcon1 2.5s 500ms linear infinite;
    }

    .build3 {
        bottom: 105px;
        right: 73px;
        width: 203px;
        height: 123px;
        transform: rotate3d(65.5, 116, 30, 59deg);
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
    }

    .xingzhuang {
        width: 15px;
        height: 0;
        background-color: #fdcc1e;
    }

    .xingzhuang1 {
        width: 35px;
        height: 0;
        margin-left: 10px;
        background-color: #c1e9fa;
        animation: xingzhuang1 3s 500ms linear forwards infinite;
    }

    .xingzhuang2 {
        animation: xingzhuang2 3s 500ms linear forwards infinite;
    }

    .xingzhuang3 {
        animation: xingzhuang3 3s 500ms linear forwards infinite;
    }

    .xingzhuang4 {
        animation: xingzhuang4 3s 500ms linear forwards infinite;
    }

    .xingzhuang5 {
        animation: xingzhuang5 3s 500ms linear forwards infinite;
    }

    .xingzhuang6 {
        animation: xingzhuang6 3s 500ms linear forwards infinite;
    }

    .xingzhuang7 {
        margin-right: 10px;
        animation: xingzhuang7 3s 500ms linear forwards infinite;
    }

    /*柱形图动画*/
    @keyframes xingzhuang1 {
        0% {
            height: 0;
        }
        100% {
            height: 80%;
        }
    }

    @keyframes xingzhuang2 {
        0% {
            height: 0;
        }
        100% {
            height: 60%;
        }
    }

    @keyframes xingzhuang3 {
        0% {
            height: 0;
        }
        100% {
            height: 30%;
        }
    }

    @keyframes xingzhuang4 {
        0% {
            height: 0;
        }
        100% {
            height: 55%;
        }
    }

    @keyframes xingzhuang5 {
        0% {
            height: 0;
        }
        100% {
            height: 35%;
        }
    }

    @keyframes xingzhuang6 {
        0% {
            height: 0;
        }
        100% {
            height: 30%;
        }
    }

    @keyframes xingzhuang7 {
        0% {
            height: 0;
        }
        100% {
            height: 60%;
        }
    }

    @media screen and (min-width: 768px) {
        .wrap {
            /*max-width: 638px;*/
            width: 1100px;
            /*text-overflow: ellipsis;*/
            /*overflow: hidden;*/
        }

        .animation {
            width: 550px;
            height: 360px;
            margin-left: 150px;
        }

        .build1 {
            top: 63px;
            left: 6px;
        }

        .build2 {
            top: -10px;
            left: 396px;
        }

        .build3 {
            bottom: 79px;
            right: 58px;
            width: 159px;
            height: 78px;
            -webkit-transform: rotate3d(65.5, 116, 30, 59deg);
            transform: rotate3d(81.5, 149, 34, 58deg);
        }

        .title {
            margin-top: 50px;
        }

    }

    @media screen and (min-width: 1920px) {
        .wrap {
            /*max-width: 980px;*/
            width: 1200px;
        }

        .animation {
            width: 697px;
            height: 485px;
            margin-left: 100px;
        }

        .build1 {
            top: 113px;
            left: 18px;
        }

        .build2 {
            top: 13px;
            left: 512px;
        }

        .build3 {
            bottom: 105px;
            right: 73px;
            width: 203px;
            height: 123px;
            transform: rotate3d(65.5, 116, 30, 59deg);
        }

        .title {
            margin-top: 100px;
        }
    }
</style>

<template>
    <loginLLS v-if="isAMS"></loginLLS>
    <loginCustomer v-else></loginCustomer>
</template>

<script>
    // import loginLLS from './loginLLS.vue'
    // import loginCustomer from './loginCustomer.vue'

    export default {
        name: "login",
        // components: {loginLLS, loginCustomer},
        data() {
            return {
                isAMS: true,
            };
        },
        mounted() {
        },
        beforeMount() {
            //获取当前二级域名，决定登录页
            let secondHostname = sessionStorage.getItem('secondHostname') || '';
            if (secondHostname == "corp") {
                this.isAMS = true;
            } else {
                this.isAMS = false;
            }
        }
    };
</script>



// WEBPACK FOOTER //
// src/views/login.vue
