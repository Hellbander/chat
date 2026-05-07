import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type MessageAuthor = 'user' | 'bot'

export interface Message {
  id: string
  chatId: string
  author: MessageAuthor
  text: string
  createdAt: string
}

export interface Chat {
  id: string
  title: string
  isFavorite: boolean
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Chat[]>([
    { id: '1', title: 'General', isFavorite: true },
    { id: '2', title: 'Syntax.ai', isFavorite: true },
    { id: '3', title: 'Frontend Team', isFavorite: true },
    { id: '4', title: 'Backend Team', isFavorite: false },
    { id: '5', title: 'Design Team', isFavorite: false },
  ])

  const messages = ref<Message[]>([
    {
      id: createId(),
      chatId: '1',
      author: 'bot',
      text: 'Привет! Это общий чат.',
      createdAt: new Date().toISOString(),
    },
    {
      id: createId(),
      chatId: '2',
      author: 'bot',
      text: 'Добро пожаловать в чат Syntax.ai!',
      createdAt: new Date().toISOString(),
    },
  ])

  const isSending = ref(false)
  const isLoading = ref(false)

  const getChatById = computed(() => {
    return (chatId: string) => chats.value.find(chat => chat.id === chatId)
  })

  const getMessagesByChatId = computed(() => {
    return (chatId: string) =>
      messages.value.filter(message => message.chatId === chatId)
  })

  async function fetchChat(chatId: string) {
    isLoading.value = true
    await delay(500)
    isLoading.value = false

    return getChatById.value(chatId)
  }

  async function sendMessage(chatId: string, text: string) {
    const normalizedText = text.trim()

    if (!normalizedText || isSending.value) return

    isSending.value = true
    await delay(400)

    messages.value.push({
      id: createId(),
      chatId,
      author: 'user',
      text: normalizedText,
      createdAt: new Date().toISOString(),
    })

    isSending.value = false
  }

  async function addBotReply(chatId: string, text: string) {
    await delay(1200)

    messages.value.push({
      id: createId(),
      chatId,
      author: 'bot',
      text,
      createdAt: new Date().toISOString(),
    })
  }

  function createId() {
  if (crypto?.randomUUID) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

  function createChat(title: string) {
    const normalizedTitle = title.trim()
    if (!normalizedTitle) return

    const chat: Chat = {
      id: createId(),
      title: normalizedTitle,
      isFavorite: false,
    }

    chats.value.unshift(chat)
    return chat
  }

  function toggleFavorite(chatId: string) {
  const chat = chats.value.find(chat => chat.id === chatId)

  if (!chat) return

  chat.isFavorite = !chat.isFavorite
}

  return {
    chats,
    messages,
    isSending,
    isLoading,
    getChatById,
    getMessagesByChatId,
    fetchChat,
    sendMessage,
    addBotReply,
    createChat,
    toggleFavorite
  }
})