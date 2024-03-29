import {gql} from 'apollo-server-express';

export const destinationTypes = gql`
    #   scalar Date
    extend type Query{
        destinations(offset: Int, limit: Int):PagedDestination
        destination(destinationId:ID):Destination
        userdestinations(owner:ID):[Destination]
    }
    type Destination{
        _id:ID
        destinationName:String
        destinationDescription:String
        destinationFood:[FoodPlace]
        destinationActivity:[Activity]
        destinationAccommodation:[Accommodation]
        images:[String]
        starredBy:[String]
        owner:ID
    }
    type PagedDestination{
        list:[Destination]
        hasPrev:Boolean
        hasNext:Boolean
        totalCount:Int
    }


    extend type Mutation{
        destinationCreate(values:DestinationInput):Destination
        destinationDelete(destinationId:ID!):String
        destinationUpdate(destinationId:ID!, values:DestinationInput ):Destination
        destinationUpdateStarred(destinationId:ID!, userId:ID!):Destination
    }

    input DestinationInput {
        destinationName:String
        destinationDescription:String
    }
`

