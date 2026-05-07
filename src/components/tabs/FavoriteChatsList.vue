<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NButton, NEmpty, NIcon, NList, NListItem, NText } from 'naive-ui'
import { Star } from '@vicons/ionicons5'
import { useChatStore } from '../../stores/chat.store'

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()

const activeChatId = computed(() => String(route.params.id))

const favoriteChats = computed(() => {
  return chatStore.chats.filter(chat => chat.isFavorite)
})

function openChat(chatId: string) {
  router.push(`/chat/${chatId}`)
}
</script>

<template>
  <NEmpty
    v-if="favoriteChats.length === 0"
    description="Нет избранных чатов"
  />

  <NList v-else clickable hoverable>
    <NListItem
      v-for="chat in favoriteChats"
      :key="chat.id"
      class="chat-item"
      :class="{ active: chat.id === activeChatId }"
      @click="openChat(chat.id)"
    >
      <div class="chat-row">
        <NText strong>{{ chat.title }}</NText>

        <NButton
          quaternary
          circle
          size="small"
          class="favorite-button"
          @click.stop="chatStore.toggleFavorite(chat.id)"
        >
          <template #icon>
            <NIcon>
              <Star />
            </NIcon>
          </template>
        </NButton>
      </div>
    </NListItem>
  </NList>
</template>

<style scoped>
.chat-item {
  border-radius: 12px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.chat-item:not(.active):hover {
  background: #242424;
  transform: translateX(2px);
}

.chat-item.active,
.chat-item.active:hover {
  background: rgba(255, 122, 0, 0.15);
  border: 1px solid rgba(255, 122, 0, 0.4);
  transform: none;
}

.chat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}

.favorite-button {
  color: #ff7a00;
  opacity: 0.85;
}

.favorite-button:hover {
  color: #ff8f26;
  opacity: 1;
}
</style>