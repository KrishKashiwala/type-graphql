import { Resolver, Query, Mutation, ID, Args, Arg } from 'type-graphql';
import { User } from './queries';
import { userArgs } from './argTypes';
import { users } from './fakedata';
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
export { HelloResolver };
