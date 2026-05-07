<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { NLayout, NLayoutSider, NLayoutContent, NSpin, NResult } from 'naive-ui'
import { useChatStore } from '@/stores/chat.store'
import AppSidebar from '../components/AppSidebar.vue'
import ChatWindow from '../components/ChatWindow.vue'

const route = useRoute()
const chatStore = useChatStore()

const chatId = computed(() => String(route.params.id))
const chat = computed(() => chatStore.getChatById(chatId.value))
const messages = computed(() => chatStore.getMessagesByChatId(chatId.value))

watch(
  chatId,
  async id => {
    await chatStore.fetchChat(id)
  },
  { immediate: true },
)
</script>

<template>
  <n-layout has-sider class="page">
    <n-layout-sider bordered width="300">
      <AppSidebar />
    </n-layout-sider>

    <n-layout-content class="content">
      <n-spin stroke="#ff7a00" :show="chatStore.isLoading">
        <ChatWindow
          v-if="chat"
          :chat="chat"
          :messages="messages"
        />

        <n-result
          v-else
          status="404"
          title="Чат не найден"
          description="Выберите другой чат из списка."
        />
      </n-spin>
    </n-layout-content>
  </n-layout>
</template>

<style scoped>
  .page {
    min-height: 100vh;
    background: #111111;
  }

  .content {
    padding: 20px;
    background: #111111;
  }
</style>