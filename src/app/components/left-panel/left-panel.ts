import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GithubService } from '../../services/github';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-left-panel',
  imports: [CommonModule, MatIconModule, MatButtonModule, HttpClientModule],
  templateUrl: './left-panel.html',
  styleUrl: './left-panel.css',
})
export class LeftPanel implements OnInit {
  user: any = null;

  constructor(private readonly githubService: GithubService) {}

  ngOnInit() {
    this.githubService.fetchUser('shreeramk').subscribe((res) => {
      this.user = res;
      console.log(this.user);
    });
  }

  getInfoList(user: any) {
    return [
      {
        icon: 'work',
        text: user.company || 'N/A',
        link: user.html_url,
      },
      {
        icon: 'location_on',
        text: user.location || 'Not available',
        link: '#',
      },
      {
        icon: 'link',
        text: user.blog || 'No website',
        link: user.blog,
      },
      {
        icon: 'alternate_email',
        text: '@' + (user.twitter_username || 'No Twitter'),
        link: user.twitter_username
          ? `https://twitter.com/${user.twitter_username}`
          : '#',
      },
    ];
  }
}