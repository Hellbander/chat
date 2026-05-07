<script setup lang="ts">
import { computed } from 'vue'
import { NText } from 'naive-ui'
import type { Message } from '../stores/chat.store'

const props = defineProps<{
  message: Message
}>()

const isUser = computed(() => props.message.author === 'user')
</script>

<template>
  <div class="row" :class="{ user: isUser }">
    <div class="bubble">
      <NText>{{ message.text }}</NText>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  justify-content: flex-start;
}

.row.user {
  justify-content: flex-end;
}

.bubble {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  background: #252525;
  color: white;
  border: 1px solid #2f2f2f;
  line-height: 1.4;
}

.row.user .bubble {
  background: #ff7a00;
  border: none;
  color: white;
}
</style>