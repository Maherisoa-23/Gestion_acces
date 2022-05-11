import { TestBed } from '@angular/core/testing';

import { SecurityAgentService } from './security-agent.service';

describe('SecurityAgentService', () => {
  let service: SecurityAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
