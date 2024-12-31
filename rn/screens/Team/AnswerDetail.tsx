import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import BaseText from '@components/BaseText';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {transformStyles} from '@utils/index';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {getImageUrl} from '@utils/imgs';

type AnswerType = 'mine' | 'others';

interface Answer {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  location: string;
  answerRate: number;
  answerAmount: number;
}

const AnswerDetail = ({route}: {route: RouteProp<any, any>}) => {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState<AnswerType>('mine');
  const [expanded, setExpanded] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const maxHeight = 80;

  const myAnswer: Answer = {
    id: '1',
    user: {
      name: '用户名称文本信息',
      avatar: getImageUrl(),
    },
    content:
      '回答内容文本信息回答内容文本信息回答内容文本信息回答内容文本信息...回答内容文本信息回答内容文本信息回答内容文本信息回答内容文本信息...回答内容文本信息回答内容文本信息回答内容文本信息回答内容文本信息...回答内容文本信息回答内容文本信息回答内容文本信息回答内容文本信息...回答内容文本信息回答内容文本信息回答内容文本信息回答内容文本信息...',
    date: '24-01-22 14:23',
    location: '四川成都',
    answerRate: 78.2,
    answerAmount: 10,
  };

  const otherAnswers: Answer[] = [
    {
      id: '2',
      user: {
        name: '其他用户',
        avatar: getImageUrl(),
      },
      content: '其他用户的回答内容...',
      date: '2024-08-10 18:21',
      location: '四川成都',
      answerRate: 99.9,
      answerAmount: 5,
    },
    {
      id: '3',
      user: {
        name: '其他用户',
        avatar: getImageUrl(),
      },
      content: '其他用户的回答内容...',
      date: '2024-08-10 18:21',
      location: '四川成都',
      answerRate: 99.9,
      answerAmount: 5,
    },
    {
      id: '4',
      user: {
        name: '其他用户',
        avatar: getImageUrl(),
      },
      content: '其他用户的回答内容...',
      date: '2024-08-10 18:21',
      location: '四川成都',
      answerRate: 99.9,
      answerAmount: 5,
    },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome
          name="arrow-left"
          size={20}
          color="#333"
          iconStyle="solid"
        />
      </TouchableOpacity>
      <BaseText style={styles.headerTitle}>关于五旬节的问题</BaseText>
      <TouchableOpacity onPress={() => {}}>
        <FontAwesome name="xmark" size={20} color="#333" iconStyle="solid" />
      </TouchableOpacity>
    </View>
  );

  const renderQuestion = () => (
    <View style={styles.questionContainer}>
      <BaseText
        style={styles.questionText}
        useExpanded={true}
        isFirstLineIndent={true}>
        五旬节在旧约里也有吗，叫什么名称，是干嘛的，与逾越节在时间上什么关系？这时门徒正在干嘛？这个五旬节与普通的五旬节有什么特别之处？以及这是在所罗门年代的五旬节有什么特别之处？
        五旬节在旧约里也有吗，叫什么名称，是干嘛的，与逾越节在时间上什么关系？这时门徒正在干嘛？这个五旬节与普通的五旬节有什么特别之处？以及这是在所罗门年代的五旬节有什么特别之处？
        五旬节在旧约里也有吗，叫什么名称，是干嘛的，与逾越节在时间上什么关系？这时门徒正在干嘛？这个五旬节与普通的五旬节有什么特别之处？以及这是在所罗门年代的五旬节有什么特别之处？
      </BaseText>
    </View>
  );

  const renderAnswerTabs = (props: any) => {
    const {onTabChange} = props;
    const [currentTab, setCurrentTab] = useState(0);
    const list = [
      {label: '我的回答', value: 0},
      {label: '其他回答', value: 1},
    ];
    const selectTab = (val: number) => {
      if (val === currentTab) return;
      setCurrentTab(val);
    };

    useEffect(() => {
      onTabChange(currentTab);
    }, [currentTab]);

    return (
      <View style={styles.tabListWrap}>
        {list.map(item => {
          const isActive = currentTab === item.value;
          return (
            <Pressable
              key={item.value}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              onPress={() => selectTab(item.value)}>
              <BaseText
                style={[
                  isActive ? styles.tabItemTextActive : styles.tabItemText,
                ]}>
                {item.label}
              </BaseText>
              {isActive && <View style={styles.tabItemActiveLine} />}
            </Pressable>
          );
        })}
      </View>
    );
  };

  const renderAnswer = (answer: Answer) => (
    <View key={answer.id} style={styles.answerCard}>
      <View style={styles.userInfo}>
        <Image source={{uri: answer.user.avatar}} style={styles.avatar} />
        <BaseText style={styles.userName}>{answer.user.name}</BaseText>
      </View>
      <View>
        <BaseText
          style={[styles.answerContent]}
          useExpanded={true}
          lines={3}
          isFirstLineIndent={true}>
          {answer.content}
        </BaseText>
      </View>
      <View style={styles.answerMeta}>
        <BaseText style={styles.metaText}>{answer.date}</BaseText>
        <BaseText style={styles.metaText}>{answer.location}</BaseText>
        <BaseText style={styles.answerAmount}>
          答题数 {answer.answerAmount}
        </BaseText>
        <BaseText style={styles.answerRate}>
          答题率 {answer.answerRate}%
        </BaseText>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.content}>
        {renderQuestion()}
        {renderAnswerTabs({
          onTabChange: (tab: number) => {
            setSelectedType(tab === 0 ? 'mine' : 'others');
          },
        })}
        {selectedType === 'mine' ? (
          renderAnswer(myAnswer)
        ) : (
          <View>
            {otherAnswers.map(answer => (
              <TouchableOpacity
                key={answer.id}
                onPress={() =>
                  navigation.navigate('OrganizationTask', {
                    screen: 'OtherAnswerDetail',
                    params: {answerId: answer.id},
                  })
                }>
                {renderAnswer(answer)}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = transformStyles({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  questionContainer: {
    padding: 16,
    borderBottomWidth: 4,
    borderBottomColor: '#F6F6F6',
  },
  questionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    position: 'relative',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFB224',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 2,
    backgroundColor: '#FFB224',
  },
  answerCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontSize: 14,
    color: '#333',
  },
  answerContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
    // position: 'relative',
  },
  answerMeta: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
  },
  metaText: {
    fontSize: 12,
    color: '#999',
  },
  answerRate: {
    fontSize: 12,
    color: '#52C41A',
  },
  tabListWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  tabItemActive: {
    // borderBottomWidth: 2,
    // borderBottomColor: '#FFB224',
  },
  tabItemText: {
    fontSize: 14,
    color: '#666',
  },
  tabItemTextActive: {
    fontSize: 14,
    color: '#FFB224',
  },
  tabItemActiveLine: {
    position: 'absolute',
    bottom: -10,
    width: 30,
    height: 2,
    backgroundColor: '#FFB224',
  },
  answerContentCollapsed: {
    maxHeight: 80,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  expandButtonText: {
    fontSize: 12,
    color: '#999',
  },
  collapseText: {
    fontSize: 14,
    color: '#FFB224',
    position: 'relative',
    top: 4,
  },
  answerAmount: {
    fontSize: 12,
    color: '#52C41A',
  },
});

export default AnswerDetail;
