### react-native-reanimated 安装失败参考 - windows

react-native-reanimated 打包报错：ninja: error: mkdir(xxxxxx): No such file or directory_reanimatederror: [reanimated] mismatch between jav-CSDN 博客
https://blog.csdn.net/qq_53372572/article/details/143107780

node_modules\react-native-reanimated\android\CMakeLists.txt 文件中加下面的代码

set(CMAKE_OBJECT_PATH_MAX 259)

![学经小组学经用户](./example/学经小组学经用户.png)
![组员传播详情经文分享](./example/组员传播详情经文分享.png)
![组织管理成员](./example/组织管理成员.png)
![行事历新增修改](./example/行事历新增修改.png)
![行事历日历](./example/行事历日历.png)
