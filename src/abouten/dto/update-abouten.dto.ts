import { PartialType } from '@nestjs/mapped-types';
import { CreateAboutenDto } from './create-abouten.dto';

export class UpdateAboutenDto extends PartialType(CreateAboutenDto) {}
