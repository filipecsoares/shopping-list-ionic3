import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemSubscription: Subscription
  shoppingItemRef$: Observable<ShoppingItem>
  objectShoppingItem: AngularFireObject<ShoppingItem>
  shoppingItem = {} as ShoppingItem;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    const shoppingItemId = this.navParams.get('shoppingItemId');
    this.objectShoppingItem = this.database.object(`shopping-list/${shoppingItemId}`);
    this.shoppingItemRef$ = this.objectShoppingItem.snapshotChanges().map(c => {
      return { key: c.payload.key, ...c.payload.val() };
    });
    this.shoppingItemSubscription = this.shoppingItemRef$.subscribe(shoppingItem => this.shoppingItem = shoppingItem);
  }

  editShoppingItem(shoppingItem: ShoppingItem){
    this.objectShoppingItem.update(shoppingItem);
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    this.shoppingItemSubscription.unsubscribe();
  }

}
