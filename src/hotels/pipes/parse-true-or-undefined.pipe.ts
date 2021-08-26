import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseTrueOrUndefinedPipe
  implements PipeTransform<string, boolean | undefined>
{
  transform(value: string): boolean | undefined {
    if (value === undefined) {
      return undefined;
    }

    try {
      return Boolean(value);
    } catch {
      throw new BadRequestException('Validation failed');
    }
  }
}
