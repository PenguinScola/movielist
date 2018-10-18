import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import addHours from 'date-fns/add_hours'

const indexResolver = {
    Date : new GraphQLScalarType({
            name : 'Date',
            parseValue(value) { // value from client
                return parse(value)
            },
            serialize(isodate) { // value sent to client
                return format(parse(isodate), "DD/MM/YYYY")
            },
            parseLiteral(ast) {
                if(ast.kind === Kind.INT) {
                    return parseInt(ast.value)
                }
                let mydate = new Date(format(parse(ast.value), "DD/MM/YYYY"))
                mydate = addHours(mydate, 7)
                return mydate
            }
        }
    )
}

export default indexResolver