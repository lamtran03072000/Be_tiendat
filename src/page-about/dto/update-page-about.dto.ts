import { PartialType } from '@nestjs/mapped-types';
import { CreatePageAboutDto } from './create-page-about.dto';

export class UpdatePageAboutDto extends PartialType(CreatePageAboutDto) {}
