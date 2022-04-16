import { gql } from 'apollo-server-express'

export const userTypes = gql`
    type Query {
        user(userId: ID!): User
        users(offset: Int, limit: Int): [User!]!
    }

    type Mutation {
        userCreate(registerInput:RegisterInput): RegisteredUser!
        userLogin(email:String!, password:String!):RegisteredUser!
    }

    input RegisterInput{
        email:String!
        password:String!
        firstName:String!
        lastName:String
    }
    
    type User {
        _id: ID!
        email: String!
        firstName: String!
        lastName: String
        lastAccess: String
    }

    type RegisteredUser {
        _id: ID!
        email: String!
        firstName: String
        lastName: String
        lastAccess: String
        token:String!
    }

`
