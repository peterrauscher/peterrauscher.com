import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import hljs from 'highlight.js';
import Post from 'src/app/post.type';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, AfterViewInit {
  posts: Post[] = [];
  post: Post = new Post();
  postlink = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private router: Router,
    postsService: PostsService
  ) {
    this.posts = postsService.getPosts();
  }
  ngOnInit(): void {
    this.postlink = this.route.snapshot.params['postlink'];
    let matchingPost = this.posts.find((p) => p.permalink === this.postlink);
    if (matchingPost) {
      this.post = matchingPost;
    } else {
      this.router.navigate(['/not-found']);
    }
  }
  ngAfterViewInit(): void {
    this.document.querySelectorAll('code').forEach((el) => {
      hljs.highlightElement(el as HTMLElement);
    });
  }
}
