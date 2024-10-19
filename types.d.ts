//  类目选项类型
type Category = {
  name: string,
  default: boolean,
  isAdd: boolean,
};
// 文章
type ArticleSimple = {
  id: number,
  title: string,
  userName: string,
  avatarUrl: string,
  favoriteCount: number,
  isFavorite: boolean,
  image: string,
  images: string[],
};

type GoodsCategory = {
  id: number,
  name: string,
  image: string,
};

type GoodsSimple = {
  id: number,
  title: string,
  image: string,
  price: number,
  originPrice: number | undefined,
  promotion: string | undefined,
};

type UnRead = {
  unreadFavorate: number,
  newFollow: number,
  comment: number,
};

type MessageListItem = {
  id: number,
  name: lastMessage,
  avatarUrl: string,
  lastMessage?: string,
  lastMessageTime?: string,
};

type ArticleComment = {
  userName: string,
  avatarUrl: string,
  message: string,
  dateTime: string,
  location: string,
  favoriteCount: number,
  isFavorite: boolean,
  children?: ArticleComment[],
};

type Article = {
  id: number,
  title: string,
  desc: string,
  tag: string[],
  dateTime: string,
  location: string,
  userId: number,
  userName: string,
  isFollow: boolean,
  avatarUrl: string,
  images: string[],
  favoriteCount: number,
  collectionCount: number,
  isFavorite: boolean,
  isCollection: boolean,
  comments?: ArticleComment[],
};
