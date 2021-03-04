export interface Order{
    orderId?:string;
    userId?: string;
    goodsUrlImg?: string[];
    dataOrder?: string;
    stateOfOrder?: string;
    totalPrice?: number;
    paymentMethod?:string;
}