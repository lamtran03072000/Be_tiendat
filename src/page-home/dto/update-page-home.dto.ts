import { PartialType } from '@nestjs/mapped-types';
import { CreatePageHomeDto } from './create-page-home.dto';

export class UpdatePageHomeDto extends PartialType(CreatePageHomeDto) {}
