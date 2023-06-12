import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class PostComponent implements OnInit {
  postlink = '';
  meta: Post = {
    title: '',
    date: '',
    content: '',
    thumbnail: '',
    permalink: '',
  };
  content = '';

  constructor(private route: ActivatedRoute, private router: Router) {}
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
}
