import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SupportRequest,
  SupportRequestDocument,
} from 'src/support-request/support-request.schema';

@Injectable()
export class ManagerOrClientGuard implements CanActivate {
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly supportRequest: Model<SupportRequestDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      if (request.user && request.user.role === 'manager') {
        return true;
      }

      if (request.user && request.user.role === 'client') {
        const { id } = request.params;

        if (!id) {
          return false;
        }

        const targetSupportRequest = await this.supportRequest.findById(id);

        if (targetSupportRequest.user.toString() !== request.user.id) {
          return false;
        }

        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}
