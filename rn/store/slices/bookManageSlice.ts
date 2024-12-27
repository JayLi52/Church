import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface BookManageState {
  verse: {
    reference: string;
    text: string;
  };
  comment: {
    id: string;
    type: 'mine' | 'others';
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    content: string;
    date: string;
    location: string;
    likes: number;
    replies?: Array<{
      id: string;
      user: {
        id: string;
        name: string;
        avatar: string;
      };
      content: string;
      date: string;
      replyTo?: {
        name: string;
      };
    }>;
  } | null;
}

const initialState: BookManageState = {
  verse: {
    reference: '',
    text: '',
  },
  comment: null,
};

const bookManageSlice = createSlice({
  name: 'bookManage',
  initialState,
  reducers: {
    setVerse: (state, action: PayloadAction<{reference: string; text: string}>) => {
      state.verse = action.payload;
    },
    setComment: (state, action) => {
      state.comment = action.payload;
    },
  },
});

export const {setVerse, setComment} = bookManageSlice.actions;
export default bookManageSlice.reducer; 