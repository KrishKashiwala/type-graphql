import { ObjectType, Field } from 'type-graphql';
@ObjectType()
class User {
    @Field({ nullable: true })
    name: string;
    @Field()
    type: string;
    // @Field({nullable : true})
    // thoughts : [Rate]
}
export { User };
