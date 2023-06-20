import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import hljs from 'highlight.js';
import posts from 'src/posts.json';

interface Post {
  title: string;
  date: string;
  content: string;
  thumbnail: string;
  permalink: string;
}

let postData = posts.filter(Boolean).map((p) => {
  const post: Post = {
    title: p.data.title,
    date: new Date(p.data.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    content: p.content,
    thumbnail: `/assets/thumbnails/${p.data.thumbnail}`,
    permalink: p.data.permalink,
  };
  return post;
});
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, AfterViewInit {
  postlink = '';
  meta: Post = {
    title: '',
    date: '',
    content: '',
    thumbnail: '',
    permalink: '',
  };
  content = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.postlink = this.route.snapshot.params['postlink'];
    let postMeta = postData.find((p) => p.permalink === this.postlink);
    if (postMeta) {
      this.meta = postMeta;
      this.content = postMeta.content;
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
