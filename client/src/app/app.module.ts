import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TranslationComponent } from './translation/translation.component';
import 'hammerjs';
import {DateService} from './services/date.service';

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
    MatSliderModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [DateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
