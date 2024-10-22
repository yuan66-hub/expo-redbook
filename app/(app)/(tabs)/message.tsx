import { FlatList,View,StyleSheet } from "react-native"
import Header from "@/components/message/Header"
import Nav from "@/components/message/Nav"
import MesssageItem from "@/components/message/MessageItem"
import icon_no_collection from '@/assets/images/message/icon_no_collection.webp';
import Empty from "@/components/Empty";
import request from "@/utils/request";
import { useEffect, useState } from "react";

export default function Message(){
    const [unRead,setUnRead] = useState<UnRead>()
    const [messageList,setMessageList] = useState<MessageListItem[]>([])

    const onGetUnRead = async () =>{
         const data = await request.get('api/message/getUnRead',{}) as UnRead
         setUnRead(data)
    }
    const onGetMessageList = async () =>{
        const { items=[] } = await request.get('api/message/messageList',{
            data:{
                page:1,
                pageSize:20
            }
        }) as { items:MessageListItem[] }
        setMessageList(items)
    }
    useEffect(()=>{
         Promise.all([onGetUnRead(),onGetMessageList()])
    },[])
    return (
        <View style={styles.root}>
           <Nav></Nav>
            <FlatList
                style={{ flex: 1, }}
                data={messageList}
                extraData={[]}
                keyExtractor={(item) => `${item.id}`}
                renderItem={MesssageItem}
                ListHeaderComponent={<Header unread={unRead} />}
                ListEmptyComponent={<Empty icon={icon_no_collection} tips="暂无消息" />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
})