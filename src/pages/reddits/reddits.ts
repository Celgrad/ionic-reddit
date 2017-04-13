import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RedditService } from '../../app/providers/reddit-service';
import { DetailsPage } from '../details/details';
/**
 * Generated class for the Reddits page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'reddits',
  templateUrl: 'reddits.html'
})
export class RedditsPage {
  items: any;
  category: any;
  limit: any;
  constructor(public navCtrl: NavController, private redditService: RedditService) {
    this.getDefaults();
  }

  ngOnInit(){
    console.log('RUNNING');
    this.getPosts(this.category, this.limit);
  }

  getDefaults(){
    if(localStorage.getItem('category') != null){
      this.category = localStorage.getItem('category');
    }else{
      this.category = 'sports';
    }

    if(localStorage.getItem('category') != null){
      this.limit = localStorage.getItem('limit');
    }else{
      this.limit=10;
    }
  }

  getPosts(category, limit){
    this.redditService.getPosts(category, limit)
      .subscribe(response => {
        this.items = response.data.children;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Reddits');
  }

  viewItem(item){
    this.navCtrl.push(DetailsPage, {
      item: item
    });
  }

  changeCategory(){
    this.getPosts(this.category, this.limit);
  }
}
