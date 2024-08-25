# @nanoexpress/packages

Monorepo of all tools, packages, helpers and utils which required to build the future of nanoexpress

## Packages

### Information about badges

- ✅ – Done
- ✍️ – In progress
- 🕖 – Planned but not started yet
- ⚠️ – Requires high amount of time
- ？– Not tested but could work
- ❌ – Probably does not happen

| Packages / Runtime        | Node.js | Deno | Bun | Serverless\* | Availability | License    |
| ------------------------- | ------- | ---- | --- | ------------ | ------------ | ---------- |
| `core/platform-detection` | ✅      | ✅   | ✅  | ？           | Public       | Apache-2.0 |
| `core/aot`                | ⚠️      | ❌   | ✅  | ❌           | Public       | Apache-2.0 |
| `library/validation`      | 🕖      | 🕖   | 🕖  | 🕖           | Public       | Apache-2.0 |
| `library/serialize`       | 🕖      | 🕖   | 🕖  | 🕖           | Public       | Apache-2.0 |
| `library/hooks`           | ✅      | ✅   | ✅  | ？           | Public       | Apache-2.0 |
| `library/openapi-docs`    | ⚠️      | ⚠️   | ⚠️  | ⚠️           | Public       | Apache-2.0 |
| `library/middlewares`     | 🕖      | 🕖   | 🕖  | 🕖           | Public       | Apache-2.0 |
| `library/defines`         | 🕖      | 🕖   | 🕖  | 🕖           | Public       | Apache-2.0 |
| `framework/graphql`       | 🕖      | 🕖   | 🕖  | ⚠️           | Public       | GPL-3.0    |
| `framework/orm`           | ⚠️      | ⚠️   | ⚠️  | ⚠️           | Public       | GPL-3.0    |
| `framework/ddos-rate`     | 🕖      | 🕖   | 🕖  | ❌           | Public       | GPL-3.0    |
| `framework/docker`        | 🕖      | 🕖   | 🕖  | ❌           | Public       | GPL-3.0    |
| `framework/protocols`     | ⚠️      | ⚠️   | ⚠️  | ❌           | Private      | Business   |
| `framework/api-codegen`   | ⚠️      | ⚠️   | ⚠️  | ❌           | Private      | Business   |
| `framework/postman-gen`   | ⚠️      | ⚠️   | ⚠️  | ⚠️           | Private      | Business   |
| `framework/nginx-api`     | 🕖      | 🕖   | 🕖  | ❌           | Private      | Business   |
| `framework/modules`       | ⚠️      | ⚠️   | ⚠️  | ⚠️           | Private      | Business   |

> - \* – Serverless like Cloudflare Workers or Netlify Functions
