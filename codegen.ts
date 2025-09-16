import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://syn-api-prod.herokuapp.com/graphql",
  documents: ["src/graphql/queries/**/*.ts", "src/graphql/mutations/**/*.ts"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        useTypeImports: true,
        enumsAsConst: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
