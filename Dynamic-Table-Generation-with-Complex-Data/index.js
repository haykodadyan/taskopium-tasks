const employees = [
    {
        id: 1,
        name: "John Doe",
        age: 30,
        department: "Engineering",
        role: { title: "Frontend Developer", level: "Mid" },
        contact: { email: "john.doe@example.com", phone: "123-456-7890" },
        skills: ["JavaScript", "React", "CSS"]
    },
    {
        id: 2,
        name: "Jane Smith",
        age: 28,
        department: "Design",
        role: { title: "UI/UX Designer", level: "Senior" },
        contact: { email: "jane.smith@example.com", phone: "098-765-4321" },
        skills: ["Figma", "Sketch", "Adobe XD"]
    },
    {
        id: 3,
        name: "Adam Brown",
        age: 33,
        department: "Engineering",
        role: { title: "Data Scientist", level: "Senior" },
        contact: { email: "adam.brown@example.com", phone: "772-345-9911" },
        skills: ["Python", "R", "Machine Learning", "Statistics"]
    },
    {
        id: 4,
        name: "Bob Jones",
        age: 27,
        department: "Marketing",
        role: { title: "Marketing Manager", level: "Mid" },
        contact: { email: "bob.jones@example.com", phone: "779-234-5678" },
        skills: ["Content Creation", "Social Media Marketing"]
        },
    {
        id: 5,
        name: "Mike Rivers",
        age: 31,
        department: "Desing",
        role: { title: "Graphic Designer", level: "Senior" },
        contact: { email: "mike.rivers@example.com", phone: "555-666-7777" },
        skills: ["Photoshop", "Canva", "Illustrator"]
    },
    {
        id: 6,
        name: "Emily Alliston",
        age: 37,
        department: "Engineering",
        role: { title: "Backend Developer", level: "Senior" },
        contact: { email: "emily.alliston@example.com", phone: "252-777-7890" },
        skills: ["Node.js", "Express", "MongoDB"]
    }
];

function tableGenerator() {
    const tbody = document.getElementById('table-body');

    employees.forEach(employee => {
        const row = document.createElement('tr');
        createCells(employee, row);
        tbody.appendChild(row);
    });
}
  
function createCells(obj, row) {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            const cell = document.createElement('td');
            if (typeof obj[prop] === 'object' && !Array.isArray(obj[prop])) {
                createCells(obj[prop], row);
            } else {
                cell.textContent = Array.isArray(obj[prop]) ? obj[prop].join(', ') : obj[prop];row.appendChild(cell);
            }
        }
    }
}
  

document.addEventListener('DOMContentLoaded', tableGenerator);
