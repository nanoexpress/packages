# @nanoexpress/packages

Monorepo of all tools, packages, helpers and utils which required to build the future of nanoexpress

## Packages

All of features and tools planned to be ready to work as mid-2026 or end of 2026.
Looking for open-source developers to accelerate estimates and finish faster.

Early (until end of 2024) sponsors (with 100$/m or more) will get 50% discount to get access GPL-3.0 licensed repos commercial use and 25% discount to access Private packages

### Information about badges

- ✅ – Done
- ✍️ – In progress
- 🕖 – Planned but not started yet
- ⚠️ – Requires high amount of time
- ？– Not tested but could work
- ❌ – Probably does not happen

| Kind          | Packages / Runtime   | Node.js | Deno | Bun | Serverless\* | Availability | License    |
| ------------- | -------------------- | ------- | ---- | --- | ------------ | ------------ | ---------- |
| `core`        | `platform-detection` | ✅      | ✅   | ✅  | ？           | Public       | Apache-2.0 |
| `core`        | `aot`                | ⚠️      | ❌   | ✅  | ❌           | Public       | Apache-2.0 |
| `all`         | `hooks`              | ✅      | ✅   | ✅  | ？           | Public       | Apache-2.0 |
| `all`         | `fast-path-parse`    | ✅      | ✅   | ✅  | ✅           | Public       | MIT        |
| `all`         | `fast-node-parse`    | ✅      | ✅   | ✅  | ✅           | Public       | Apache-2.0 |
| `all`         | `fast-query-parse`   | ✅      | ✅   | ✅  | ✅           | Public       | MIT        |
| `all`         | `fast_js_route`      | ✍️      | ✍️   | ✍️  | ✍️           | Public       | Apache-2.0 |
| `library`     | `validation`         | 🕖      | 🕖   | 🕖  | 🕖           | Public       | Apache-2.0 |
| `library`     | `serialize`          | 🕖      | 🕖   | 🕖  | 🕖           | Public       | Apache-2.0 |
| `library`     | `openapi-docs`       | ⚠️      | ⚠️   | ⚠️  | ⚠️           | Public       | Apache-2.0 |
| `library`     | `middlewares`        | 🕖      | 🕖   | 🕖  | 🕖           | Public       | Apache-2.0 |
| `library`     | `defines`            | 🕖      | 🕖   | 🕖  | 🕖           | Public       | Apache-2.0 |
| `framework`   | `graphql`            | 🕖      | 🕖   | 🕖  | ⚠️           | Public       | GPL-3.0    |
| `framework`   | `orm`                | ⚠️      | ⚠️   | ⚠️  | ⚠️           | Public       | GPL-3.0    |
| `framework`   | `ddos-rate`          | 🕖      | 🕖   | 🕖  | ❌           | Public       | GPL-3.0    |
| `framework`   | `docker`             | 🕖      | 🕖   | 🕖  | ❌           | Public       | GPL-3.0    |
| `framework`   | `protocols`          | ⚠️      | ⚠️   | ⚠️  | ❌           | Private      | Business   |
| `framework`   | `api-codegen`        | ⚠️      | ⚠️   | ⚠️  | ❌           | Private      | Business   |
| `framework`   | `postman-gen`        | ⚠️      | ⚠️   | ⚠️  | ⚠️           | Private      | Business   |
| `framework`   | `nginx-api`          | 🕖      | 🕖   | 🕖  | ❌           | Private      | Business   |
| `framework`   | `modules`            | ⚠️      | ⚠️   | ⚠️  | ⚠️           | Private      | Business   |
| `integration` | `nest.js`            | ⚠️      | ⚠️   | ⚠️  | ⚠️           | Private      | Business   |
| `integration` | `next.js`            | ⚠️      | ⚠️   | ⚠️  | ⚠️           | Private      | Business   |
| `integration` | `meteor.js`          | ⚠️      | ⚠️   | ⚠️  | ⚠️           | Private      | Business   |

> - \* – Serverless like Cloudflare Workers or Netlify Functions

### Approximately estimates

| Quarter / Month | 1-month                     | 2-month      | 3-month         |
| --------------- | --------------------------- | ------------ | --------------- |
| 2024 Jan-March  | Planning                    | Planning     | Preparation     |
| 2024 April-June | Preparation                 | Release tool | Release tool    |
| 2024 July-Sep   | `platform-detection`, `aot` | `hooks`      | `fast-*-parse`  |
| 2024 Oct-Dec    | Route Engine                | Route Engine | Validation      |
| 2025 Jan-March  | Serialization               | Bun library  | Node.js library |
| 2025 April-June | Node.js library             | Deno library | Deno library    |
| 2025 July-Sep   | OpenAPI Docs                | OpenAPI Docs | Middlewares     |
| 2025 Oct-Dec    | Testing                     | Docker       | Modules         |
| 2026 Jan-March  | Modules                     | Nginx API    | DDoS Rate       |
| 2026 April-June | Protocols                   | Postman Gen  | GraphQL         |
| 2026 July-Sep   | Defines                     | API Codegen  | API Codegen     |
| 2026 Oct-Dec    | Nest.js integrations        | + Next.js    | + Meteor.js     |
