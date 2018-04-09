import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AddShoppingPage } from '../add-shopping/add-shopping';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: Observable<ShoppingItem[]>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private database: AngularFireDatabase, 
    private actionSheetCtrl: ActionSheetController) {
    this.shoppingListRef$ = this.database.list<ShoppingItem[]>('shopping-list').snapshotChanges()
    .map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    });
  }

  selectShoppingItem(shoppingItem: ShoppingItem) {
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        { 
          text: 'Edit',
          handler: () => {
            this.navCtrl.push(EditShoppingItemPage, { shoppingItemId: shoppingItem.key});
          }
        },{
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.database.list('shopping-list').remove(shoppingItem.key);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    }).present();
  }

  navigateToAddShoppingPage() {
    // navigate to addShoppingPage
    this.navCtrl.push(AddShoppingPage);
  }
}
