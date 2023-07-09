import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse, IncomingMessage } from "http";
import { PrismaClient } from "@prisma/client";
import { createContext } from '../../graphql/context'

const prisma = new PrismaClient();

const typeDefs = gql`
    type Product {
        id: ID
        description: String
    }

    type Query {
        products: [Product]
    }

    type Mutation {
        createProduct(description: String): Product
    }
`;

const resolvers = {
    Query: {
        products: () => {
            return prisma.product.findMany();
        },
    },
    Mutation: {
        createProduct: (
            _parent: any,
            { description }: { description: string },
            _context: any
        ) => {
            return prisma.product.create({ data: { description } });
        },
    },
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(
    req: MicroRequest,
    res: ServerResponse<IncomingMessage>
) {
    await startServer;
    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
}

export const config = {
    api: {
        bodyParser: false,
    },
};
