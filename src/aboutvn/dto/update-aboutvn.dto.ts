import { PartialType } from '@nestjs/mapped-types';
import { CreateAboutvnDto } from './create-aboutvn.dto';

export class UpdateAboutvnDto extends PartialType(CreateAboutvnDto) {}
