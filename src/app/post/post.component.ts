import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  postlink = '';

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.postlink = this.route.snapshot.params['postlink'];
  }
}
