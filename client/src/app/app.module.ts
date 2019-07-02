import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TranslationComponent } from './translation/translation.component';
import { DetailsModalComponent } from './details-modal/details-modal.component';
import { DateService } from './services/date.service';
import { TranslationDataService } from './services/translationData.service';
import { HttpClientModule } from '@angular/common/http';
import { Ng5SliderModule } from 'ng5-slider';
import 'hammerjs';
import { MatSortModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TimelineComponent,
    TranslationComponent,
    DetailsModalComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    Ng5SliderModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  entryComponents: [
    DetailsModalComponent
  ],
  providers: [DateService, TranslationDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
