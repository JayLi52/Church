import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ReadingRoomSearch from '@screens/ReadingRoom/ReadingRoomSearch'

const Stack = createNativeStackNavigator()

export default function ReadingRoomNavigator () {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReadingRoomSearch" component={ReadingRoomSearch} />
    </Stack.Navigator>
  )
}