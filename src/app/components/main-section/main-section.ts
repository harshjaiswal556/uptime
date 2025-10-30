import { Component, OnInit } from '@angular/core';
import { SubNavbar } from "../sub-navbar/sub-navbar";
import { GithubService } from '../../services/github';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-section',
  imports: [CommonModule, SubNavbar],
  templateUrl: './main-section.html',
  styleUrl: './main-section.css',
})
export class MainSection implements OnInit {
  user: any = null
  heatmapData: number[][] =[]

  constructor (private readonly githubService: GithubService){

  }

  ngOnInit() {
    this.githubService.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user)
    });
    this.generateHeatmapData();
  }

  generateHeatmapData() {
    const weeks = 52;
    const days = 7;
    this.heatmapData = Array.from({ length: weeks }, () =>
      Array.from({ length: days }, () => Math.floor(Math.random() * 6))
    );
  }

  getColor(value: number): string {
    const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353', '#9be9a8'];
    return colors[value];
  }
}
