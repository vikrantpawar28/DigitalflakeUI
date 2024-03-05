import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import{   MatToolbarModule} from '@angular/material/toolbar'
import { ConfirmationComponent } from '../confirmation/confirmation.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  opened = false;
  contentMargin = 240;
  navItems: string[] = ['Home', 'category', 'Products'];
  selectedNavItem: string = ''; 
  selectNavItem(item: string) {
    this.selectedNavItem = item;
  }
  toggleCollapse(): void {
    this.opened = !this.opened;
    if (!this.opened) {
      this.contentMargin = 57;
    } else {
      this.contentMargin = 265;
    }
  }


  constructor(private dialog: MatDialog) {}
  opendialogconfiramation(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '350px',
      closeOnNavigation: true, // Close the dialog when navigating away from current route
      disableClose: true 
      /* Add any other dialog configuration options */
    });
  }

}
