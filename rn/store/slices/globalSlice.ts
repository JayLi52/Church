interface GlobalState {
  user: {
    name: string;
    avatar: string;
    // 其他用户相关字段...
  };
}

const initialState: GlobalState = {
  user: {
    name: 'test x',
    avatar: 'http://gips3.baidu.com/it/u=3892227616,2240763844&fm=3028&app=3028&f=JPEG&fmt=auto?w=3200&h=3200',
  },
}; 