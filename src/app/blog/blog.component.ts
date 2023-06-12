import { Component } from '@angular/core';
import posts from 'src/posts.json';

interface Post {
  title: string;
  date: string;
  content: string;
  thumbnail: string;
  permalink: string;
}

let postData = posts.map((p) => {
  const post: Post = {
    title: p.data.title,
    date: new Date(p.data.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    content: p.content,
    thumbnail: `background-image: url("/assets/thumbnails/${p.data.thumbnail}"); background-position: center; background-size: cover;`,
    permalink: p.data.permalink,
  };
  return post;
});

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  posts = postData;
}
