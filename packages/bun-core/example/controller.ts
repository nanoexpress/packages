// This way of usage at WIP and does not work for now
// As it's way too complex for Bun.js AST
import { Number, Object, type Static } from '@sinclair/typebox' with {
  type: 'macro'
};
import { Check } from '@sinclair/typebox/value' with { type: 'macro' };
import { send } from '../aot' with { type: 'macro' };

const TBodySchema = Object({ input: Number() });
export const bodyRouteController = (input: Static<typeof TBodySchema>) => {
  if (!Check(TBodySchema, input)) {
    return send(
      {
        data: { status: 'error' }
      },
      403,
      {}
    );
  }

  return send(
    {
      data: input
    },
    200,
    {}
  );
};

export const notFoundController = () => {
  return send(
    {
      data: { status: 'error' }
    },
    404,
    {}
  );
};
