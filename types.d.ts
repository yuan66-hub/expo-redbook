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
}