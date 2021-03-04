import { Component, 
        OnInit,
        OnDestroy, 
        ViewChild,
        ViewContainerRef,
        ComponentFactoryResolver,
        ComponentRef,
        ComponentFactory } from '@angular/core';

import { ModalComponent } from '../modal/modal.component';
import { Subscription } from 'rxjs';
import { Goods } from 'src/app/interfaces/Goods';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy{

  //componentRef: ComponentFactory<ModalComponent>;
  goodsList : Array<Goods> = [];
  subscriber : Subscription;
  @ViewChild('componentModal', {static :false , read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(private goods : GoodsService,
              private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.subscriber  = this.goods.getAllGoods().subscribe((data) =>{
      this.goodsList = data;
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  addtoCart(good) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    let componentRef = this.entry.createComponent(factory);
    componentRef.instance.good = good;
}

/*destroyComponent() {
    this.componentRef.destroy();
}*/


}
