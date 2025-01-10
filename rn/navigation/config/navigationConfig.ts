import HomeScreen from '@screens/HomeScreen';
import SpiritualCultivationHomeScreen from '@screens/SpiritualCultivation/SpiritualCultivationHomeScreen';
import MineScreen from '@screens/UserCenter/MineHome';
import LoginScreen from '@screens/Auth/LoginScreen';
import Logining from '@screens/Auth/Logining';
import MineHome from '@screens/UserCenter/MineHome';
import QrCode from '@screens/UserCenter/MineHome/components/QrCode';
import OrganizationManager from '@screens/Organization/OrganizationManager';
import CalendarScreen from '@screens/Schedule';
import ScheduleList from '@screens/Schedule/list';
import MapViewContainer from '@screens/MapView';
import SpreadStatsScreen from '@screens/SpreadStats';
import AnnotationList from '@screens/BookManage/AnnotationList';
import ReadingRoomHomeScreen from '@screens/ReadingRoom/ReadingRoomHomeScreen';
import ImmersiveReadingScreen from '@screens/BookManage/ImmersiveReading';
import VersionManageScreen from '@screens/BookManage/VersionManage';
import BookIntro from '@screens/BookManage/BookIntro';
import ReadingRoomSearch from '@screens/ReadingRoom/ReadingRoomSearch';
import { TabItem } from '@components/Navigator';
import UserReadingDetail from '@screens/Team/UserReadingDetail';
import MinReadingTime from '@screens/Team/MinReadingTime';
import Topic from '@screens/Team/Topic';
import SkipTime from '@screens/Team/SkipTime';
import AdjustPlan from '@screens/Team/AdjustPlan';
import Live from '@screens/Team/Live';
import AddAnswer from '@screens/Team/AddAnswer';
import CompleteQuestion from '@screens/Team/CompleteQuestion';
import BookIntroTwo from '@screens/ReadingRoom/BookIntroTwo';
import ReadingList from '@screens/BookManage/ReadingList';
import AudioPlayer from '@screens/BookManage/AudioPlayer';
import { CommentList } from '@screens/BookManage/components/CommentList';
import {CommentDetail} from '@screens/BookManage/components/CommentDetail';
import LingxiuHome from '@screens/Lingxiu/LingXiuHome';
import TeamQuestion from '@screens/Team/TeamQuestions';
import QuestionDetail from '@screens/Team/QuestionDetail';
import AnsweredList from '@screens/Team/AnsweredList';
import AnswerDetail from '@screens/Team/AnswerDetail';
import UserProfile from '@screens/UserCenter/UserProfile';
import {useTabBarLabel} from '@hooks/useTabBarLabel';
import LingxiuHomeManage from '@screens/Lingxiu/LingxiuHomeManage';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import MemberSpreadDetail from '@screens/SpreadStats/MemberSpreadDetail';

export const useMainTabList = (): TabItem[] => {
  const getLabel = useTabBarLabel({
    BookManageNavigator: '书籍',
    OrganizationTask: '灵修',
    OrganizationChat: '培训',
    Organization: '活动',
    OrganizationTopic: '讨论',
  });
  const pageType = useSelector((state: RootState) => state.page.pageType);

  return [{
    name: 'BookManageNavigator',
    options: {
      tabBarLabel: getLabel('BookManageNavigator'),
      iconDefault: require('@assets/images/tabbar/book_default.png'),
      iconActive: require('@assets/images/tabbar/book_active.png'),
    },
    stackScreens: [
      {
        name: 'BookIndex',
        renderComponent: pageType === 'teamManage' ? VersionManageScreen : ReadingRoomHomeScreen,
        options: { headerShown: false },
      },
      {
        name: 'BookIntro',
        renderComponent: BookIntro,
        options: { headerShown: false },
      },
      {
        name: 'BookIntroTwo',
        renderComponent: BookIntroTwo,
        options: { headerShown: false },
      },
      {
        name: 'AnnotationList',
        renderComponent: AnnotationList,
        options: { headerShown: false },
      },
      {
        name: 'VersionManageScreen',
        renderComponent: VersionManageScreen,
        options: { headerShown: false },
      },
      {
        name: 'ImmersiveReadingScreen',
        renderComponent: ImmersiveReadingScreen,
        options: { headerShown: false },
      },
      {
        name: 'ReadingRoomSearch',
        renderComponent: ReadingRoomSearch,
        options: { headerShown: false },
      },
      {
        name: 'ReadingListScreen',
        renderComponent: ReadingList,
        options: { headerShown: false },
      },
      {
        name: 'AudioPlayer',
        renderComponent: AudioPlayer,
        options: { headerShown: false },
      },
      {
        name: 'CommentList',
        renderComponent: CommentList,
        options: { headerShown: false },
      },
      {
        name: 'CommentDetail',
        renderComponent: CommentDetail,
        options: {
          headerShown: false,
        },
      },
    ],
  },
  {
    name: 'OrganizationTask',
    options: {
      tabBarLabel: getLabel('OrganizationTask'),
      iconDefault: require('@assets/images/tabbar/task_default.png'),
      iconActive: require('@assets/images/tabbar/task_active.png'),
    },
    stackScreens: [
      {
        name: 'LingxiuHome',
        renderComponent: pageType === 'teamManage' ? LingxiuHomeManage : LingxiuHome,
        options: { headerShown: false },
      },
      {
        name: 'SpiritualCultivationHomeScreen',
        renderComponent: SpiritualCultivationHomeScreen,
        options: { headerShown: false },
      },
      {
        name: 'ImmersiveReadingScreen',
        renderComponent: ImmersiveReadingScreen,
        options: { headerShown: false },
      },
      {
        name: 'TeamQuestion',
        renderComponent: TeamQuestion,
        options: { headerShown: false },
      },
      {
        name: 'QuestionDetail',
        renderComponent: QuestionDetail,
        options: { headerShown: false },
      },
      {
        name: 'AnsweredList',
        renderComponent: AnsweredList,
        options: { headerShown: false },
      },
      {
        name: 'AnswerDetail',
        renderComponent: AnswerDetail,
        options: { headerShown: false },
      },
    ],
  },
  {
    name: 'Organization',
    options: {
      tabBarLabel: getLabel('Organization'),
      iconDefault: require('@assets/images/tabbar/organization.png'),
      iconActive: require('@assets/images/tabbar/organization_active.png'),
    },
    stackScreens: [
      {
        name: 'OrganizationIndex',
        renderComponent: pageType === 'teamManage' ? OrganizationManager : OrganizationManager,
        options: { headerShown: false },
      },
      {
        name: 'CompleteQuestion',
        renderComponent: CompleteQuestion,
        options: { headerShown: false },
      },
      {
        name: 'AddAnswer',
        renderComponent: AddAnswer,
        options: { headerShown: false },
      },
      {
        name: 'AdjustPlan',
        renderComponent: AdjustPlan,
        options: { headerShown: false },
      },
      {
        name: 'MinReadingTime',
        renderComponent: MinReadingTime,
        options: { headerShown: false },
      },
      {
        name: 'UserReadingDetail',
        renderComponent: UserReadingDetail,
        options: { headerShown: false },
      },
      
      {
        name: 'OrganizationCalendar',
        renderComponent: CalendarScreen,
        options: { headerShown: false },
      },
      {
        name: 'OrganizationScheduleList',
        renderComponent: ScheduleList,
        options: { headerShown: false },
      },
      {
        name: 'OrganizationMap',
        renderComponent: MapViewContainer,
        options: { headerShown: false },
      },
      {
        name: 'SpreadStats',
        renderComponent: SpreadStatsScreen,
        options: { headerShown: false },
      },
      {
        name: 'MemberSpreadDetail',
        renderComponent: MemberSpreadDetail,
        options: { headerShown: false },
      },
      {
        name: 'Live',
        renderComponent: Live,
        options: { headerShown: false },
      },
      {
        name: 'SkipTime',
        renderComponent: SkipTime,
        options: { headerShown: false },
      },
      {
        name: 'Topic',
        renderComponent: Topic,
        options: { headerShown: false },
      },
    ],
  },
  {
    name: 'OrganizationTopic',
    options: {
      tabBarLabel: '讨论',
      iconDefault: require('@assets/images/tabbar/topic_default.png'),
      iconActive: require('@assets/images/tabbar/topic_active.png'),
    },
    stackScreens: [
      {
        name: 'UserProfile',
        renderComponent: UserProfile,
        options: { headerShown: false },
      },
      {
        name: 'OrganizationTopicHome',
        renderComponent: HomeScreen,
        options: { headerShown: false },
      },
    ],
  },
  ];
};

export const useMineTabList = (): TabItem[] => [
  {
    name: 'MineProfile',
    options: {
      tabBarLabel: '个人',
      iconDefault: require('@assets/images/tabbar/chat_default.png'),
      iconActive: require('@assets/images/tabbar/mine_active.png'),
    },
    stackScreens: [
      {
        name: 'UserInfoIndex',
        renderComponent: MineHome,
        options: { headerShown: false },
      },
      {
        name: 'UserInfoQrCode',
        renderComponent: QrCode,
        options: { headerShown: false },
      },
    ],
  },
  {
    name: 'Live',
    options: {
      tabBarLabel: '生活',
      iconDefault: require('@assets/images/tabbar/book_default.png'),
      iconActive: require('@assets/images/tabbar/book_active.png'),
    },
    stackScreens: [
      {
        name: 'LiveHome',
        renderComponent: MineScreen,
        options: { headerShown: false },
      },
    ],
  },
  {
    name: 'Social',
    options: {
      tabBarLabel: '社交',
      iconDefault: require('@assets/images/tabbar/pray_default.png'),
      iconActive: require('@assets/images/tabbar/pray_active.png'),
    },
    stackScreens: [
      {
        name: 'UserProfile',
        renderComponent: MineScreen,
        options: { headerShown: false },
      },
      {
        name: 'SocialHome',
        renderComponent: MineScreen,
        options: { headerShown: false },
      },
    ],
  },
  {
    name: 'PodCast',
    options: {
      tabBarLabel: '博客',
      iconDefault: require('@assets/images/tabbar/task_default.png'),
      iconActive: require('@assets/images/tabbar/task_active.png'),
    },
    stackScreens: [
      {
        name: 'PodCastHome',
        renderComponent: MineScreen,
        options: { headerShown: false },
      },
    ],
  },
  {
    name: 'Mall',
    options: {
      tabBarLabel: '商城',
      iconDefault: require('@assets/images/tabbar/topic_default.png'),
      iconActive: require('@assets/images/tabbar/topic_active.png'),
    },
    stackScreens: [
      {
        name: 'MallHome',
        renderComponent: MineScreen,
        options: { headerShown: false },
      },
    ],
  },
];

export const useAuthTabList = (): TabItem[] => [
  {
    name: 'Login',
    options: {
      tabBarLabel: '登录',
    },
    stackScreens: [
      {
        name: 'LoginScreen',
        renderComponent: LoginScreen,
        options: { headerShown: false },
      }
    ]
  },
  {
    name: 'Logining',
    options: {
      tabBarLabel: '登录中',
    },
    stackScreens: [
      {
        name: 'LoginingScreen',
        renderComponent: Logining,
        options: { headerShown: false },
      }
    ]
  },
];
