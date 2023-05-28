import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member.interface';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { MessageService } from 'src/app/services/message.service';
import { PresenceService } from 'src/app/services/presence.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
  member: Member = {} as Member;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  activeTab?: TabDirective;
  messages: Message[] =[];
  user?: User;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    public presenceServce: PresenceService,
    private accountService: AccountService,
    private router: Router
  ){
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      if(user) this.user = user;
    });
    //TODO
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    
    this.route.data.subscribe(data => {
      this.member = data['member'];
    });
    
    this.route.queryParams.subscribe(params => {
      params['tab'] && this.selectTab(params['tab']);
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  getImages(){
    if(!this.member) return [];
    
    const imageUrls = [];
    for(const photo of this.member.photos){

      imageUrls.push({
        small: photo.url, 
        medium: photo.url, 
        big: photo.url});
    }
    return imageUrls;
  }

  selectTab(heading: string){
    if(this.memberTabs){
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
    }
  }

  loadMessages() {
    if(this.member){
      this.messageService.getMessageThread(this.member.userName).subscribe(messages => {
        this.messages = messages;
      });
    }
  }
  
  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages' && this.user){
      //this.loadMessages();
      this.messageService.createHubConnection(this.user, this.member.userName);
    } else {
      this.messageService.stopHubConnection();
    }
  }
}
