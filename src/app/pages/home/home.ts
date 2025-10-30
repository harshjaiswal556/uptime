import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { LeftPanel } from '../../components/left-panel/left-panel';
import { MainSection } from '../../components/main-section/main-section';

@Component({
  selector: 'app-home',
  imports: [Navbar, LeftPanel, MainSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
