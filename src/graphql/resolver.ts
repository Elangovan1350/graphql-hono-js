import { prisma } from "../lib/prisma.js";
export const rootResolver = {
  products: async () => {
    return prisma.product.findMany();
  },

  product: async ({ id }: { id: string }) => {
    return prisma.product.findUnique({
      where: { id },
    });
  },

  createProduct: async ({ name, price }: { name: string; price: number }) => {
    return prisma.product.create({
      data: { name, price },
    });
  },
  updateProduct: async ({
    id,
    name,
    price,
  }: {
    id: string;
    name: string;
    price: number;
  }) => {
    return prisma.product.update({
      where: { id },
      data: { name, price },
    });
  },
};
