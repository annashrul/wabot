import { Test, TestingModule } from '@nestjs/testing';
import { CallbackService } from './callback.service';

describe('CallbackService', () => {
  let service: CallbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallbackService],
    }).compile();

    service = module.get<CallbackService>(CallbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
