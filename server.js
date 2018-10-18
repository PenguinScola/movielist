import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import path from 'path'
import merge from 'lodash/merge'

// resolvers
import authorResolver from './src/graphql/author/resolvers'
import movieResolver from './src/graphql/movie/resolvers'
import indexResolver from './src/graphql/index/resolvers'

const app = express()

const readfile = fileLoader(path.join(__dirname, '/**/*.graphql'))
const typeDefs = mergeTypes(readfile, {all : true})
const resolvers = merge(indexResolver, authorResolver, movieResolver)

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.applyMiddleware({app})

app.listen('4000', () => {
    console.log(`server start on localhost:4000${server.graphqlPath}`)
})