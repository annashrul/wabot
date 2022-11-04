import { Test, TestingModule } from '@nestjs/testing';
import { WaGateway } from './wa.gateway';

describe('WaGateway', () => {
  let gateway: WaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaGateway],
    }).compile();

    gateway = module.get<WaGateway>(WaGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
