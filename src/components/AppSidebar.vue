<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NInput, NSpace, NText, useMessage } from 'naive-ui'
import { useChatStore } from '../stores/chat.store'
import ChatTabs from './tabs/ChatTabs.vue'

const router = useRouter()
const message = useMessage()
const chatStore = useChatStore()

const newChatTitle = ref('')

function createChat() {
  const chat = chatStore.createChat(newChatTitle.value)

  if (!chat) {
    message.warning('Введите название чата')
    return
  }

  newChatTitle.value = ''
  router.push(`/chat/${chat.id}`)
}
</script>

<template>
  <aside class="sidebar">
    <NSpace vertical size="large">
      <div class="sidebar-header">
        <NText strong class="title">Syntax Chat</NText>
      </div>

      <NSpace>
        <NInput
          v-model:value="newChatTitle"
          placeholder="Новый чат"
          @keyup.enter="createChat"
        />

        <NButton color="rgba(255, 123, 0, 0.796)"  type="primary" @click="createChat">
          +
        </NButton>
      </NSpace>

      <ChatTabs />
    </NSpace>
  </aside>
</template>

<style scoped>
  .sidebar {
    height: 100vh;
    padding: 28px 24px 20px;
    background: #161616;
    border-right: 1px solid #2a2a2a;
  }

  .sidebar-header {
    margin-bottom: 8px;
  }

  .sidebar :deep(.n-input) {
  --n-border: 1px solid #2a2a2a !important;
  --n-border-hover: 1px solid #ff7a00 !important;
  --n-border-focus: 1px solid #ff7a00 !important;

  --n-box-shadow-focus: 0 0 0 1px rgba(255, 122, 0, 0.15) !important;

  --n-color: #1f1f1f !important;
  --n-color-focus: #1f1f1f !important;
  --n-text-color: #ffffff !important;
  --n-placeholder-color: #7a7a7a !important;
}
</style>