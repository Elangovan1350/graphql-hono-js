import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type Product {
  id: ID!
  name: String!
  price: Float!
}
  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }
  type Mutation {
    createProduct(name: String!, price: Float!): Product!
    updateProduct(id: ID!, name: String, price: Float): Product
    deleteProduct(id: ID!): Product
  }
    `);
