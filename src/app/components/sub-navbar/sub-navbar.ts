import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GithubService } from '../../services/github';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-sub-navbar',
  imports: [MatIconModule, MatBadgeModule],
  templateUrl: './sub-navbar.html',
  styleUrl: './sub-navbar.css',
})
export class SubNavbar{

  @Input() user: any;
}
