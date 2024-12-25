import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {transformStyles} from '@utils/index';
import FontAwesome from '@react-native-vector-icons/fontawesome6';

interface AddAnswerProps {
  navigation: any;
}

const AddAnswer: React.FC<AddAnswerProps> = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  // 模拟已完成的用户数据
  const completedUsers = [
    {id: '1', avatar: 'http://gips2.baidu.com/it/u=1674525583,3037683813&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024'},
    {id: '2', avatar: 'http://gips2.baidu.com/it/u=1674525583,3037683813&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024'},
    {id: '3', avatar: 'http://gips2.baidu.com/it/u=1674525583,3037683813&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024'},
  ];

  const renderCompletedUsers = () => (
    <View style={styles.usersContainer}>
      <View style={styles.avatarList}>
        {completedUsers.map((user, index) => (
          <Image
            key={user.id}
            source={{uri: user.avatar}}
            style={[
              styles.avatar,
              {marginLeft: index > 0 ? -10 : 0},
            ]}
          />
        ))}
      </View>
      <Text style={styles.completedText}>9999人已完成</Text>
    </View>
  );

  const renderLocationInfo = () => (
    <View style={styles.locationContainer}>
      <Text style={styles.dateText}>2024-08-10</Text>
      <Text style={styles.locationText}>四川成都</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} color="#333" iconStyle="solid" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>小组习题</Text>
        <TouchableOpacity>
          <FontAwesome name="trash" size={20} color="#FF3B30" iconStyle="solid" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.questionCard}>
          <View style={styles.progressContainer}>
            <Image
              source={{uri: 'https://example.com/question-image.jpg'}}
              style={styles.questionImage}
            />
            <View style={styles.progressBar}>
              <View style={[styles.progress, {width: '65%'}]} />
            </View>
            <Text style={styles.progressText}>65%</Text>
          </View>

          <TextInput
            style={styles.titleInput}
            placeholder="关于五旬节的问题"
            value={title}
            onChangeText={setTitle}
          />

          <View style={styles.infoContainer}>
            <FontAwesome name="lightbulb" size={16} color="#3B8E58" />
            {renderCompletedUsers()}
          </View>

          {renderLocationInfo()}
        </View>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>添加习题</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = transformStyles({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  progressContainer: {
    marginBottom: 16,
  },
  questionImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E8E8E8',
    borderRadius: 2,
  },
  progress: {
    height: '100%',
    backgroundColor: '#3B8E58',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  titleInput: {
    fontSize: 16,
    color: '#333',
    padding: 0,
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  usersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatarList: {
    flexDirection: 'row',
    marginRight: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  completedText: {
    fontSize: 12,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginRight: 16,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#FF8800',
    margin: 16,
    padding: 12,
    borderRadius: 22,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddAnswer;
