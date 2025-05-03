import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    // provideToastr() is a function that provides the Toastr service for displaying notifications.
    provideToastr({

      positionClass:'toast-bottom-right', // Position of the toast notifications
      timeOut: 3000, // Duration of the toast notifications in milliseconds
    })
  ]
};



