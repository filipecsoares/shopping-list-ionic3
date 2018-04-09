import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  // creating a new object
  shoppingItem = {} as ShoppingItem;

  shoppingItemRef$: AngularFireList<ShoppingItem>

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.shoppingItemRef$ = database.list('shopping-list');
  }

  addShoppingItem(shoppingItem: ShoppingItem){
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });
    // reset object
    this.shoppingItem = {} as ShoppingItem;
    // navegate to the ShoppingListPage
    this.navCtrl.pop();
  }
}
