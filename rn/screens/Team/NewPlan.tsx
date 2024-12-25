import React, {useState, useRef, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import CustomModal, {CustomModalRef} from '@components/CustomModal';
import {transformStyles} from '@utils/index';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import CustomTabs from '@components/Tabs';
import {ProgressBar} from 'react-native-paper';

// 定义单个计划的接口
interface Plan {
  id: string;
  name: string;
  progress: number;
  selected?: boolean;
}

// 定义计划分类的接口
interface PlanSection {
  title: string;     // 分类标题
  key: string;       // 分类唯一标识
  days: number;      // 计划天数
  remainingTime: string;  // 剩余时间
  data: Plan[];      // 该分类下的具体计划
  progress: number;  // 整体进度
}

// 在文件顶部添加路由参数接口
interface NewPlanProps {
  route: {
    params?: {
      mode?: 'create' | 'edit'; // 页面模式：创建/编辑
      planId?: string;          // 编辑时的计划ID
    };
  };
}

const NewPlan = ({route}: NewPlanProps) => {
  // 从路由参数中获取模式，默认为创建模式
  const mode = route.params?.mode || 'create';
  
  // 选中的计划周期（天数）
  const [selectedPeriod, setSelectedPeriod] = useState(180);
  
  // 所有计划数据
  const [allPlans, setAllPlans] = useState<PlanSection[]>([
    {
      title: '新约',
      key: 'new',
      data: [
        {id: '3', name: '创世记', progress: 0.75},
        {id: '4', name: '出埃及记', progress: 0.5},
      ],
      days: 180,
      remainingTime: '100天',
      progress: 0.75,
    },
    {
      title: '旧约',
      key: 'old',
      data: [
        {id: '3', name: '创世记', progress: 0.75},
        {id: '4', name: '出埃及记', progress: 0.5},
      ],
      days: 180,
      remainingTime: '100天',
      progress: 0.75,
    },
    {
      title: '历史书',
      key: 'history',
      data: [{id: '5', name: '历史书1', progress: 0.6}],
      days: 180,
      remainingTime: '100天',
      progress: 0.75,
    },
    {
      title: '诗歌',
      key: 'poetry',
      data: [{id: '6', name: '诗篇', progress: 0.45}],
      days: 180,
      remainingTime: '100天',
      progress: 0.75,
    },
    {
      title: '智慧书',
      key: 'wisdom',
      data: [{id: '7', name: '箴言', progress: 0.5}],
      days: 180,
      remainingTime: '100天',
      progress: 0.75,
    },
  ]);

  const modalRef = useRef<CustomModalRef>(null);
  const [selectedPlans, setSelectedPlans] = useState<number[]>([]);

  useEffect(() => {
    // 初始化选中前三个计划
    setSelectedPlans([0, 1, 2]);
  }, []);

  // 渲染时间选择器
  const renderTimeOptions = () => (
    <View style={styles.timeOptions}>
      {[30, 90, 180, 360].map(days => (
        <TouchableOpacity
          key={days}
          onPress={() => setSelectedPeriod(days)}
          style={[
            styles.timeOption,
            selectedPeriod === days && styles.timeOptionActive,
          ]}>
          <Text
            style={[
              styles.timeOptionText,
              selectedPeriod === days && styles.timeOptionTextActive,
            ]}>
            {days}天
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // 渲染计划进度条
  const renderPlanProgress = (plans: Plan[]) => (
    <>
      {plans.map(plan => (
        <TouchableOpacity
          key={plan.id}
          style={[styles.planCard, plan.selected && styles.planCardSelected]}
          onPress={() => {
            console.log('selectedPlans', selectedPlans);
          }}>
          <View style={styles.progressContainer}>
            <Text style={styles.planName}>{plan.name}</Text>
            <ProgressBar
              progress={plan.progress}
              style={styles.progressBar}
              color="#059973"
            />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );

  // 渲染所有计划列表
  const renderAllPlans = () => (
    <ScrollView style={styles.scrollContainer}>
      <>
        {renderTimeOptions()}
        {allPlans.map(section => (
          <View key={section.key} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {renderPlanProgress(section.data)}
          </View>
        ))}
      </>
    </ScrollView>
  );

  // 渲染计划指标
  const renderPlanMetrics = (plan: PlanSection) => (
    <View style={styles.planMetrics}>
      <View style={styles.metricItem}>
        <FontAwesome name="calendar" size={16} color="#3B8E58" />
        <Text style={styles.metricText}>{plan.days}天</Text>
      </View>
      <View style={styles.metricItem}>
        <FontAwesome
          name="chart-pie"
          size={16}
          color="#3B8E58"
          iconStyle="solid"
        />
        <Text style={styles.metricText}>{plan.progress}%</Text>
      </View>
      <View style={styles.metricItem}>
        <FontAwesome name="clock" size={16} color="#3B8E58" />
        <Text style={styles.metricText}>{plan.remainingTime}</Text>
      </View>
    </View>
  );

  // 渲染单个计划分类的详细内容
  const renderPlanCard = (planSection: PlanSection) => (
    <ScrollView style={styles.scrollContainer}>
      {renderPlanMetrics(planSection)}
      {renderTimeOptions()}
      {renderPlanProgress(planSection.data)}
    </ScrollView>
  );

  // 获取按钮文案
  const getButtonText = () => {
    return mode === 'create' ? '创建计划' : '调整计划';
  };

  // 处理按钮点击
  const handleButtonPress = () => {
    if (mode === 'create') {
      // 创建计划逻辑
      modalRef.current?.open();
    } else {
      // 调整计划逻辑
      console.log('调整计划', selectedPlans);
      // TODO: 实现调整计划的具体逻辑
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {mode === 'create' ? '新建计划' : '调整计划'}
      </Text>
      <CustomTabs
        tabs={[
          {key: 'all', label: '所有', renderItem: renderAllPlans},
          {
            key: 'new',
            label: '新约',
            renderItem: () => renderPlanCard(allPlans[0]),
          },
          {
            key: 'old',
            label: '旧约',
            renderItem: () => renderPlanCard(allPlans[1]),
          },
          {
            key: 'history',
            label: '历史书',
            renderItem: () => renderPlanCard(allPlans[2]),
          },
          {
            key: 'poetry',
            label: '诗歌',
            renderItem: () => renderPlanCard(allPlans[3]),
          },
          {
            key: 'wisdom',
            label: '智慧书',
            renderItem: () => renderPlanCard(allPlans[4]),
          },
        ]}
        onTabChange={key => console.log(key)}
      />
      <TouchableOpacity
        style={[
          styles.createButton,
          mode === 'edit' && styles.editButton, // 编辑模式使用不同样式
        ]}
        onPress={handleButtonPress}>
        <Text style={styles.createButtonText}>{getButtonText()}</Text>
      </TouchableOpacity>
    </View>
  );
};

// 样式定义
const styles = transformStyles({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 14,
    // fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    // padding: 8,
  },
  timeOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  timeOptionActive: {
    backgroundColor: '#FFF7E8',
    borderColor: '#FFB224',
    borderWidth: 1,
  },
  timeOptionText: {
    color: '#2E2E2E',
    fontSize: 14,
  },
  timeOptionTextActive: {
    color: '#FF8800',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  planCardSelected: {
    backgroundColor: '#E8F5E9',
  },
  planMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    marginLeft: 4,
    color: '#3B8E58',
    fontSize: 14,
  },
  progressContainer: {
    marginTop: 8,
  },
  planName: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2E2E2E',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  createButton: {
    backgroundColor: '#FF8800',
    margin: 16,
    padding: 12,
    borderRadius: 22,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#3B8E58', // 编辑模式使用不同的颜色
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewPlan;
