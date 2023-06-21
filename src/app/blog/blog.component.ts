import { Component } from '@angular/core';
import Post from '../post.type';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  posts: Post[] = [];
  constructor(postsService: PostsService) {
    this.posts = postsService.getPosts().map((post) => {
      post.thumbnail = `background-image: url("${post.thumbnail}"); background-position: center; background-size: cover;`;
      return post;
    });
  }
}
