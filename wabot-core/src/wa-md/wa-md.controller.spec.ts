import { Test, TestingModule } from '@nestjs/testing';
import { WaMdController } from './wa-md.controller';

describe('WaMdController', () => {
  let controller: WaMdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaMdController],
    }).compile();

    controller = module.get<WaMdController>(WaMdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
