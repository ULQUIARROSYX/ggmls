<template>
    <div id="app">
        <!-- 顶部轮播 -->
        <div class="slide_item">
            <div class="bg">
                <div>甘谷县庆祝新中国成立70周年<br><br>万人健身跑</div>
            </div>
            <cube-slide
                ref="slide"
                :data="topImgs"
                style="z-index:-1"
            >
                <cube-slide-item
                    v-for="(item, index) in topImgs"
                    :key="index"
                >
                    <img :src="item">
                </cube-slide-item>
            </cube-slide>
        </div>
        <!-- 竞赛时间、地点 -->
        <article>
            <div class="text-grey text-df padding-tb solid-bottom">竞赛时间、地点</div>
            <div class="padding-tb">
                <p class="text-sm text-gray">比赛时间：2019年09月29日下午2:30</p>
                <p class="text-sm text-gray">比赛地点：甘肃省，甘谷县，大像山公园</p>
            </div>
        </article>
        <!-- 主办、协办单位 -->
        <article>
            <div class="text-grey text-df padding-tb solid-bottom">主办、协办单位</div>
            <div class="padding-tb">
                <p class="text-sm text-gray">
                    <span>主办：甘谷县全民健身工作委员会</span><br>
                    <span style="margin-left:3em">甘谷县体育发展中心</span>
                </p>
                <p class="text-sm text-gray">协办：甘谷中长跑俱乐部</p>
            </div>
        </article>
        <!-- 注意事项 -->
        <article>
            <div class="text-grey text-df padding-tb solid-bottom">注意事项</div>
            <div class="padding-tb">
                <p class="text-sm text-gray">
                    <span>参赛服装：请于 <b class="text-red">09月28-29日上午</b> 在大像山公园尚武苑领取</span><br>
                </p>
                <p class="text-sm text-gray">参赛奖项：本次国庆万人健身跑赛事设男、女各 <b class="text-red"> 一、二、三等奖</b></p>
            </div>
        </article>
        <!-- <indexTab></indexTab> -->
        <!-- 流程和赞助 -->
        <article>
            <!-- tab选项卡 -->
            <cube-tab-bar
                v-model="selectedLabel"
                show-slider
            >
                <cube-tab label="赛事流程"></cube-tab>
                <cube-tab label="广告赞助"></cube-tab>
            </cube-tab-bar>
            <!-- tab页面 -->
            <cube-tab-panels v-model="selectedLabel">
                <!-- 赛事流程 -->
                <cube-tab-panel label="赛事流程">
                    <div class="text-area padding-sm">
                        <h2>一、开幕式（县领导主持）</h2>
                        <p>拟定于9月29日下午2:30在大像山公园举行</p>
                        <div>
                            <p>1、全体肃立奏唱中国人民共和国国歌</p>
                            <p>2、县领导致词</p>
                            <p>3、组委会领导讲话</p>
                            <p>4、运动员代表宣誓</p>
                            <p>5、表演节目</p>
                            <p>6、领导宣布比赛开始并发令运动员出发</p>
                        </div>
                        <h2>二、赛程</h2>
                        <div>
                            <p>1、环公园进行</p>
                            <p>2、起点：大像山公园尚武苑</p>
                            <p>3、终点：大像山公园尚武苑</p>
                            <p>4、路程：运动员沿公园健身路内圈逆时针健身跑四圈结束，不设名次；其他群众以及各协会、俱乐部成员沿公园健身路外圈顺时针健走两圈结束</p>
                        </div>
                        <h2>三、颁奖暨闭幕式</h2>
                        <p>拟定于9月29日全部比赛结束后进行</p>
                        <div>
                            <p>1、组委会领导嘉宾颁发奖品</p>
                            <p>2、合影留念</p>
                        </div>
                        <h2>四、参加单位</h2>
                        <div>
                            <p>1、全县干部群众</p>
                            <p>2、全县各健身队（三十余）</p>
                            <p>3、各协会、俱乐部成员</p>
                        </div>
                        <h2>五、媒体支持</h2>
                        <p>甘谷县融媒体中心、《甘谷在线》、《三河人说事》、《图说甘谷》</p>
                        <h2>六、报名方式</h2>
                        <p>网络报名</p>
                        <h2>七、广告赞助</h2>
                        <p>劲牌有限公司</p>
                        <p>甘谷县娃哈哈集团</p>
                        <p>甘肃陇浆源农业科技有限公司</p>

                        <div class="text-right padding-tb-xl">
                            <p class="text-bold">联系人：李慧</p>
                            <p class="text-bold">电话(点击拨打)：<a
                                    class="text-grey text-bold"
                                    href="tel:13993887640"
                                >13993887640</a></p>
                            <p class="text-bold padding-bottom-xl">2019年09月29日</p>
                        </div>
                    </div>
                </cube-tab-panel>
                <cube-tab-panel
                    label="广告赞助"
                    class="margin-top"
                >
                    <div
                        v-for="(ad,adI) in ads"
                        :key="adI"
                    >
                        <img :src="ad" />
                    </div>

                </cube-tab-panel>
            </cube-tab-panels>
        </article>
        <!-- 操作按钮 -->
        <div class="padding-lr-sm">
            <cube-toolbar
                :actions="actions"
                @click="clickHandler"
            ></cube-toolbar>
        </div>
    </div>
</template>

<script>
import indexTab from '../components/indexTab'
export default {
    data () {
        return {
            selectedLabel: '赛事流程',
            raceColumn: [
                { text: "万人健身跑", value: "万人健身跑" }
            ],
            ads: [
                'https://www.30mi.com/pro/ggmls/static/11.png',
                'https://www.30mi.com/pro/ggmls/static/22.png',
                'https://www.30mi.com/pro/ggmls/static/33.png',
            ],
            actions: [
                {
                    text: '<i class="cubeic-search text-olive"></i> 查询报名信息',
                    action: "search"
                },
                {
                    text: '<i class="cubeic-edit text-orange"></i> 立即报名参赛',
                    action: "showPicker"
                }
            ],
            topImgs: [
                'https://www.30mi.com/pro/ggmls/static/0.png',
                'https://www.30mi.com/pro/ggmls/static/1.png',
                'https://www.30mi.com/pro/ggmls/static/2.png',
                'https://www.30mi.com/pro/ggmls/static/3.png',
                'https://www.30mi.com/pro/ggmls/static/4.png',
                'https://www.30mi.com/pro/ggmls/static/5.png',
                'https://www.30mi.com/pro/ggmls/static/6.png',
                'https://www.30mi.com/pro/ggmls/static/7.png'
            ]
        };
    },
    methods: {
        search () {
            this.$router.push('/search')
        },
        showPicker () {
            if (!this.picker) {
                this.picker = this.$createPicker({
                    title: "选择报名的赛事",
                    subtitle: "选中后点击确定",
                    data: [this.raceColumn],
                    onSelect: this.selectPicker,
                    onCancel: this.cancelPicker
                });
            }
            this.picker.show();
        },
        selectPicker (selectedVal, selectedIndex, selectedText) {
            this.$router.push('/disclaimer')
        },
        cancelPicker () {
            this.$createToast({
                type: "correct",
                txt: "取消选择",
                time: 1000
            }).show();
        },

        clickHandler (item) {
            if (item.action) {
                this[item.action](item);
            }
        }
    },
    components: { indexTab }
};
</script>


<style>
img {
    width: 100%;
}

.text-area h2 {
    color: #8799a3;
    padding: 20px 0;
}

.text-area p {
    color: #666;
    font-size: 14px;
}
.cube-slide-dots {
    bottom: 10px;
}
.slide_item {
    position: relative;
    z-index: 100000;
}
.slide_item .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 1.4em;
}
.cube-tab {
    font-size: 14px;
    padding: 1em !important;
}
</style>

