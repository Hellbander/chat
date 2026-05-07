<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NInput, useMessage } from 'naive-ui'
import { useChatStore } from '../stores/chat.store'
import { useBotReply } from '../composables/useBotReply'

const props = defineProps<{
  chatId: string
}>()

const messageApi = useMessage()
const chatStore = useChatStore()
const { reply } = useBotReply()

const text = ref('')

async function submit() {
  const value = text.value.trim()

  if (!value) {
    messageApi.warning('Нельзя отправить пустое сообщение')
    return
  }

  text.value = ''

  await chatStore.sendMessage(props.chatId, value)
  await reply(props.chatId, value)
}
</script>

<template>
  <div class="input-row">
    <NInput
      v-model:value="text"
      type="textarea"
      placeholder="Введите сообщение..."
      class="input"
      :autosize="{ minRows: 1, maxRows: 4 }"
      @keydown.enter.exact.prevent="submit"
    />

    <NButton
      type="primary"
      color="rgba(255, 123, 0, 0.795)""
      :loading="chatStore.isSending"
      @click="submit"
    >
      Send
    </NButton>
  </div>
</template>

<style scoped>
.input-row {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  width: 100%;
  padding-top: 12px;
  border-top: 1px solid #2a2a2a;
}

.input-row :deep(.n-input) {
  flex: 1;
}

.input-row :deep(textarea) {
  background: #1f1f1f;
  color: white;
}

.input-row :deep(.n-input-wrapper) {
  background: #1f1f1f;
}

.input-row :deep(.n-input) {
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