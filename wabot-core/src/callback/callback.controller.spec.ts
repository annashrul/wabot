import { Test, TestingModule } from '@nestjs/testing';
import { CallbackController } from './callback.controller';
import { CallbackService } from './callback.service';

describe('CallbackController', () => {
  let controller: CallbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallbackController],
      providers: [CallbackService],
    }).compile();

    controller = module.get<CallbackController>(CallbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
