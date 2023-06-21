interface PostInterface {
  title: string;
  date: string;
  content: string;
  thumbnail: string;
  permalink: string;
}

export default class Post implements PostInterface {
  title: string;
  date: string;
  content: string;
  thumbnail: string;
  permalink: string;
  constructor(
    title: string = '',
    date: string = '',
    content: string = '',
    thumbnail: string = '',
    permalink: string = ''
  ) {
    this.title = title;
    this.date = date;
    this.content = content;
    this.thumbnail = thumbnail;
    this.permalink = permalink;
  }
}
