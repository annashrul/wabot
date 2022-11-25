import { Test, TestingModule } from '@nestjs/testing';
import { WaMdGateway } from './wa-md.gateway';

describe('WaMdGateway', () => {
  let gateway: WaMdGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaMdGateway],
    }).compile();

    gateway = module.get<WaMdGateway>(WaMdGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
