import { Component } from '@angular/core';

import { InfoPage } from '../info/info';
import { PlanPage } from '../plan/plan';
import { HomePage } from '../home/home';
import { EventPage } from '../event/event';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = InfoPage;
  tab3Root = EventPage;
  tab4Root = PlanPage;

  constructor() {

  }
}
