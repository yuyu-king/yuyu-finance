<template>
  <div class="p-4">
    <n-card title="Naive UI 测试页面" class="max-w-2xl mx-auto">
      <n-space vertical>
        <n-button type="primary" @click="showMessage">
          点击测试消息提示
        </n-button>
        
        <n-input v-model:value="inputValue" placeholder="请输入内容" />
        
        <n-alert type="success" title="安装成功">
          Naive UI 已经成功集成到项目中！
        </n-alert>
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()
const inputValue = ref('')

const showMessage = () => {
  message.success('Naive UI 消息提示正常工作！')
}
</script> 