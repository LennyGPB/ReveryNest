import { SetMetadata } from '@nestjs/common';

export const LimitType = (type: 'DREAM' | 'IMAGE' | 'LUCID') => SetMetadata('limitType', type);