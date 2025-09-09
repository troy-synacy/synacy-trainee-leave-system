import {Component, effect, untracked} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from './shared-components/sidebar/sidebar.component';
import {HeaderComponent} from './shared-components/header/header.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'synacy-trainee-leave-system';

  sidebarOpen = true;

  constructor(private readonly snackBar: MatSnackBar,
              private readonly notificationService: NotificationService) {
    effect(() => {
      const listener = this.notificationService.notificationListener();

      if(listener){
        this.snackBar.open(listener.message, undefined, {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: listener.type == "success" ? "snack-success" : "snack-fail",
          politeness: "assertive"
        })
        untracked(() =>this.notificationService.clear());
      }
    },{ allowSignalWrites: true});
  }

  onToggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
