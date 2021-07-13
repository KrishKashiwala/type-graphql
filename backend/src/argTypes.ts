import { ArgsType, Field } from 'type-graphql';
import { MaxLength, Length } from 'class-validator';
@ArgsType()
class userArgs {
    @Field({ nullable: true })
    @MaxLength(30)
    name: string;
    @Field({ nullable: true })
    @Length(30, 255)
    type: string;
}
export { userArgs };
