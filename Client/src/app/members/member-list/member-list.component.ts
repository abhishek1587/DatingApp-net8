import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements  OnInit {

  private memberService = inject(MembersService);
  members: Member[] = [];
  ngOnInit(): void {
    // Initialization logic here
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers().subscribe({
      next:(members) =>{this.members = members;},
      error:(error) =>{},
      complete:() =>{
        console.log('Members loaded successfully');
      }
    })
  }
}
