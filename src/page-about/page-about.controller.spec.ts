import { Test, TestingModule } from '@nestjs/testing';
import { PageAboutController } from './page-about.controller';
import { PageAboutService } from './page-about.service';

describe('PageAboutController', () => {
  let controller: PageAboutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PageAboutController],
      providers: [PageAboutService],
    }).compile();

    controller = module.get<PageAboutController>(PageAboutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
