import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export type ListItemProps = {
    item: {
        date: string;
        chineseCalendar: string;
        content: string;
        time?: string;
        location?: string;
        image?: string;
    };
    itemClick?: () => void;
};

// ListItem1
export const ListItem1: React.FC<ListItemProps> = ({ item, itemClick }) => (
    <View>
        <Text style={styles.date}>
            {item.date}{" "}
            <Text style={styles.chineseCalendar}>{item.chineseCalendar}</Text>
        </Text>
        <Pressable onPress={itemClick}>
            <View style={[styles.itemContainer, { backgroundColor: "#EDF6FF" }]}>
                <View style={[styles.contentBeforeIcon, { backgroundColor: "#518AC2" }]}></View>
                <Text style={styles.content}>{item.content}</Text>
                {item.time && <Text style={styles.time}>{item.time}</Text>}
                {item.location && <Text style={styles.location}>{item.location}</Text>}
                {item.image && (
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        onError={() => {
                            console.log("图片加载失败，使用默认占位图片");
                        }}
                    />
                )}
            </View>
        </Pressable>
    </View>
);

// ListItem2
export const ListItem2: React.FC<ListItemProps> = ({ item, itemClick }) => (
    <View>
        <Text style={styles.date}>
            {item.date}{" "}
            <Text style={styles.chineseCalendar}>{item.chineseCalendar}</Text>
        </Text>
        <Pressable onPress={itemClick}>
            <View
                style={[
                    styles.itemContainer,
                    { flexDirection: 'row', justifyContent: "space-between", paddingRight: 0 },
                ]}
            >
                <View style={[styles.contentBeforeIcon, { backgroundColor: "#4CAF50" }]}></View>
                <Text style={[styles.content, { marginLeft: 0, color: '#8A8A8A' }]}>{item.content}</Text>
                <Text style={{
                    color: '#8A8A8A'
                }}>全天</Text>
            </View>
        </Pressable>
    </View>
);

// ListItem3
export const ListItem3: React.FC<ListItemProps> = ({ item, itemClick }) => (
    <View>
        <Text style={styles.date}>
            {item.date}{" "}
            <Text style={styles.chineseCalendar}>{item.chineseCalendar}</Text>
        </Text>
        <Pressable onPress={itemClick}>
            <View style={[styles.itemContainer, { backgroundColor: "#FFFAE6" }]}>
                <View style={[styles.contentBeforeIcon, { backgroundColor: "#FFA500" }]}></View>
                <Text style={styles.content}>{item.content}</Text>
                {item.time && <Text style={styles.time}>{item.time}</Text>}
                {item.location && <Text style={styles.location}>{item.location}</Text>}
                {item.image && (
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        onError={() => {
                            console.log("图片加载失败，使用默认占位图片");
                        }}
                    />
                )}
            </View>
        </Pressable>
    </View>
);

// 样式表
const styles = StyleSheet.create({
    contentBeforeIcon: {
        width: 4,
        height: 18,
        borderRadius: 2,
        position: "absolute",
        top: 10,
        left: 0,
    },
    itemContainer: {
        marginVertical: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        justifyContent: "space-between",
        position: "relative",
    },
    date: {
        fontSize: 14,
        // fontWeight: "bold",
        color: "#333",
    },
    chineseCalendar: {
        fontSize: 14,

        color: "#8A8A8A",
    },
    content: {
        fontSize: 14,
        color: "#363636",
        width: 200,
    },
    time: {
        marginTop: 6,
        marginBottom: 2,
        fontSize: 12,
        color: "#8A8A8A",
    },
    location: {
        fontSize: 12,
        color: "#8A8A8A",
    },
    image: {
        width: 36,
        height: 36,
        borderRadius: 18,
        position: "absolute",
        top: 10,
        right: 13,
    },
});

export default {
    ListItem1,
    ListItem2,
    ListItem3,
};
