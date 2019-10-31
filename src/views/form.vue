<template>
    <div>
        <article v-if="editFlag">
            <div class="text-grey text-df padding-tb solid-bottom">报名信息</div>
            <form>
                <div class="formItem">
                    <div class="formTitle">姓名</div>
                    <cube-input
                        class="flex-grow border0"
                        v-model="formData.name"
                        placeholder="请输入身份证上的姓名"
                        :clearable="true"
                        @change="changeName"
                    ></cube-input>
                </div>
                <div class="formItem">
                    <div class="formTitle">性别</div>
                    <cube-radio-group
                        class="flex border0"
                        v-model="formData.sex"
                    >
                        <cube-radio :option="{value: '男',disabled:true}">
                            <span class="text-df">男</span>
                        </cube-radio>
                        <cube-radio :option="{value: '女',disabled:true}">
                            <span class="text-df">女</span>
                        </cube-radio>
                    </cube-radio-group>
                </div>
                <div class="formItem">
                    <div class="formTitle">身份证号</div>
                    <cube-input
                        class="flex-grow border0"
                        v-model="formData.cardId"
                        placeholder="请填写正确格式"
                        :clearable="true"
                        @change="changeCardId"
                    ></cube-input>
                </div>
                <div class="formItem">
                    <div class="formTitle padding-tb">出生日期</div>
                    <p class="dateText">{{formData.birthday==''?'根据身份证号判断':formData.birthday}}</p>
                </div>
                <div class="formItem margin-auto">
                    <div class="formTitle">联系电话</div>
                    <cube-input
                        class="flex-grow border0"
                        v-model="formData.phone"
                        placeholder="请填写可联系到的电话号码"
                        :clearable="true"
                        @change="changePhone"
                    ></cube-input>
                </div>
                <div class="formItem">
                    <div class="formTitle">衣服尺码</div>
                    <cube-select
                        v-model="formData.size"
                        :options="sizeOptions"
                    >
                    </cube-select>
                </div>
            </form>
        </article>
        <div
            class="padding"
            v-if="editFlag"
        >
            <cube-button
                :primary="true"
                @click="submit"
            >提交报名信息</cube-button>
            <cube-button
                class="margin-top"
                @click="search"
            >查询已报名信息</cube-button>
            <cube-button
                class="margin-top"
                @click="$router.push('/')"
            >返回首页</cube-button>
        </div>

        <div v-if="!editFlag">
            <article class="text-center">
                <!-- <i
                    class="cubeic-right text-green"
                    style="font-size:100px"
                ></i> -->
                <p class="padding">请支付报名费以完成报名</p>
                <p class="text-df text-grey">使用微信扫码或长按二维码支付报名费38.00元</p>
                <p class="text-df text-red padding">只报名不交费无法参加比赛</p>
            </article>

            <article>
                <div class="text-grey text-df padding-tb solid-bottom">报名费</div>
                <p class="text-red text-df padding-tb">支付成功后请截图保留，参赛当天凭截图领取服装</p>
                <div class="padding-bottom text-center">
                    <img
                        src="https://www.30mi.com/pro/ggmls/static/ewm.png"
                        class="ewm"
                    />
                </div>
            </article>

            <article>
                <div class="text-grey text-df padding-tb solid-bottom">报名信息</div>
                <div class="padding-tb">
                    <p class="text-sm text-gray">身份证号：{{formData.cardId}}</p>
                    <p class="text-sm text-gray">姓名：{{formData.name}}</p>
                    <p class="text-sm text-gray">电话号码：{{formData.phone}}</p>
                    <p class="text-sm text-gray">性别：{{formData.sex}}</p>
                    <p class="text-sm text-gray">衣服尺码：{{formData.size}}</p>
                </div>
            </article>
            <div class="padding">
                <cube-button
                    :primary="true"
                    @click="editFlag=true"
                >再次报名</cube-button>
                <cube-button
                    class="margin-top"
                    @click="search"
                >查询已报名信息</cube-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            editFlag: true,
            formData: {
                cardId: "",
                name: "",
                sex: "",
                birthday: "",
                phone: "",
                size: ""
            },
            sizeOptions: ['S', 'M', 'L', 'XL', 'XXL']
        };
    },
    methods: {
        submit () {
            let result = true
            Object.keys(this.formData).forEach(key => {
                if (this.formData[key] == "") {
                    result = false
                }
            });
            if (result) {
                this.$axios
                    .post("/submit", this.formData)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.$createToast({
                                type: "correct",
                                txt: "报名成功",
                                time: 1000
                            }).show();
                            this.editFlag = false;
                        } else if (res.data.code === 1) {
                            this.$createToast({
                                type: "correct",
                                txt: "请不要重复报名",
                                time: 1000
                            }).show();
                        } else {
                            this.$createToast({
                                type: "error",
                                txt: "报名失败，请重试",
                                time: 1000
                            }).show();
                        }
                    });
            } else {
                this.$createToast({
                    type: "error",
                    txt: "资料不完整",
                    time: 1000
                }).show();
            }
        },
        search () {
            this.$router.push("/search");
        },
        //判断身份证格式，正确则自动填入性别和生日
        changeCardId () {
            let result = this.formData.cardId.match(
                /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
            );
            if (result == null) {
                this.$createToast({
                    type: "error",
                    txt: "身份证格式错误",
                    time: 1000
                }).show();
                this.formData.cardId = "";
                this.formData.birthday = "";
                this.formData.sex = "";
            } else {
                let birthday = result[0]
                    .substr(6, 8)
                    .replace(/(.{4})(.{2})/, "$1-$2-");
                this.formData.birthday = birthday;
                if (result[0].substring(16, 17) % 2 == 0) {
                    this.formData.sex = "女";
                } else {
                    this.formData.sex = "男";
                }
            }
        },
        //判断姓名
        changeName () {
            let result = this.formData.name.match(/^[\u4e00-\u9fa5]{2,20}$/);
            if (result == null) {
                this.$createToast({
                    type: "error",
                    txt: "姓名格式错误",
                    time: 1000
                }).show();
                this.formData.name = "";
            }
        },
        //判断电话号
        changePhone () {
            let result = this.formData.phone.match(/^1[3|5|7|8]\d{9}$/gi);
            if (result == null) {
                this.$createToast({
                    type: "error",
                    txt: "电话号码格式错误",
                    time: 1000
                }).show();
                this.formData.phone = "";
            }
        }
    },
    computed: {
        btnAbled () {
            let result = [];
        }
    }
};
</script>
<style>
form > .formItem {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
form > .formItem > .formTitle {
    min-width: -webkit-calc(4em + 5px);
    min-width: calc(4em + 5px);
    margin: 0;
    font-size: 14px;
    color: #666;
}
form > .formItem > .dateText {
    flex-grow: 1;
    padding-left: 10px;
    font-size: 14px;
    color: #cdcdcd;
}
.cube-radio_selected .cube-radio-ui {
    background: #fc9153 !important;
}
.cube-select {
    width: 100%;
}
.ewm {
    width: 200px;
    height: 200px;
}
</style>
