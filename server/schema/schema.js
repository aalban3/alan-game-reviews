const graphql = require("graphql");
const Game = require("../db/games");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// GraphQL Types
const GameType = new GraphQLObjectType({
  name: "Game",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    rating: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    game: {
      type: GameType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from source/db
        return Game.findByPk(args.id);
      },
    },
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args) {
        return Game.findAll();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addGame: {
      type: GameType,
      args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        rating: { type: GraphQLString },
      },
      resolve(parent, args) {
        let game = Game.create({
          title: args.title,
          body: args.body,
          rating: args.rating,
        });
        return game;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
