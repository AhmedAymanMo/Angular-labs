import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appDelay]',
  standalone: true
})
export class DelayDirective implements OnInit {
  private delayTime = 0;

  @Input('appDelay')
  set delay(value: number | string) {
    this.delayTime = Number(value) || 0;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }, this.delayTime);
  }
}
