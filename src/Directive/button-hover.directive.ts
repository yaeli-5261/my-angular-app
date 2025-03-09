import { Directive, ElementRef, Input, Renderer2, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appButtonHover]',
  standalone: true, // כאן הטריק!
})
export class ColorCourseDirective implements OnInit {
  
  @Input() btnColor: string = 'white'; 

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  
  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.btnColor;}

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = "white";
  }
}
