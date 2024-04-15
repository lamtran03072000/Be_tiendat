import { PartialType } from '@nestjs/mapped-types';
import { CreateHeaderPageDto } from './create-header-page.dto';

export class UpdateHeaderPageDto extends PartialType(CreateHeaderPageDto) {}
