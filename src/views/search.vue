<template>
    <div id="app">
        <!-- 搜索框 -->
        <div class="bg-red padding-sm flex align-center">
            <div class="bg-white padding-sm flex align-center radius flex-grow">
                <i class="cubeic-search margin-right-xs"></i>
                <input
                    class="text-sm"
                    v-model="val"
                    placeholder="请输入身份证号查询信息"
                >
            </div>
            <cube-button
                :inline="true"
                :outline="true"
                class="line-white margin-left"
                @click="search"
            >搜索</cube-button>
        </div>
        <!-- 展位图 -->
        <div
            class="text-center margin-top"
            v-if="formData==''"
        >
            <img
                src="../assets/404.png"
                style="width:50%"
            >
        </div>
        <!-- 赛事信息 -->
        <article v-if="formData!=''">
            <div class="text-grey text-df padding-tb solid-bottom">赛事信息</div>
            <div class="padding-tb">“劲酒•金标杯”万人健身跑</div>
            <div class="padding-bottom">
                <p class="text-sm text-gray">比赛时间：2019年09月29日下午2:30</p>
                <p class="text-sm text-gray">比赛地点：甘肃省，甘谷县，大像山公园</p>
            </div>
        </article>
        <!-- 报名信息 -->
        <article v-if="formData!=''">
            <div class="text-grey text-df padding-tb solid-bottom">报名信息</div>
            <div class="padding-tb">
                <p class="text-sm text-gray">身份证号：{{formData.cardId}}</p>
                <p class="text-sm text-gray">姓名：{{formData.name}}</p>
                <p class="text-sm text-gray">电话号码：{{formData.phone}}</p>
                <p class="text-sm text-gray">性别：{{formData.sex}}</p>
                <p class="text-sm text-gray">衣服尺码：{{formData.size}}</p>
                <p class="text-sm text-gray">报名时间：{{(new Date(formData.joinTime)).Format("yyyy-MM-dd hh:mm:ss")}}</p>
            </div>
        </article>
        <!-- 报名费 -->
        <article v-if="formData!=''">
            <div class="text-grey text-df padding-tb solid-bottom">报名费</div>
            <p class="text-red text-df padding-tb">若没有支付报名费请长按或者扫以下二维码支付，如已支付则请无视。支付成功后请截图保留，参赛当天凭截图领取服装</p>
            <div class="padding-bottom text-center">
                <img
                    src="https://www.30mi.com/pro/ggmls/static/ewm.png"
                    class="ewm"
                />
            </div>
        </article>

        <div class="padding">
            <cube-button
                class="margin-top"
                @click="back"
            >返回主页</cube-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            val: '',
            formData: ''
        };
    },
    methods: {
        search () {
            this.$axios.get('/search?cardId=' + this.val)
                .then(res => {
                    if (res.data.code == 0) {
                        this.formData = res.data.data[0]
                    } else {
                        this.$createToast({
                            type: "error",
                            txt: "未查询到报名信息",
                            time: 1000
                        }).show();
                    }

                })
        },
        back () {
            this.$router.push('/')
        }
    }
};
</script>
<style>
</style>