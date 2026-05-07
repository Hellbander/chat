<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { NCard, NSpace, NText } from 'naive-ui'
import type { Chat, Message as ChatMessageType } from '../stores/chat.store'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'

interface Props {
  chat: Chat
  messages: ChatMessageType[]
}

const props = defineProps<Props>()

const messagesRef = ref<HTMLElement | null>(null)

watch(
  () => props.messages.length,
  async () => {
    await nextTick()
    messagesRef.value?.scrollTo({
      top: messagesRef.value.scrollHeight,
      behavior: 'smooth',
    })
  },
)

console.log(props.messages, 'messages in ChatWindow')

</script>

<template>
  <NCard class="chat">
    <NSpace vertical size="large" class="chat-layout">
      <header>
        <NText strong class="title">{{ chat.title }}</NText>
      </header>

      <main ref="messagesRef" class="messages">
        <ChatMessage
          v-for="message in messages"
          :key="message.id"
          :message="message"
        />
      </main>

      <ChatInput :chat-id="chat.id" />
    </NSpace>
  </NCard>
</template>

<style scoped>
.chat {
  height: calc(100vh - 40px);
  background: #1b1b1b;
  border: 1px solid #2a2a2a;
  border-radius: 20px;
}

.chat-layout {
  height: 100%;
}

.title {
  font-size: 24px;
  color: white;
}

.messages {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 8px;
}

.messages::-webkit-scrollbar {
  width: 8px;
}

.messages::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 999px;
}
</style>