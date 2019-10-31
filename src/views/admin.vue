<template>
    <div v-if="is_login">
        <article>
            <div class="text-grey text-df padding-tb solid-bottom">报名列表 ( 报名总人数：{{totalNum}} )</div>
            <div
                class="text-sm text-gray padding-tb-sm flex justify-between align-center"
                style="border-bottom:1px solid #eee"
                v-for="op in opList"
                :key="op.cardId"
            >
                <span>{{op.name}} / {{op.phone}} / {{op.size}}</span>
                <div>
                    <cube-button
                        inline
                        primary
                        @click="showInfo(op)"
                    >详情</cube-button>&nbsp;
                    <cube-button
                        inline
                        @click="del(op)"
                    >删除</cube-button>
                </div>
            </div>

            <div
                class="text-df text-red text-center padding"
                @click="getUser"
                v-if="opList.length<this.totalNum"
            >点击查看更多</div>
            <div
                class="text-df text-grey text-center padding"
                v-else
            >已全部加载</div>

        </article>
    </div>
</template>
<script>
export default {
    data: () => ({
        is_login: false,
        opList: [],
        totalNum: 0,
        lastId: 0
    }),
    mounted () {
        this.log()
        // this.login('112')
    },
    methods: {
        // 弹出提示
        log () {
            this.dialog = this.$createDialog({
                type: 'prompt',
                title: '管理登入',
                prompt: {
                    value: '',
                    placeholder: '请输入管理密码'
                },
                onConfirm: (e, promptValue) => {
                    this.login(promptValue)
                },
                onCancel: () => {
                    this.$createToast({
                        type: 'warn',
                        time: 1000,
                        txt: '必须输入密码'
                    }).show()
                    this.log()
                }
            }).show()
        },
        // 登录并获取全部人数
        login (val) {
            this.$axios.get('/login?code=' + val)
                .then(res => {
                    if (res.data.code === 0) {
                        this.is_login = true
                        this.totalNum = res.data.totalNum
                        this.getUser()
                    } else {
                        this.log()
                    }
                })

        },
        getUser () {
            const toast = this.$createToast({
                time: 0,
                txt: '请稍等..',
                mask: true
            })
            toast.show()
            let pageSize = 5
            let url = this.lastId !== 0 ? `/getUser?pageSize=${pageSize}&lastId=${this.lastId}` : `/getUser?pageSize=${pageSize}`
            this.$axios.get(url)
                .then(res => {
                    if (res.data.code === 0 && res.data.data.length > 0) {
                        this.opList.push(...res.data.data)
                        this.lastId = res.data.data[pageSize - 1]._id
                        toast.hide()
                    } else {
                        toast.hide()
                        console.log('error')
                    }
                })
                .catch(() => { toast.hide() })
        },
        showInfo (op) {
            this.$createDialog({
                type: 'alert',
                confirmBtn: {
                    text: '返回',
                    active: true
                },
                title: op.name,
            }, (createElement) => {
                return [
                    createElement('div', {
                        'class': {
                            'my-title padding-left': true
                        },
                        slot: 'content'
                    }, [
                            createElement('p', `性别：${op.sex}`),
                            createElement('p', `生日：${op.birthday}`),
                            createElement('p', `手机号：${op.phone}`),
                            createElement('p', `身份证号：${op.cardId}`),
                            createElement('p', `衣服尺码：${op.size}`),
                            createElement('p', `报名时间：${(new Date(op.joinTime)).Format("yyyy-MM-dd hh:mm:ss")}`)
                        ])
                ]
            }

            ).show()
        },
        del (op) {
            this.$createDialog({
                type: 'confirm',
                icon: 'cubeic-alert',
                title: '是否删除',
                content: '当前选择的报名用户为：' + op.name,
                confirmBtn: {
                    text: '确认删除',
                    active: true,
                    disabled: false,
                    href: 'javascript:;'
                },
                cancelBtn: {
                    text: '取消',
                    active: false,
                    disabled: false,
                    href: 'javascript:;'
                },
                onConfirm: () => {
                    this.$axios.get('/del?cardId=' + op.cardId)
                        .then(() => {
                            this.opList = this.opList.filter(e => e.cardId !== op.cardId)
                            this.$createToast({
                                type: 'warn',
                                time: 1000,
                                txt: '已删除'
                            }).show()
                            this.totalNum--
                        })
                },
                onCancel: () => {
                    this.$createToast({
                        type: 'warn',
                        time: 1000,
                        txt: '取消'
                    }).show()
                }
            }).show()
        }
    }
}
</script>