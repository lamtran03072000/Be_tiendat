import { Test, TestingModule } from '@nestjs/testing';
import { HeaderPageController } from './header-page.controller';
import { HeaderPageService } from './header-page.service';

describe('HeaderPageController', () => {
  let controller: HeaderPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeaderPageController],
      providers: [HeaderPageService],
    }).compile();

    controller = module.get<HeaderPageController>(HeaderPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
