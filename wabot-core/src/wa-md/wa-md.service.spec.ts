import { Test, TestingModule } from '@nestjs/testing';
import { WaMdService } from './wa-md.service';

describe('WaMdService', () => {
  let service: WaMdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaMdService],
    }).compile();

    service = module.get<WaMdService>(WaMdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
