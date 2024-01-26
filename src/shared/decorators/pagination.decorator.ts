import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const page = +request.query.page || 1;
    const pageSize = +request.query.pageSize || 10;

    return { page, pageSize };
  },
);
