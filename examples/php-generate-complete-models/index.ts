import { OutputModel, PhpGenerator } from '../../src';

const generator: PhpGenerator = new PhpGenerator();
const jsonSchemaDraft7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  additionalProperties: false,
  properties: {
    email: {
      type: 'string',
      format: 'email'
    }
  }
};

export async function generate(): Promise<void> {
  const models: OutputModel[] = await generator.generateCompleteModels(
    jsonSchemaDraft7,
    {}
  );
  for (const model of models) {
    console.log(model.result);
  }
}
if (require.main === module) {
  generate();
}