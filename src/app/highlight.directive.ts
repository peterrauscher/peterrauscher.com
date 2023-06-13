import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import hljs from 'highlight.js';

@Directive({
  selector: 'code',
})
export class HighlightDirective implements AfterViewInit {
  constructor(private elRef: ElementRef) {}
  ngAfterViewInit(): void {
    hljs.highlightBlock(this.elRef.nativeElement);
  }
}
