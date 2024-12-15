import { transformStyles } from "@utils/index";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View, Alert, PanResponder } from "react-native";

const MemberCard = ({ item }) => {
    const [showDelete, setShowDelete] = useState(false);

    let longPressTimer;
    const handlePressIn = () => {
        longPressTimer = setTimeout(() => {
            setShowDelete(true); // 显示删除按钮
        }, 800); // 缩短触发时间
    };

    const handlePressOut = () => {
        clearTimeout(longPressTimer);
    };

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
            return Math.abs(gestureState.dx) > 10; // 检测到横向滑动才触发
        },
        onPanResponderMove: (_, gestureState) => {
            if (gestureState.dx < -50) {
                // 向左滑超过 50 像素，显示删除按钮
                setShowDelete(true);
            } else if (gestureState.dx > 50) {
                // 向右滑超过 50 像素，隐藏删除按钮
                setShowDelete(false);
            }
        },
    });

    return (
        <View style={styles.memberCard} {...panResponder.panHandlers}>
            <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.7} // 提高触感效果
                style={[styles.memberGradient, { backgroundColor: item.gradient[0] }]}
            >
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
            </TouchableOpacity>

            <View style={styles.memberContent}>
                <Text style={styles.memberName}>{item.name}</Text>
                <Text style={styles.memberRole}>{item.role}</Text>
                <Text style={styles.memberInfo}>
                    {item.days} {item.joinDate}
                </Text>
                <Text style={styles.memberDetails}>
                    {item.location} | {item.distance} | {item.date}
                </Text>
            </View>

            {showDelete && (
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => Alert.alert('提示', '是否删除成员？', [{ text: '取消' }, { text: '确定' }])}
                >
                    <Text style={styles.deleteText}>删除</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};


const styles = transformStyles({
    // 成员卡片
    memberCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 8,
        marginVertical: 8,
        overflow: "hidden",
    },
    memberGradient: {
        width: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: { width: 40, height: 40, borderRadius: 20 },
    memberContent: { flex: 1, padding: 10 },
    memberName: { fontSize: 16, fontWeight: "bold" },
    memberRole: {
        fontSize: 14,
        color: "#fff",
        backgroundColor: "#FF6E40",
        padding: 4,
        borderRadius: 4,
        alignSelf: "flex-start",
        marginVertical: 5,
    },
    memberInfo: { fontSize: 14, color: "#555", marginVertical: 2 },
    memberDetails: { fontSize: 12, color: "#999" },
    deleteButton: {
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        backgroundColor: "#f9f9f9",
    },
    deleteText: { color: "#FF6E40" },
});

export default MemberCard;
