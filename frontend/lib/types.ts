export interface Article {
  _id: string;
  title: string;
  link?: string;
  keywords?: string[];
  video_url?: string;
  description?: string;
  content?: { type: string; value: string }[];
  pubDate: string | Date;
  pubDateTZ?: string;
  image_url: string;
  source_id?: string;
  source_name?: string;
  source_url?: string;
  source_icon?: string;
  language?: string;
  category?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}