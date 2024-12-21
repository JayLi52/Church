import HomeScreen from '@screens/HomeScreen';
import SpiritualCultivationHomeScreen from '@screens/SpiritualCultivation/SpiritualCultivationHomeScreen';
import MineScreen from '@screens/UserCenter/MineHome';
import MallScreen from '@screens/UserCenter/MallHome';
import LoginScreen from '@screens/Auth/LoginScreen';
import Logining from '@screens/Auth/Logining';
import MineHome from '@screens/UserCenter/MineHome';
import QrCode from '@screens/UserCenter/MineHome/components/QrCode';
import OrganizationManager from '@screens/Organization/OrganizationManager';
import CalendarScreen from '@screens/Schedule';
import ScheduleList from '@screens/Schedule/list';
import MapViewContainer from '@screens/MapView';
import SpreadStatsAnswerScreen from '@screens/SpreadStats/answer';
import AnnotationList from '@screens/BookManage/AnnotationList';
import ReadingRoomHomeScreen from '@screens/ReadingRoom/ReadingRoomHomeScreen';
import GenealogyScreen from '@screens/BookManage/Genealogy';
import VersionManageScreen from '@screens/BookManage/VersionManage';
import BookIntro from '@screens/BookManage/BookIntro';
import ReadingRoomSearch from '@screens/ReadingRoom/ReadingRoomSearch';

export const mainTabList = [
    {
        name: 'BookManageNavigator',
        options: {
            tabBarLabel: '书籍',
            iconDefault: require('@assets/images/tabbar/book_default.png'),
            iconActive: require('@assets/images/tabbar/book_active.png'),
        },
        screens: [
            {
                name: 'AnnotationList',
                component: AnnotationList,
                options: { headerShown: false }
            },
            {
                name: 'ReadingRoomHomeScreen',
                component: ReadingRoomHomeScreen,
                options: { headerShown: false }
            },
            {
                name: 'VersionManageScreen',
                component: VersionManageScreen,
                options: { headerShown: false }
            },
            {
                name: 'GenealogyScreen',
                component: GenealogyScreen,
                options: { headerShown: false }
            },
            {
                name: 'BookIntro',
                component: BookIntro,
                options: { headerShown: false }
            },
            {
                name: 'ReadingRoomSearch',
                component: ReadingRoomSearch,
                options: { headerShown: false }
            }
        ]
    },
    {
        name: 'OrganizationTask',
        component: SpiritualCultivationHomeScreen,
        options: {
            tabBarLabel: '灵修',
            iconDefault: require('@assets/images/tabbar/task_default.png'),
            iconActive: require('@assets/images/tabbar/task_active.png')
        }
    },
    {
        name: 'OrganizationChat',
        component: HomeScreen,
        options: {
            tabBarLabel: '培训',
            iconDefault: require('@assets/images/tabbar/chat_default.png'),
            iconActive: require('@assets/images/tabbar/chat_active.png')
        }
    },
    {
        name: 'Organization',
        options: {
            tabBarLabel: '活动',
            iconDefault: require('@assets/images/tabbar/organization.png'),
            iconActive: require('@assets/images/tabbar/organization_active.png')
        },
        screens: [
            {
                name: 'OrganizationManager',
                component: OrganizationManager,
                options: { headerShown: false }
            },
            {
                name: 'OrganizationCalendar',
                component: CalendarScreen,
                options: { headerShown: false }
            },
            {
                name: 'OrganizationScheduleList',
                component: ScheduleList,
                options: { headerShown: false }
            },
            {
                name: 'OrganizationMap',
                component: MapViewContainer,
                options: { headerShown: false }
            },
            {
                name: 'SpreadStatsAnswer',
                component: SpreadStatsAnswerScreen,
                options: { headerShown: false }
            }
        ]
    },
    {
        name: 'OrganizationTopic',
        component: HomeScreen,
        options: {
            tabBarLabel: '讨论',
            iconDefault: require('@assets/images/tabbar/topic_default.png'),
            iconActive: require('@assets/images/tabbar/topic_active.png')
        }
    }
];

export const mineTabList = [
    {
        name: 'MineProfile',
        options: {
            tabBarLabel: '个人',
            iconDefault: require('@assets/images/tabbar/chat_default.png'),
            iconActive: require('@assets/images/tabbar/mine_active.png')
        },
        screens: [
            {
                name: 'UserInfoIndex',
                component: MineHome,
                options: { headerShown: false }
            },
            {
                name: 'UserInfoQrCode',
                component: QrCode,
                options: { headerShown: false }
            }
        ]
    },
    {
        name: 'Live',
        component: MineScreen,
        options: {
            tabBarLabel: '生活',
            iconDefault: require('@assets/images/tabbar/book_default.png'),
            iconActive: require('@assets/images/tabbar/book_active.png')
        }
    },
    {
        name: 'Social',
        component: MineScreen,
        options: {
            tabBarLabel: '社交',
            iconDefault: require('@assets/images/tabbar/pray_default.png'),
            iconActive: require('@assets/images/tabbar/pray_active.png')
        }
    },
    {
        name: 'PodCast',
        component: MineScreen,
        options: {
            tabBarLabel: '博客',
            iconDefault: require('@assets/images/tabbar/task_default.png'),
            iconActive: require('@assets/images/tabbar/task_active.png')
        }
    },
    {
        name: 'Mall',
        component: MallScreen,
        options: {
            tabBarLabel: '商城',
            iconDefault: require('@assets/images/tabbar/topic_default.png'),
            iconActive: require('@assets/images/tabbar/topic_active.png')
        }
    }
];

export const authTabList = [
    {
        name: 'Login',
        component: LoginScreen,
        options: {
            tabBarLabel: '登录',
            iconDefault: require('@assets/images/tabbar/login_default.png'),
            iconActive: require('@assets/images/tabbar/login_active.png')
        }
    },
    {
        name: 'Logining',
        component: Logining,
        options: {
            tabBarLabel: '登录中',
            iconDefault: require('@assets/images/tabbar/logining_default.png'),
            iconActive: require('@assets/images/tabbar/logining_active.png')
        }
    }
]; 