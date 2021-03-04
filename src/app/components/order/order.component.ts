import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { OrderService } from "src/app/services/order.service";
import { Order } from "src/app/interfaces/Order";
import { map, switchMap } from "rxjs/operators";
import { GoodsService } from "src/app/services/goods.service";
import { Goods } from "src/app/interfaces/Goods";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  orderListe: Order[] = [];
  goodsImgList: Map<string,string[]> = new Map<string,string[]>();

  constructor(
    private auth: AuthService,
    private order: OrderService,
    private good: GoodsService
  ) {}

  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    this.auth
      .isConnected()
      .pipe(
        map((data) => data.uid),
        switchMap((id) => this.order.getOrder(id))
      )
      .subscribe((dataOrder) => {
        this.orderListe = dataOrder;
      });
  }

  getGoodById(id: string) {
    return this.good.getGood(id);
  }
}
