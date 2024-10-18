import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'

interface IProps {
    categoryList: Category[];
    onCategoryChange?: (category: Category) => void; // 回调函数
}

import icon_arrow from '@/assets/images/home/icon_arrow.png'
import CategoryModal from './CategoryModal';

export default function CategoryList({ categoryList, onCategoryChange }: IProps) {
    const [category,setCategory] = useState<Category>()
    const scrollViewRef = useRef<any>(null)
    const modalRef = useRef<any>(null)
    const onCategoryPress = (item:Category,index:number) =>{
        setCategory(item)
        onCategoryChange?.(item)
        scrollViewRef.current?.scrollTo?.({
            x: index * 40, y: 0, animated: true
        })
    }
    return (
       <>
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                ref={scrollViewRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false} //隐藏水平滚动条
            >
                {categoryList.map((item: Category, index: number) => {
                    const isSelected = item.name === category?.name;
                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.tabItem}
                            onPress={() => onCategoryPress(item,index)}
                        >
                            <Text style={isSelected ? styles.tabItemTxtSelected : styles.tabItemTxt}>{item.name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            <TouchableOpacity
                style={styles.openButton}
                onPress={() => {
                  // 打开抽屉    
                  modalRef.current?.show()
                }}
            >
                <Image style={styles.openImg} source={icon_arrow} />
            </TouchableOpacity>
        </View>
        <CategoryModal ref={modalRef} categoryList={categoryList}></CategoryModal>
       </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 36,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 6,
    },
    scrollView: {
        flex: 1,
        height: '100%',
    },
    openButton: {
        width: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    openImg: {
        width: 18,
        height: 18,
        transform: [{ rotate: '-90deg' }]
    },
    tabItem: {
        width: 64,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabItemTxt: {
        fontSize: 16,
        color: '#999',
    },
    tabItemTxtSelected: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
});