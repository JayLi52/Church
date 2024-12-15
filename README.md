## App 界面

<div style="display:flex;flex-direction: row">
<img src="./example/学经小组学经用户.png" alt="学经小组学经用户" width="300">
<img src="./example/组员传播详情经文分享.png" alt="组员传播详情经文分享" width="300">
<img src="./example/组织管理成员.png" alt="组织管理成员" width="300">
<img src="./example/行事历新增修改.png" alt="行事历新增修改" width="300">
<img src="./example/行事历日历.png" alt="行事历日历" width="300">
</div>

## install启动问题
### react-native-reanimated 安装失败参考 - windows

react-native-reanimated 打包报错：ninja: error: mkdir(xxxxxx): No such file or directory_reanimatederror: [reanimated] mismatch between jav-CSDN 博客
https://blog.csdn.net/qq_53372572/article/details/143107780

node_modules\react-native-reanimated\android\CMakeLists.txt 文件中加下面的代码

set(CMAKE_OBJECT_PATH_MAX 259)
