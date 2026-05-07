import { useChatStore } from '../stores/chat.store'

export function useBotReply() {
  const chatStore = useChatStore()

  async function reply(chatId: string, userText: string) {
    const answer = `Бот получил сообщение: "${userText}".`
    await chatStore.addBotReply(chatId, answer)
  }

  return { reply }
}