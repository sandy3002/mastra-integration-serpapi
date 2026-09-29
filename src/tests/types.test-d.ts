import { describe, it, expectTypeOf } from 'vitest';
import type { SupportedEngine, InputType, OutputType } from '../schemas';

describe('type-level tests', () => {
  it('SupportedEngine should be a union of engine strings', () => {
    expectTypeOf<SupportedEngine>().toBeString();
  });
});
