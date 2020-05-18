const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const Article = require("../mongo-models/article");

const ArticleType = new GraphQLObjectType({
  name: "Article",
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    body: {
      type: GraphQLString
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    article: {
      type: ArticleType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Article.findById(args.id);
      }
    },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve(parent, args) {
        return Article.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addArticle: {
      type: ArticleType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString)
        },
        body: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },

      resolve(parent, { title, body }) {
        let articleDocument = new Article({
          title,
          body
        });

        return articleDocument.save();
      }
    },
    removeArticle: {
      type: ArticleType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, { id }) {
        return Article.findById(id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
