export type UserResponse = {
    NameId: string,
    Name: string
}
export type User = {
    Name: string,
    Point: number
}
export type Contribution = {
    Contributor: string,
    Point: number,
    Message: string
}
export type Contributed = {
    Id: string,
    Contributor: string,
    Point: number,
    Message: string
}
export const url = 'http://localhost:8000'