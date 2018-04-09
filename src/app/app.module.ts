import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { AddShoppingPage } from '../pages/add-shopping/add-shopping';
import { EditShoppingItemPage } from '../pages/edit-shopping-item/edit-shopping-item';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';

@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    AddShoppingPage,
    EditShoppingItemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // initialize angularfire with credential
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    // import the angularFireDatabase to use database interections
    AngularFireDatabaseModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    AddShoppingPage,
    EditShoppingItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
