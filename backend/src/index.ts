import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { MaxLength, Length } from 'class-validator';

import {
    buildSchema,
    Resolver,
    Query,
    ID,
    ObjectType,
    Field,
    ArgsType,
    Args,
    Mutation,
    Arg
} from 'type-graphql';

const users = [
    {
        name: 'krish kashiwala',
        // thoughts : [
        //   {
        //     left : "bad",
        //     right : "good"
        //   }
        // ]

        type: 'small brother'
    },
    {
        name: 'vansh kashiwala',
        // thoughts : [
        //   {
        //     left : "bad",
        //     right : "good"
        //   }
        // ]
        type: 'big brother'
    }
];
// custom learning experience
@ObjectType()
class User {
    @Field({ nullable: true })
    name: string;
    @Field()
    type: string;
    // @Field({nullable : true})
    // thoughts : [Rate]
}

// args type object
@ArgsType()
class userArgs {
    @Field({ nullable: true })
    @MaxLength(30)
    name: string;
    @Field({ nullable: true })
    @Length(30, 255)
    type: string;
}

// @ObjectType()
// class Rate{
//   @Field({nullable : true})
//   left : string
//   @Field({nullable : true})
//   right : string
// }
// console.log(ID)

// query resolvers
@Resolver()
class HelloResolver {
    @Query(() => ID, { name: 'helloWorld', nullable: true })
    async helloWorld() {
        return 'this is hello world strings';
    }
    @Query(() => [User])
    async allUsers() {
        return await users;
    }
    private userInfo: User[] = users;
    @Query(() => [User])
    async Users(@Args() { name }: userArgs): Promise<User[]> {
        return this.userInfo.filter((user) => user.name === name);
    }
    @Mutation(() => User)
    async createUser(
        @Arg('name') name: string,
        @Arg('type') type: string
    ): Promise<{}> {
        const newUser = {
            name: name,
            type: type
        };
        users.push(newUser);
        return { name, type };
    }
}

// mutation resolvers

const main = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver],
        dateScalarMode: 'timestamp'
    });

    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();
    const app = Express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server started on http://localhost:4000/graphql');
    });
};

main();
