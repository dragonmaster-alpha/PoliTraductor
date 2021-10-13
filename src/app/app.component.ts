import { Component, NgZone } from '@angular/core';
import { AdMobPlus, BannerAd } from '@admob-plus/capacitor'
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { PluginListenerHandle } from '@capacitor/core';
import { AdMob, AdMobBannerSize, AdMobRewardItem, BannerAdOptions, BannerAdPluginEvents, BannerAdSize, InterstitialAdPluginEvents,BannerAdPosition, RewardAdPluginEvents, AdMobInitializationOptions} from '@capacitor-community/admob';





@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
	
	
 public  bannerBottomOptions: BannerAdOptions = {
  //adId: 'ca-app-pub-3570510427380502/1075136032',
  adId: 'ca-app-pub-3570510427380502/6327995540',
  adSize: BannerAdSize.BANNER,
  position: BannerAdPosition.BOTTOM_CENTER,
  npa: true,
};	
	
public readonly bannerSizes: BannerAdSize[] = Object.keys(BannerAdSize) as BannerAdSize[];
  public currentBannerSize?: BannerAdSize;	
  
    /*private readonly lastBannerEvent$$ = new ReplaySubject<{name: string, value: any}>(1);
  public readonly lastBannerEvent$ = this.lastBannerEvent$$.asObservable()
	private readonly listenerHandlers: PluginListenerHandle[] = [];*/

 private appMargin = 0;
  private bannerPosition: 'top' | 'bottom';	
  

  public isPrepareBanner = false;

			
  constructor( public platform: Platform, private readonly ngZone: NgZone) {
	  
	  
	  
	  SplashScreen.hide();
	  //this.splashScreen.show();
	  
	  SplashScreen.show({
	  	showDuration: 3000,
	  	autoHide: true
	});
	  
	  this.initializeApp();
	  
	
	  
  }
  
  
/*private registerBannerListeners(): void {
    const eventKeys = Object.keys(BannerAdPluginEvents);

    eventKeys.forEach(key => {
      console.log(`registering ${BannerAdPluginEvents[key]}`);
      const handler = AdMob.addListener(BannerAdPluginEvents[key], (value) => {
        console.log(`Banner Event "${key}"`, value);

        this.ngZone.run(() => {
          this.lastBannerEvent$$.next({name: key, value: value});
        })

      });
      this.listenerHandlers.push(handler);

    });
  }*/
  
  /*ionViewWillEnter() {
   
    const resizeHandler = AdMob.addListener(BannerAdPluginEvents.SizeChanged, (info: AdMobBannerSize) => {
      this.appMargin = info.height;
      const app: HTMLElement = document.querySelector('ion-router-outlet');

      if (this.appMargin === 0) {
        app.style.marginTop = '';
        return;
      }

      if (this.appMargin > 0) {
        const body = document.querySelector('body');
        const bodyStyles = window.getComputedStyle(body);
        const safeAreaBottom = bodyStyles.getPropertyValue("--ion-safe-area-bottom");

        
        if (this.bannerPosition === 'top') {
          app.style.marginTop = this.appMargin + 'px';
        } else {
          app.style.marginBottom = `calc(${safeAreaBottom} + ${this.appMargin}px)`;
        }
      }
    });

    this.listenerHandlers.push(resizeHandler);

    //this.registerRewardListeners();
    this.registerBannerListeners();
    //this.registerInterstitialListeners();

  }

  ionViewWillLeave() {
    this.listenerHandlers.forEach(handler => handler.remove());
  }*/
  
  
  
  
  
   public initializeApp() {
	  
	  
	  
    this.platform.ready().then(() => {
		
	  
	  /*this.admob.setDevMode(true);
	  this.admob.BannerAd.show({
        id: {
          android: 'ca-app-pub-3570510427380502/6327995540',
          ios: 'ca-app-pub-3570510427380502/1075136032',
        },
      });*/
      
	  
	 AdMob.initialize({
        requestTrackingAuthorization: true,
      });	
			 
			 
	this.showBottomBanner();
			  
      
      /*export async function banner(): Promise<void> {
		    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
		      // Subscribe Banner Event Listener
		    });
		
		    AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
		      // Subscribe Change Banner Size
		    });
		
		    const options: BannerAdOptions = {
		      adId: 'ca-app-pub-3570510427380502/1075136032',
		      adSize: BannerAdSize.BANNER,
		      position: BannerAdPosition.BOTTOM_CENTER,
		      margin: 0,
		      // isTesting: true
		      // npa: true
		    };
		    AdMob.showBanner(options);
		}*/
	  
	  
	 /* (async () => {
  await AdMobPlus.start()

  const banner = new BannerAd({
	  //iOS
    adUnitId: 'ca-app-pub-3570510427380502/1075136032',
    //ANDROID
    //adUnitId:'ca-app-pub-3570510427380502/6327995540',
  })
  await banner.show()

  AdMobPlus.addListener('banner.impression', async () => {
    await banner.hide()
  })
})()
	  */
	  
        
	    /**** Banner ****/
	  
			/*	  (async () => {
			  await this.admob.start()
			
			  const banner = new this.admob.BannerAd({
			    adUnitId: 'ca-app-pub-3570510427380502/1075136032',
			  })
			  await banner.show();
			
			   this.admob.on('admob.banner.impression').subscribe(async () => {
			   	//await banner.hide();
      			});
			})();*/
          
  
      
      
      		
      		
      		
      		
   
   
   
   //});
  } );
  
   
  
}
   
   
   
   /**
   * ==================== BANNER ====================
   */


  async showBottomBanner() {
    console.log('herehere')
    this.bannerPosition = 'bottom';
    await this.showBanner(this.bannerBottomOptions);
  }

  private async showBanner(options: BannerAdOptions): Promise<void> {
    //const bannerOptions: BannerAdOptions = {  adSize: this.currentBannerSize };
    console.log('Requesting banner with this options', this.bannerBottomOptions);

    const result = await AdMob.showBanner(this.bannerBottomOptions).
      catch(e => console.error(e));
    
    if (result === undefined) {
      return;
    }

    this.isPrepareBanner = true;
  }



  async hideBanner() {
    const result = await AdMob.hideBanner()
      .catch(e => console.log(e));
    if (result === undefined) {
      return;
    }

    const app: HTMLElement = document.querySelector('ion-router-outlet');
    app.style.marginTop = '0px';
    app.style.marginBottom = '0px';
  }

  async resumeBanner() {
    const result = await AdMob.resumeBanner()
      .catch(e => console.log(e));
    if (result === undefined) {
      return;
    }

    const app: HTMLElement = document.querySelector('ion-router-outlet');
    app.style.marginBottom = this.appMargin + 'px';
  }

  async removeBanner() {
    const result = await AdMob.removeBanner()
      .catch(e => console.log(e));
    if (result === undefined) {
      return;
    }

    const app: HTMLElement = document.querySelector('ion-router-outlet');
    app.style.marginBottom = '0px';
    this.appMargin = 0;
    this.isPrepareBanner = false;
  }
  /**
   * ==================== /BANNER ====================
   */
   
   

}