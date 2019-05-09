const insertedOwnerSample = [ { owner_id: 1,
    forename: 'firstname-b',
    surname: 'lastname-b',
    age: 30 },
  { owner_id: 2,
    forename: 'firstname-c',
    surname: 'lastname-c',
    age: 21 },
  { owner_id: 3,
    forename: 'firstname-d',
    surname: 'lastname-d',
    age: 17 }]

const forenameToID =  createOwnerLookupObj(insertedOwnerSample);
/* {
    firstname-b : 1,
    firstname-c : 2,
    firstname-d : 3
}
*/