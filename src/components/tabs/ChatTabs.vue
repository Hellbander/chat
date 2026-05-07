<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { NButton, NSpace } from 'naive-ui'
import AllChatsList from './AllChatsList.vue'
import FavoriteChatsList from './FavoriteChatsList.vue'
import type { ChatTab } from '../../types/chat-tabs'
import { CHAT_TABS_KEY } from '../../types/chat-tabs'

const activeTab = ref<ChatTab>('all')

const tabComponents = {
  all: AllChatsList,
  favorites: FavoriteChatsList,
}

const currentTabComponent = computed(() => {
  return tabComponents[activeTab.value]
})

function setActiveTab(tab: ChatTab) {
  activeTab.value = tab
}

provide(CHAT_TABS_KEY, {
  activeTab,
  setActiveTab,
})
</script>

<template>
  <NSpace vertical size="medium">
    <NSpace >
      <NButton
        color="rgba(255, 123, 0, 0.796)"
        :type="activeTab === 'all' ? 'primary' : 'default'"
        @click="setActiveTab('all')"
      >
        Все
      </NButton>

      <NButton
        color="rgba(255, 123, 0, 0.796)"
        :type="activeTab === 'favorites' ? 'primary' : 'default'"
        @click="setActiveTab('favorites')"
      >
        Избранные
      </NButton>
    </NSpace>

    <component :is="currentTabComponent" />
  </NSpace>
</template>