// MongoDB Basic Assignment

// Task 1: Database and Collection Setup

// 1. Verify MongoDB
mongosh
show dbs

// 2. Select the Database
use company

// 3.  Create the employees collection
db.createCollection("employees")

// 4. List the collections
show collections

// 5. Insert the employee documents
db.employees.insertMany([
    {
        _id: "EMP001",
        name: "John",
        department: "Engineering",
        experience: 4,
        skills: ["Java", "Spring Boot"],
        active: true,
        address: {
            city: "Pune",
            country: "India"
        }
    },
    {
        _id: "EMP002",
        name: "Alice",
        department: "HR",
        experience: 3,
        skills: ["Recruitment", "Communication"],
        active: true,
        address: {
            city: "Mumbai",
            country: "India"
        }
    },
    {
        _id: "EMP003",
        name: "David",
        department: "Engineering",
        experience: 6,
        skills: ["Java", "MongoDB"],
        active: true,
        address: {
            city: "Bengaluru",
            country: "India"
        }
    },
    {
        _id: "EMP004",
        name: "Emma",
        department: "Finance",
        experience: 2,
        skills: ["Accounting", "Excel"],
        active: false,
        address: {
            city: "Pune",
            country: "India"
        }
    },
    {
        _id: "EMP005",
        name: "Robert",
        department: "Engineering",
        experience: 5,
        skills: ["Java", "Docker"],
        active: true,
        address: {
            city: "Delhi",
            country: "India"
        }
    }
])

// 6. Verify that the documents were inserted correctly.
db.employees.find()

// 7. Check the number of employees added
db.employees.countDocuments()

// ----------------------------------------------------------------------------------------
// Task 2: Read and Query Operations

// 2.1 Retrieve employees whose department is Engineering.
db.employees.find(
    { department: "Engineering" },
    { _id: 1, name: 1, experience: 1 }
).sort({ name: 1 })

// 2.2 Find employees with at least five years of experience,
// sorted by experience in descending order.
db.employees.find(
    { experience: { $gte: 5 } },
    { _id: 0, name: 1, experience: 1 }
).sort({ experience: -1 })

// 2.3 Find employees in Pune, return name and city, and sort by name.
db.employees.find(
    { "address.city": "Pune" },
    { _id: 0, name: 1, "address.city": 1 }
).sort({ name: 1 })

// 2.4 Find employees with MongoDB or Spring Boot skills using $in, sorted by name.
db.employees.find(
    { skills: { $in: ["MongoDB", "Spring Boot"] } }
).sort({ name: 1 })

// 2.5 Find the top 2 employees by experience, returning name and experience.
db.employees.find(
    {},
    { _id: 0, name: 1, experience: 1 }
).sort({ experience: -1 }).limit(2)

// ----------------------------------------------------------------------------------------
// Task 3: Update Operations

// 3.1 Increase Alice's experience by 1 using $inc.
db.employees.updateOne(
    { name: "Alice" },
    { $inc: { experience: 1 } }
)

// Verify Alice's experience after using $inc.
db.employees.find({ name: "Alice" })

// 3.2 Change Emma's active value from false to true using $set.
db.employees.updateOne(
    { name: "Emma" },
    { $set: { active: true } }
)

// Verify the changed Emma's active value
db.employees.find({ name: "Emma" })

// 3.3 Add MongoDB to Robert's skills using $addToSet.
db.employees.updateOne(
    { name: "Robert" },
    { $addToSet: { skills: "MongoDB" } }
)

// Verify
db.employees.find({ name: "Robert" })

// Execute the same update again
db.employees.updateOne(
    { name: "Robert" },
    { $addToSet: { skills: "MongoDB" } }
)

// Verify again
db.employees.find({ name: "Robert" })

// ----------------------------------------------------------------------------------------
// Task 4: Delete Operation

// 4.1 Insert the temporary employee.
db.employees.insertOne({
    _id: "EMP999",
    name: "Temporary Employee",
    department: "Training",
    experience: 0
})

// 4.2 Verify that the temporary employee was inserted.
db.employees.findOne({ _id: "EMP999" })

// 4.3 Delete the temporary employee using deleteOne().
db.employees.deleteOne({ _id: "EMP999" })

// 4.4 Verify that the temporary employee was deleted.
db.employees.findOne({ _id: "EMP999" })

// ----------------------------------------------------------------------------------------
// Task 5: Indexing

// 5.1 Check the existing indexes on employees.
db.employees.getIndexes()

// 5.2 Create an ascending index on department.
db.employees.createIndex({ department: 1 })

// 5.3 Verify the indexes.
db.employees.getIndexes()

// ----------------------------------------------------------------------------------------
// Task 6: Aggregation

// 6.1 Count employees in each department and sort by department.
db.employees.aggregate([
    { $group: { _id: "$department", count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
])

// 6.2 Calculate average experience per department and sort by department name.
db.employees.aggregate([
    { $group: { _id: "$department", averageExperience: { $avg: "$experience" } } },
    { $sort: { _id: 1 } }
])

// 6.3 Find the top 2 Engineering employees by experience.
db.employees.aggregate([
    { $match: { department: "Engineering" } },
    { $project: { _id: 0, name: 1, experience: 1 } },
    { $sort: { experience: -1 } },
    { $limit: 2 }
])
// ----------------------------------------------------------------------------------------