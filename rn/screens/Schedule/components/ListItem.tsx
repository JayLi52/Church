import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const ListItem1 = ({ item }) => (
    <View>
        <Text style={styles.date}>{item.date} <Text style={{
            color: '#8A8A8A'
        }}>{item.chineseCalendar}</Text></Text>
        <View style={styles.itemContainer}>
            <View style={styles.contentBeforeIcon}></View>
            <Text style={styles.content}>{item.content}</Text>
            {item.time && <Text style={styles.time}>{item.time}</Text>}
            {item.location && <Text style={styles.location}>{item.location}</Text>}
            <Image
                source={{ uri: item.image }}
                style={styles.image}
                onError={() => {
                    // 图片加载失败处理，这里简单展示一个默认占位图片（需要提前准备好占位图片资源）
                    console.log("图片加载失败，使用默认占位图片");
                }}
            />
        </View>
    </View>
);

export const ListItem2 = ({ item }) => (
    <View>
        <Text style={styles.date}>{item.date} <Text style={{
            color: '#8A8A8A'
        }}>{item.chineseCalendar}</Text></Text>
        <View style={styles.itemContainer}>
            <View style={styles.contentBeforeIcon}></View>
            <Text style={styles.content}>{item.content}</Text>
            {item.time && <Text style={styles.time}>{item.time}</Text>}
            {item.location && <Text style={styles.location}>{item.location}</Text>}
            <Image
                source={{ uri: item.image }}
                style={styles.image}
                onError={() => {
                    // 图片加载失败处理，这里简单展示一个默认占位图片（需要提前准备好占位图片资源）
                    console.log("图片加载失败，使用默认占位图片");
                }}
            />
        </View>
    </View>
);

export const ListItem3 = ({ item }) => (
    <View>
        <Text style={styles.date}>{item.date} <Text style={{
            color: '#8A8A8A'
        }}>{item.chineseCalendar}</Text></Text>
        <View style={styles.itemContainer}>
            <View style={styles.contentBeforeIcon}></View>
            <Text style={styles.content}>{item.content}</Text>
            {item.time && <Text style={styles.time}>{item.time}</Text>}
            {item.location && <Text style={styles.location}>{item.location}</Text>}
            <Image
                source={{ uri: item.image }}
                style={styles.image}
                onError={() => {
                    // 图片加载失败处理，这里简单展示一个默认占位图片（需要提前准备好占位图片资源）
                    console.log("图片加载失败，使用默认占位图片");
                }}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    contentBeforeIcon: {
        width: 4,
        height: 18,
        backgroundColor: '#3B8E58',
        borderRadius: 2,
        position: 'absolute',
        top: 10,
    },
    itemContainer: {
        backgroundColor: '#EDF6FF',
        marginVertical: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        // flexDirection: 'row',
        justifyContent: 'space-between'
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        fontSize: 14,
        color: '#363636',
        // marginTop: 10,
    },
    time: {
        marginTop: 6,
        marginBottom: 2,
        fontSize: 12,
        color: '#8A8A8A',
    },
    location: {
        fontSize: 12,
        color: '#8A8A8A',
    },
    image: {
        width: 36,
        height: 36,
        borderRadius: 18,
        // marginTop: 10,
        position: 'absolute',
        top: 10,
        right: 13,
    },
})

export default {
    ListItem1,
    ListItem2,
    ListItem3,
}