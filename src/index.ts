import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prisma } from "./lib/prisma.js";
import { graphqlServer } from "@hono/graphql-server";
import { schema } from "./graphql/schema.js";
import { rootResolver } from "./graphql/resolver.js";
const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.get("/products", async (c) => {
  const products = await prisma.product.findMany();
  return c.json(products);
});
app.use(
  "/graphql",
  graphqlServer({
    schema,
    rootResolver: () => rootResolver,
    graphiql: true,
  }),
);
app.get("/products/:id", async (c) => {
  const { id } = c.req.param();
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return c.text("Product not found", 404);
  }
  return c.json(product);
});
app.post("/products", async (c) => {
  const { name, price } = await c.req.json();
  const newProduct = await prisma.product.create({
    data: { name, price },
  });
  return c.json(newProduct, 201);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
