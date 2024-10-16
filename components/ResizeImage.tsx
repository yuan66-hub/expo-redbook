import React, { useEffect, useState } from "react";
import { Image, Dimensions } from 'react-native';

type Props = {
    uri: string;
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SHOW_WIDTH = SCREEN_WIDTH - 18 >> 1;

export default ({ uri }: Props) => {

    const [height, setHeight] = useState<number>(200);

    useEffect(() => {
        // 计算图片的高度
        Image.getSize(uri, (width: number, height: number) => {
            const showHeight = SHOW_WIDTH * height / width;
            setHeight(showHeight);
        })
    }, [uri]);

    return (
        <Image
            style={{
                width: SCREEN_WIDTH - 18 >> 1,
                height: height,
                resizeMode: 'cover',
            }}
            source={{ uri: uri }}
        />
    );
}