import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  searchTerm: "", // Initialize as an empty string
  highlightedIndexes: [], // Initialize as an empty array
  currentIndex: 0, // Index of the currently highlighted message
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  setSearchTerm: (term) => {
    set((state) => {
      const indexes = [];
      state.messages.forEach((message, idx) => {
        if (message.text && message.text.toLowerCase().includes(term.toLowerCase())) {
          indexes.push(idx);
        }
      });
      return {
        searchTerm: term,
        highlightedIndexes: indexes,
        currentIndex: indexes.length > 0 ? 0 : -1,
      };
    });
  },

  setCurrentIndex: (index) => set({ currentIndex: index }),

  navigateHighlight: (direction) =>
    set((state) => {
      if (state.highlightedIndexes.length === 0) return state;

      let newIndex = state.currentIndex + direction;

      // Ensure newIndex stays within bounds
      if (newIndex < 0) newIndex = state.highlightedIndexes.length - 1;
      if (newIndex >= state.highlightedIndexes.length) newIndex = 0;

      return { currentIndex: newIndex };
    }),

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setSelectedUser: (selectedUser) =>set({selectedUser})
})
)