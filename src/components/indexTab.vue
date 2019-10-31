<template>
    <article>
        <!-- tab选项卡 -->
        <cube-tab-bar
            v-model="selectedLabel"
            show-slider
        >
            <cube-tab label="赛事流程"></cube-tab>
            <cube-tab label="广告赞助"></cube-tab>
        </cube-tab-bar>
    </article>
</template>
<script>
export default {
    name: 'indexTab',
    data: () => ({
        selectedLabel: '赛事流程',
    })
}
</script> 