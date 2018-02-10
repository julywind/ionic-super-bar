import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { HTTP } from "@ionic-native/http";
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  // pages: Array<{title: string, component: any, icon: string}>;
  pages:any =[];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private http: HTTP,public alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'List', component: ListPage, icon: 'list' }
    ];
    this.loadData();
  }

  showAlert(msg,title) {
    let alert = this.alertCtrl.create({
      title: title || 'alert',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();

      // Transparent status bar for android
      // #AARRGGBB where AA is an alpha value
      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString("#00000000");
      }

      this.splashScreen.hide();
    });
  }

  loadData(){
    this.http.get("http://dynamicedu.wps.cn/API/heads",{},{}).then(res => {
      console.log(res);
      //返回结果，直接是json形式
      this.pages = JSON.parse(res.data);
      this.showAlert(res.data,"succeed");
      if(this.pages.length>0){
        this.openPage(this.pages[0]);
      }
    }).catch(error => {
      //错误信息
      console.log(error)
      this.showAlert(JSON.stringify(error),"failed");
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    this.rootPage.setCategoryId(page.id);
  }
}
