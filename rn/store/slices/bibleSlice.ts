import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type BibleVersion = {
  id: string;
  name: string;
  shortName: string;
};

interface BibleState {
  currentVersion: BibleVersion;
  versions: {
    zh: BibleVersion[];
    en: BibleVersion[];
    ko: BibleVersion[];
  };
  currentLanguage: 'zh' | 'en' | 'ko';
  isPlaying: boolean;
  showPlayer: boolean;
}

const initialState: BibleState = {
  currentVersion: {
    id: '1',
    name: '现代标点和合本',
    shortName: '和合本',
  },
  versions: {
    zh: [
      {id: '1', name: '现代标点和合本', shortName: '和合本'},
      {id: '2', name: '和合本2010（上帝版）', shortName: '和合本2010'},
      {id: '3', name: '和合本2010（神版）', shortName: '和合本2010'},
      {id: '4', name: '当代译本', shortName: '当代译本'},
      {id: '5', name: '圣经新译本', shortName: '新译本'},
    ],
    en: [
      {id: '6', name: 'New International Version', shortName: 'NIV'},
      {id: '7', name: 'King James Version', shortName: 'KJV'},
    ],
    ko: [
      {id: '8', name: '개역개정', shortName: '개역개정'},
      {id: '9', name: '새번역', shortName: '새번역'},
    ],
  },
  currentLanguage: 'zh',
  isPlaying: false,
  showPlayer: false,
};

const bibleSlice = createSlice({
  name: 'bible',
  initialState,
  reducers: {
    setCurrentVersion: (state, action: PayloadAction<BibleVersion>) => {
      state.currentVersion = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setShowPlayer: (state, action: PayloadAction<boolean>) => {
      state.showPlayer = action.payload;
    },
    togglePlayer: state => {
      state.isPlaying = !state.isPlaying;
    },
    setCurrentLanguage: (state, action: PayloadAction<'zh' | 'en' | 'ko'>) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const {setCurrentVersion, setIsPlaying, setShowPlayer, togglePlayer, setCurrentLanguage} =
  bibleSlice.actions;

export default bibleSlice.reducer; 