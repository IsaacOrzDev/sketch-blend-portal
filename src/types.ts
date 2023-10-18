export interface PostRecord {
  id: string;
  prompt: string;
  imageUrl: string;
  sourceImageUrl: string;
  userInfo: {
    name: string;
    imageUrl: string | null;
  };
}
