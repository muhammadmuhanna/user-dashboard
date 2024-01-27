import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appLazyLoadImage]'
})
export class LazyLoadImageDirective {
  constructor(private el: ElementRef) {}
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
    if (inView) {
      const src = this.el.nativeElement.getAttribute('data-src');
      this.el.nativeElement.src = src;
    }
  }
}
