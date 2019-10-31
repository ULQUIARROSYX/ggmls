<template>
    <div id="app">
        <article>
            <div class="text-grey text-df padding-tb solid-bottom">参赛声明</div>
            <ol>
                <li>我自愿报名参加2019“劲酒•金标杯”万人健身跑赛事（以下简称“赛事”）。</li>
                <li>我了解参加本次赛事可能出现的风险和赛事本身的危险性，包括但不仅限于：造成死亡、残疾、受伤、财产遗失、财产破坏、无法及时获得医疗救助或者由于其他人员疏忽而造成损害的风险。</li>
                <li>我愿意承担比赛期间发生的自身意外风险责任，且同意组委会对于非组委会原因造成的伤害、死亡或其他任何的损失不承担任何形式的赔偿与责任。</li>
                <li>我身体健康、有能力参与本次赛事。如果我在赛事之前或者期间患病或者受伤，将会主动退出比赛。</li>
                <li>我知道我需要去学习和了解脱水和血液含钠低的危害，并且会采取预防措施，避免这些情况发生。</li>
                <li>如果我在参与赛事期间受伤，我同意接受组委会在比赛期间提供的医疗救治和紧急撤离服务，并由我承担所有超出赛事保险赔付范围的医疗费用。</li>
                <li>如果我在参加赛事期间，出现中暑，失温，高原反应等症状，经组委会判断继续参赛会发生更严重后果甚至危及生命，组委会有权强制退赛，我必须服从组委会的决定。</li>
                <li>在我愿意承担所有自身风险、组委会及其他协办机构已尽到相应义务的前提下，本人同意免除组委会及其他协办机构的责任，放弃对索取死亡、人身伤害或财产损失赔偿的权力（包括但不限于：医疗费用、工资损失、精神损害、经济损失、律师费和诉讼费）。</li>
                <li>我同意组委会及其许可人在全球及活动组织公司相应的宣传活动中使用我的名字、照片、图像、声音或者肖像等，同时放弃任何就本次赛事相关的宣传报道获取补偿的权利。</li>
                <li>我同意组委会将我的个人信息用于与赛事相关的合法商业目的。</li>
                <li>我同意因天气、紧急情况或者其他形式的公共安全问题可能会引起赛事的延期或者取消。</li>
                <li>我同意在这次赛事的参赛声明中的一条或多条条款可能因为任何原因在任何方面被裁定无效、违法，在这个情况下，这些条款不会影响参赛声明中的其余内容，他们仍具有充分的效力。</li>
                <li>我承诺向组委会提供的身份证件等资料真实、合法、有效，本人同意承担因身份证件和资料不实或签名不实所产生的全部法律责任。</li>
                <li>我已经仔细阅读此参赛声明，并充分理解其内容。我是根据自己的意愿签署这个声明，我理解并同意参赛声明的全部内容。</li>
                <li>本人已阅读及明白前述声明的内容，我同意所有此参赛声明条款的约束。我同意，组委会可以依据本人同意的参赛声明作为材料，让我来参加这次活动。如果我不同意此参赛声明的条款，我将不得参与本次活动，因此造成的损失由本人承担。</li>
            </ol>
        </article>
        <div class="padding-lr-sm margin-auto">
            <cube-toolbar
                :actions="actions"
                @click="clickHandler"
            ></cube-toolbar>
        </div>
    </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
    data () {
        return {
            num: 5,
            actions: []
        };
    },
    mounted () {
        this.number();
    },
    methods: {
        clickHandler (item) {
            if (item.action) {
                this[item.action](item);
            }
        },
        number () {
            if (this.num > 0) {
                this.actions = [
                    {
                        text: '<i class="cubeic-back text-orange"></i> <span class="text-orange">返回</span>',
                        action: "back"
                    },
                    {
                        text: `<span class="text-green">(${this.num}s) 阅读并同意</span>`,
                        action: "tip"
                    }
                ];
                this.num--;
                setTimeout(() => {
                    this.number();
                }, 1000);
            } else {
                this.actions = [
                    {
                        text: '<i class="cubeic-back text-orange"></i> <span class="text-orange">返回</span>',
                        action: "back"
                    },
                    {
                        text: `<span class="text-green">阅读并同意</span>`,
                        action: "confirm"
                    }
                ];
            }
        },
        confirm () {
            this.$router.push("/form");
        },
        back () {
            this.$router.push("/");
        },
        tip () {
            this.$createToast({
                type: "correct",
                txt: "请仔细阅读参赛声明",
                time: 1000
            }).show();
        }
    }
};
</script>


<style scope>
ol {
    padding: 15px 15px 120px 15px;
}
ol > li {
    font-size: 14px;
    line-height: 1.7em;
    list-style: unset;
    color: #666;
    margin-bottom: 10px;
}
</style>
