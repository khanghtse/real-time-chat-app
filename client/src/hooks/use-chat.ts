import { API } from "@/lib/axios-client";
import type { UserType } from "@/types/auth.type";
import type { ChatType, CreateChatType, MessageType } from "@/types/chat.type";
import { toast } from "sonner";
import { create } from "zustand";

interface ChatState {
  chats: ChatType[];
  users: UserType[];
  singleChat: {
    chat: ChatType;
    messages: MessageType[];
  } | null;

  isChatsLoading: boolean;
  isUsersLoading: boolean;
  isCreatingChat: boolean;
  isSingleChatLoading: boolean;

  fetchAllUsers: () => void;
  fetchChats: () => void;
  createChat: (payload: CreateChatType) => Promise<ChatType | null>;
  fetchSingleChat: (chatId: string) => void;
  addNewChat: (newChat: ChatType) => void;
}

export const useChat = create<ChatState>()((set, get) => ({
  chats: [],
  users: [],
  singleChat: null,

  isChatsLoading: false,
  isUsersLoading: false,
  isCreatingChat: false,
  isSingleChatLoading: false,

  fetchAllUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const { data } = await API.get("/user/all");
      set({ users: data.users });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  fetchChats: async () => {
    set({ isChatsLoading: true });
    try {
      const { data } = await API.get("/chat/all");
      set({ chats: data.chats });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch chats");
    } finally {
      set({ isChatsLoading: false });
    }
  },

  createChat: async (payload: CreateChatType) => {
    set({ isCreatingChat: true });
    try {
      const response = await API.post("/chat/create", {
        ...payload,
      });

      get().addNewChat(response.data.chat);
      toast.success("Chat created successfully");
      return response.data.chat;
      
    } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to create chat");
        return null;
    } finally {
      set({ isCreatingChat: false });
    }
  },
  fetchSingleChat: (chatId: string) => set({ isSingleChatLoading: true }),

  addNewChat: (newChat: ChatType) => {
    set((state) => {
      const existingChatIndex = state.chats.findIndex(
        (c) => c._id === newChat._id
      );
      if (existingChatIndex !== -1) {
        // move the chat to the top
        return {
          chats: [newChat, ...state.chats.filter((c) => c._id !== newChat._id)],
        };
      } else {
        return {
          chats: [newChat, ...state.chats],
        };
      }
    });
  },
}));
