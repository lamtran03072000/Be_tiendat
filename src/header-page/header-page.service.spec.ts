import { Test, TestingModule } from '@nestjs/testing';
import { HeaderPageService } from './header-page.service';

describe('HeaderPageService', () => {
  let service: HeaderPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeaderPageService],
    }).compile();

    service = module.get<HeaderPageService>(HeaderPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
