import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MembersService } from '../services/members.service';
import { Member } from '../models/member.interface';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailedResolver {

  constructor(private memberService: MembersService){}

  resolve(route: ActivatedRouteSnapshot): Observable<Member> {
    return this.memberService.getMember(route.paramMap.get('username')!);
  }
}
