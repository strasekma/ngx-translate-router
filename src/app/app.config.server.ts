import { provideServerRendering, RenderMode, withRoutes } from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideServerRendering(/*withRoutes([{ path: '**', renderMode: RenderMode.Server }])*/),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
