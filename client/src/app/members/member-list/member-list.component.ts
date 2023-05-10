import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/models/member.interface';
import { Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user.model';
import { UserParams } from 'src/app/models/userParams';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  //members$: Observable<Member[]> | undefined;
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  user: User | undefined; // Do we use it?

  constructor(
    private membersService: MembersService,
    private accountService: AccountService
  ){
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      if(user){
        this.userParams = new UserParams(user);
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    //this.members$ = this.membersService.getMembers();
    this.loadMembers();
  }

  loadMembers(){
    if(!this.userParams) return;
    this.membersService.getMembers(this.userParams).subscribe(response => {
      if(response.result && response.pagination){
        this.members = response.result;
        this.pagination = response.pagination;
      }
    })
  }

  pageChanged(event: any){
    if(this.userParams && this.userParams.pageNumber !== event.page){
      this.userParams.pageNumber = event.page;
      this.loadMembers();
    }
  }
}
