import { Test, TestingModule } from '@nestjs/testing';
import { WaController } from './wa.controller';

describe('WaController', () => {
  let controller: WaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaController],
    }).compile();

    controller = module.get<WaController>(WaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
