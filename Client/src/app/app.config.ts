import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './_interceptors/error.interceptor';
import { jwtInterceptor } from './_interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient( withInterceptors([errorInterceptor,jwtInterceptor])), // withInterceptors is a function that allows you to add interceptors to the HTTP client.
    provideAnimations(),
    // provideToastr() is a function that provides the Toastr service for displaying notifications.
    provideToastr({

      positionClass:'toast-bottom-right', // Position of the toast notifications
      timeOut: 3000, // Duration of the toast notifications in milliseconds
    })
  ]
};



