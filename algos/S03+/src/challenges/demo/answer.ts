/**
 * In this challenge, you should sort the list of users based on their email address (A to Z)!
 *
 * @param topics Unsorted list of users
 * @returns Sorted list of users
 */

// ↓ uncomment bellow lines and add your response!
export default function ({ users }: { users: User[] }): User[] {
  return users.sort( (userA, userB)=>{
    if(userA.email<userB.email)
      return -1
    return 1
  }
 )
}


// used interfaces, do not touch
export interface User {
  name: string;
  email: string;
}
