import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

// Application Routes
const routes: Routes = [
  {path: '',
   component: HomeComponent
  },
  { path: 'dashboard',
    component: DashboardComponent
  },
  {path: '**',
   component: HomeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
