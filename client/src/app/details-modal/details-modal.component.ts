import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TranslationModel } from '../models/translation.model';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss']
})
export class DetailsModalComponent implements OnInit {

  message: TranslationModel;
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DetailsModalComponent>) {
    if (data) {
      this.message = data.message || this.message;
      console.log('data' + data);
      console.log(this.message);
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
    this.dialogRef.updateSize('500vw', '500vw');
    }

  ngOnInit() {
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}

