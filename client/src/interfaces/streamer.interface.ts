export interface Streamer {
  _id: string;
  name: string;
  platform: string;
  description: string;
  imageUrl?: string;
  upvotes: number;
  downvotes: number;
}
