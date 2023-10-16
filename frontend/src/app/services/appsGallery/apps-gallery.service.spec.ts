import { TestBed } from '@angular/core/testing';

import { AppsGalleryService } from './apps-gallery.service';

describe('AppsGalleryService', () => {
  let service: AppsGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppsGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
