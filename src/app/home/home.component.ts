import { Component } from '@angular/core';
import Post from '../post.type';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  posts: Post[] = [];
  constructor(postsService: PostsService) {
    this.posts = postsService.getPosts().map((post) => {
      post.thumbnail = `height: 225px; background-image: url("${post.thumbnail}"); background-position: center; background-size: cover;`;
      return post;
    });
  }
}
