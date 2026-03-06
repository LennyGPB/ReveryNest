import { Test, TestingModule } from '@nestjs/testing';
import { LucidController } from './lucid.controller';

describe('LucidController', () => {
  let controller: LucidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LucidController],
    }).compile();

    controller = module.get<LucidController>(LucidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
