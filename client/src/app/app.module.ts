import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TranslationComponent } from './translation/translation.component';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TimelineComponent,
    TranslationComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
