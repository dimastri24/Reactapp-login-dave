const data = {
    users: {
        userId: 1,
        name: "Daniel"
    },
    roles: [
        {
            roleId: 1,
            name: "Admin"
        }
    ],
    store: {
        storeId: 1,
        name: "Mekari"
    },
    countAttendance: 10
}

console.log(data);
console.log("users name: " + data.users.name);
console.log(data.roles)

data.roles.forEach(role => {
    for (let key in role) {
        // console.log(`${key}: ${role[key]}`)
        if (role.hasOwnProperty(key)) {
            console.log(`${key} -> ${role[key]}`)
        }
    }
})

// const string = "";
const mapping = data.roles.map(item => {
    const arr = [];
    arr.push(item.roleId);
    console.log(item.name);
    
    return(arr)
})

console.log(mapping);

// not working as expected
const newarr = [];
for (let i of mapping) {
    console.log(i);
    newarr.push(i);
}

const check = [ 1, 2, 3 ];

if (newarr.find(role => check.includes(role))) {
    console.log("true")
} else {
    console.log("false")
}
// until here

// check data or compare data
// later could be use for checking filtering with ternary
// const result = data.roles.find( ({ roleId }) => roleId === 1);
const result = data.roles.find( ({ roleId }) => check.includes(roleId));
console.log(result);

// example
data.roles.find( ({ roleId }) => check.includes(roleId))
    ? console.log("true")
    : console.log("false")

// now i can use either both of this payload sended from the api
// if using this then use the one above, and turn back the payload
// "roles": [{"roleId": 1, "name": 'Admin'}]
// if using this then use already there in react
// "roles": [1]



