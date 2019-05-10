import { TestBed } from '@angular/core/testing';

import { TranslationDataService } from './TranslationData.service';

describe('TranslationDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranslationDataService = TestBed.get(TranslationDataService);
    expect(service).toBeTruthy();
  });
});
