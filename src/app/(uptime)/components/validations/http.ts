import { IMonitorDocument, IMonitorErrorMessage } from '@/interfaces/monitor.interface';
import { RefinementCtx, z, ZodIssueCode } from 'zod';

export const httpSchema = z
  .object({
    name: z.string({ required_error: 'Display name is a required field.' }).min(2, { message: 'Display name is a required field.' }),
    url: z.string({ required_error: 'URL is a required field.' }).url('A valid http/https url is required.'),
    notificationId: z.number({ required_error: 'Please select a notification group.' }).gt(0, 'Please select a notification group.'),
    alertThreshold: z.number({ required_error: 'Alert threshold must be a postive number.' }).gte(0, 'Alert threshold must be a postive number.'),
    method: z.string({ required_error: 'Please select an HTTP verb.' }),
    // httpAuthMethod is added so we can access it inside superRefine
    httpAuthMethod: z.string({ required_error: 'Please select a valid authentication type.' }).optional()
  })
  .superRefine((data: IMonitorDocument | unknown, ctx: RefinementCtx) => {
    authenticationValidation(data as IMonitorDocument, ctx);
  });

function authenticationValidation(data: IMonitorDocument, ctx: RefinementCtx) {
  if (data.httpAuthMethod === 'basic' && !data.basicAuthUser) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Please add an authentication username.',
      path: ['basicAuthUser']
    });
  }
  if (data.httpAuthMethod === 'basic' && !data.basicAuthPass) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Please add an authentication password.',
      path: ['basicAuthPass']
    });
  }
  if (data.httpAuthMethod === 'token' && !data.bearerToken) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Please add a bearer token.',
      path: ['bearerToken']
    });
  }
}

export const httpSchemaValidation = (monitorInfo: IMonitorDocument): IMonitorErrorMessage => {
  let errors: IMonitorErrorMessage = {};
  const authHeaders = objectValidation(monitorInfo?.headers!);
  const authBody = objectValidation(monitorInfo?.body!);
  if (authHeaders) {
    errors.headers = authHeaders;
  }
  if (authBody) {
    errors.body = authBody;
  }
  const result = httpSchema.safeParse(monitorInfo);
  if (!result.success) {
    for(const item of result.error.issues) {
      errors[`${item.path[0]}`] = item.message;
    }
  }
  return errors;
}

export const objectValidation = (data: string): string => {
  if (data && data.length > 0) {
    const headers = JSON.parse(JSON.stringify(data));
    return typeof headers !== 'object' ? 'Please return a valid object' : '';
  }
  return '';
}
