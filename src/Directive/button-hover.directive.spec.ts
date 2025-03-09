import { ColorCourseDirective } from './button-hover.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('ColorCourseDirective', () => {
  let elementRef: ElementRef;
  let renderer: Renderer2;

  beforeEach(() => {
    elementRef = new ElementRef(document.createElement('button'));
    renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);
  });

  it('should create an instance', () => {
    const directive = new ColorCourseDirective(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});
