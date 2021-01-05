const { ApolloServer, gql } = require("apollo-server-lambda");

const faunadb=require('faunadb'),
  query=faunadb.query;

const shortId=require('shortid');
const typeDefs = gql`
  type Query {
    lollies:[Lolly]
    lollyByPath(lollyPath:String):Lolly
  }
  type Lolly {
    recipient: String
    message: String
    sender:String
    top:String
    middle:String
    bottom:String
    lollyPath:ID!
  }
  type Mutation{
    createLolly(recipient: String,message: String,sender:String,top:String,middle:String,bottom:String,lollyPath:String):Lolly
  }
`;

const client=new faunadb.Client({secret: "fnAD-Pc9BcACB5qyODsTVmFMS-Gynn_NoxYxgr6a"})

const resolvers = {
  Query: {
    lollies: async()=>{
      var result = await client.query(
        query.Map(
          query.Paginate(query.Documents(query.Collection("lolly"))),
          query.Lambda(x => query.Get(x))
        )
      )
      const lollies=result.data.map(lolly=>lolly.data);
      console.log("result lollies",lollies);
      return lollies;
    },
    lollyByPath:async(_,{lollyPath})=>{
      const result=await client.query(
            query.Get(query.Match(query.Index("lolly"),lollyPath))
          )
          return result.data;
    }
  },
  Mutation:{
    createLolly:async (_,args)=>{
      var id = shortId.generate();
      console.log("Lolly",args)
      args.lollyPath=id;
      const result=await client.query(
        query.Create(query.Collection("lolly"),{
          data:args
        })
      )
      
      console.log("result createLolly",result.data);

      return result.data
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground:true,
  introspection:true
});

const handler = server.createHandler();

module.exports = { handler };