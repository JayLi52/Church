import React, {useState, useRef, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import CustomModal, {CustomModalRef} from '@components/CustomModal';
import {transformStyles} from '@utils/index';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import CustomTabs from '@components/Tabs';
import {ProgressBar} from 'react-native-paper';

interface Plan {
  id: string;
  name: string;
  progress: number;
  selected?: boolean;
}

interface PlanSection {
  title: string;
  key: string;
  days: number;
  remainingTime: string;
  data: Plan[];
  progress: number;
}

const NewPlan = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(180);
  const [allPlans, setAllPlans] = useState([
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
    setSelectedPlans([0, 1, 2]);
  }, []);

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

  const renderPlanCard = (planSection: PlanSection) => (
    <ScrollView style={styles.scrollContainer}>
      {renderPlanMetrics(planSection)}
      {renderTimeOptions()}
      {renderPlanProgress(planSection.data)}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>当前计划</Text>
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
        style={styles.createButton}
        onPress={() => modalRef.current?.open()}>
        <Text style={styles.createButtonText}>创建计划</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewPlan;
