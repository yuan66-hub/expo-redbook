//  类目选项类型
type Category = {
    name: string;
    default: boolean;
    isAdd: boolean;
}
// 文章
type ArticleSimple = {
    id: number;
    title: string;
    userName: string;
    avatarUrl: string;
    favoriteCount: number;
    isFavorite: boolean;
    image: string;
    images: string[]
}

type GoodsCategory = {
    id: number;
    name: string;
    image: string;
}

type GoodsSimple = {
    id: number;
    title: string;
    image: string;
    price: number;
    originPrice: number | undefined;
    promotion: string | undefined;
}


type UnRead = {
    unreadFavorate: number,
    newFollow: number,
    comment: number,
};

type MessageListItem = {
    id: number;
    name: lastMessage;
    avatarUrl: string;
    lastMessage?: string;
    lastMessageTime?: string;
}