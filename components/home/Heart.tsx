import React, { useEffect, useState, useRef } from "react";
import {
    Image,
    TouchableOpacity,
    StyleSheet,
    Animated
} from 'react-native';
import icon_heart from '@/assets/images/heart/icon_heart.png';
import icon_heart_empty from '@/assets/images/heart/icon_heart_empty.png';
interface IProps {
    value: boolean;
    onValueChanged?: (value: boolean) => void;
    size?: number;
}

export default function Heart({ value, size = 20, onValueChanged }: IProps) {
    const [showState, setShowState]= useState<boolean>(false);

    const scale = useRef<Animated.Value>(new Animated.Value(0)).current; // 放大缩小

    const alpha = useRef<Animated.Value>(new Animated.Value(0)).current; //透明度
    // 初始化状态
    useEffect(() => {
        setShowState(value);
    }, [value]);

    const onHeartPress = () =>{
        const newState = !showState;
        setShowState(newState);
        onValueChanged?.(newState);
        // 点赞动画效果
        if(newState){
            alpha.setValue(1);
            // 放大透明效果
            const scaleAnim = Animated.timing(scale, {
                toValue: 1.8,
                duration: 300,
                useNativeDriver: false,
            });

            const alphaAnim = Animated.timing(alpha, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false,
                delay: 200,
            });

            Animated.parallel([scaleAnim, alphaAnim], {
                stopTogether: true, // 禁止其中一个动画停止,所有动画都停止
              }).start();
        }else {
            // 重置
            scale.setValue(0);
            alpha.setValue(0);
        }
    }
    return (
        <TouchableOpacity
            onPress={onHeartPress}
        >
            <Image
                style={[styles.container, { width: size , height: size  }]}
                source={showState ? icon_heart : icon_heart_empty}
            />
            <Animated.View style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: size / 20,
                position: 'absolute',
                borderColor: '#ff2442',
                transform: [
                    { scale: scale }
                ],
                opacity: alpha,
            }} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
});
