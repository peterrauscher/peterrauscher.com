import { Injectable } from '@angular/core';
import Post from 'src/app/post.type';
import posts from 'src/posts.json';

let postData = posts.map((p) => {
  return new Post(
    p.data.title,
    new Date(p.data.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    p.content,
    `/assets/thumbnails/${p.data.thumbnail}`,
    p.data.permalink
  );
});

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  getPosts() {
    return postData;
  }
  constructor() {}
}
