const tasks = {
    tasks: [{
            task: 'Grocery shopping',
            completed: true
        },
        {
            task: 'Clean yard',
            completed: false
        },
        {
            task: 'Film course',
            completed: false
        }
    ],
    getTasksTodo() {
        return this.tasks.filter(task => task.completed === false)
    }
}

console.log(tasks.getTasksTodo())