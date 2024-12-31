import React, {useState, useRef, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import CustomModal, {CustomModalRef} from '@components/CustomModal';
import {commonStyles, transformStyles} from '@utils/index';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import CustomTabs from '@components/Tabs';
import {ProgressBar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '@store/store';
import MinReadingTime from './MinReadingTime';

// 定义单个计划的接口
interface Plan {
  id: string;
  name: string;
  progress: number;
  selected?: boolean;
  date?: string;
}

// 定义计划分类的接口
interface PlanSection {
  title: string; // 分类标题
  key: string; // 分类唯一标识
  days: number; // 计划天数
  remainingTime: string; // 剩余时间
  data: Plan[]; // 该分类下的具体计划
  progress: number; // 整体进度
}

// 在文件顶部添加路由参数接口
interface NewPlanProps {
  route?: {
    params?: {
      mode?: 'create' | 'edit'; // 页面模式：创建/编辑
      planId?: string; // 编辑时的计划ID
    };
  };
  onClose: () => void;
}

const AdjustPlan = ({route, onClose}: NewPlanProps) => {
  const userRole = useSelector((state: RootState) => state.global.user.role);
  const mode = route?.params?.mode || 'edit';
  const modalMinReadingTimeRef = useRef<CustomModalRef>(null);

  // 添加组员可选择的计划类型
  const memberPlanTypes = [
    {key: 'plan1', label: '计划1'},
    {key: 'plan2', label: '计划2'},
    {key: 'plan3', label: '计划3'},
  ];

  // 选中的计划周期（天数）
  const [selectedPeriod, setSelectedPeriod] = useState(180);

  // 所有计划数据
  const [allPlans, setAllPlans] = useState<PlanSection[]>([
    {
      title: '新约',
      key: 'new',
      data: [
        {id: '3', name: '创世记', progress: 0.75},
        {id: '4', name: '出埃及记', progress: 0.5, selected: true},
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
        {id: '4', name: '出埃及记', progress: 0.5, selected: true},
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

  const [initialPlans] = useState<number[]>([0, 1, 2]); // 保存初始选中的计划
  const [selectedPlans, setSelectedPlans] = useState<number[]>(initialPlans);

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

  // 处理计划选择
  const handlePlanSelect = (planId: string) => {
    setAllPlans(prevPlans =>
      prevPlans.map(section => ({
        ...section,
        data: section.data.map(plan => {
          if (plan.id === planId) {
            const isSelected = !plan.selected;
            const planIndex = parseInt(plan.id);

            // 更新 selectedPlans
            if (isSelected) {
              setSelectedPlans(prev => [...prev, planIndex]);
            } else {
              setSelectedPlans(prev => prev.filter(id => id !== planIndex));
            }

            return {...plan, selected: isSelected};
          }
          return plan;
        }),
      })),
    );
  };

  // 检查是否可以调整计划
  const canAdjustPlan = () => {
    return (
      JSON.stringify(selectedPlans.sort()) !==
      JSON.stringify(initialPlans.sort())
    );
  };

  // 渲染计划进度条
  const renderPlanProgress = (plans: Plan[]) => (
    <>
      {plans.map(plan => (
        <TouchableOpacity
          key={plan.id}
          style={[styles.planCard, plan.selected && styles.planCardSelected]}
          onPress={() => handlePlanSelect(plan.id)}>
          <View style={styles.progressContainer}>
            <Text style={styles.planName}>{plan.name}</Text>
            <ProgressBar
              progress={plan.progress}
              style={styles.progressBar}
              color="#059973"
            />
            <Text style={styles.timeSlice}>{plan.timeSlice || '999h'}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );

  // 渲染所有计划列表
  const renderAllPlans = () => (
    <View style={styles.planCardContainer}>
      {renderTimeOptions()}
      <ScrollView style={styles.scrollContainer}>
        {allPlans.map(section => (
          <View key={section.key} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {renderPlanProgress(section.data)}
          </View>
        ))}
      </ScrollView>
    </View>
  );

  // 渲染计划指标
  const renderPlanMetrics = () => (
    <View style={styles.planMetrics}>
      <View style={styles.metricItem}>
        <FontAwesome
          name="calendar"
          size={16}
          color="#3B8E58"
          style={commonStyles.icon}
          iconStyle="solid"
        />
        <Text style={styles.metricText}>99天</Text>
      </View>
      <View style={styles.metricItem}>
        <FontAwesome
          name="chart-pie"
          size={16}
          color="#3B8E58"
          style={commonStyles.icon}
          iconStyle="solid"
        />
        <Text style={styles.metricText}>40%</Text>
      </View>
      <View style={styles.metricItem}>
        <FontAwesome
          name="clock"
          size={16}
          color="#3B8E58"
          style={commonStyles.icon}
          iconStyle="solid"
        />
        <Text style={styles.metricText}>999小时59分</Text>
      </View>
    </View>
  );

  // 渲染单个计划分类的详细内容
  const renderPlanCard = (planSection: PlanSection) => (
    <View style={styles.planCardContainer}>
      {mode === 'edit' && renderPlanMetrics()}
      {renderTimeOptions()}
      <ScrollView style={styles.scrollContainer}>
        {renderPlanProgress(planSection.data)}
      </ScrollView>
    </View>
  );

  // 获取按钮文案
  const getButtonText = () => {
    return mode === 'create' ? '创建计划' : '调整计划';
  };

  // 处理按钮点击
  const handleButtonPress = () => {
    if (mode === 'create') {
      // 创建计划逻辑
      modalMinReadingTimeRef.current?.open();
    } else {
      // 调整计划逻辑
      console.log('调整计划', selectedPlans);
      // TODO: 实现调整计划的具体逻辑
    }
  };

  // 处理计划创建/调整完成
  const handlePlanComplete = () => {
    if (mode === 'create') {
      modalMinReadingTimeRef.current?.open();
    } else {
      onClose();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {userRole === 'leader'
          ? mode === 'create'
            ? '新建计划'
            : '调整计划'
          : '选择计划'}
      </Text>
      <View style={styles.tabsContainer}>
        <CustomTabs
          tabs={[
            // 如果是组员，添加计划类型选项
            ...(userRole === 'member'
              ? memberPlanTypes.map(type => ({
                  key: type.key,
                  label: type.label,
                  renderItem: () => renderAllPlans(),
                }))
              : []),
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
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.createButton} onPress={onClose}>
          <FontAwesome
            style={commonStyles.icon}
            name="xmark"
            size={18}
            color="#333"
            iconStyle="solid"
          />
        </TouchableOpacity>
        {userRole === 'leader' && (
          <TouchableOpacity
            style={[
              styles.createButton,
              !canAdjustPlan() && styles.createButtonDisabled,
            ]}
            onPress={handlePlanComplete}
            disabled={!canAdjustPlan()}>
            <FontAwesome
              style={commonStyles.icon}
              name="check"
              size={18}
              color={canAdjustPlan() ? '#333' : '#999'}
              iconStyle="solid"
            />
            <Text
              style={[
                styles.createButtonText,
                !canAdjustPlan() && styles.createButtonTextDisabled,
              ]}>
              {mode === 'create' ? '创建计划' : '调整计划'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 最小阅读时间弹窗 */}
      <CustomModal ref={modalMinReadingTimeRef}>
        <MinReadingTime
          onConfirm={time => {
            console.log('设置最小阅读时间:', time);
            modalMinReadingTimeRef.current?.close();
            onClose();
          }}
          onSkip={() => {
            console.log('使用默认最小阅读时间: 30min');
            modalMinReadingTimeRef.current?.close();
            onClose();
          }}
        />
      </CustomModal>
    </View>
  );
};

// 样式定义
const styles = transformStyles({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    maxHeight: 600,
  },
  tabsContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
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
    paddingHorizontal: 24,
    backgroundColor: '#fff',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planCardSelected: {
    backgroundColor: '#E8F5E9',
  },
  planMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  metricText: {
    marginLeft: 8,
    color: '#3B8E58',
    fontSize: 14,
  },
  progressContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  planName: {
    fontSize: 16,
    // marginBottom: 8,
    color: '#2E2E2E',
    width: 50,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    // flex: 1,
    width: 200,
  },
  timeSlice: {
    fontSize: 16,
    color: '#666',
    // marginTop: 8,
  },
  createButton: {
    margin: 16,
    padding: 12,
    borderRadius: 22,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  // editButton: {
  //   backgroundColor: '#3B8E58', // 编辑模式使用不同的颜色
  // },
  createButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planCardContainer: {
    flex: 1,
    // paddingTop: 160,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonTextDisabled: {
    color: '#999',
  },
});

export default AdjustPlan;
