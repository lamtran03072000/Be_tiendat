import { Test, TestingModule } from '@nestjs/testing';
import { PageAboutService } from './page-about.service';

describe('PageAboutService', () => {
  let service: PageAboutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageAboutService],
    }).compile();

    service = module.get<PageAboutService>(PageAboutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
