import type { Ref } from 'vue'

export type ChatTab = 'all' | 'favorites'

export interface ChatTabsContext {
  activeTab: Ref<ChatTab>
  setActiveTab: (tab: ChatTab) => void
}

export const CHAT_TABS_KEY = Symbol('CHAT_TABS_KEY')