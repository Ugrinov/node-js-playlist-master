// let data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}]
let  mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb+srv://test:test@cluster0.wf01i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true});

//Create a schema - this is like a blueprint
let todoSchema = new mongoose.Schema({
    item: String
});

let Todo = mongoose.model('Todo', todoSchema);



module.exports = function (app) {

    app.get('/todo', function (req, res){
        //get data from mongodb and pass it to view
        Todo.find({}, function (err,data){
            if (err) throw err;
            res.render('todo', {todos: data})
        })
    });

    app.post('/todo', function (req, res){
        // get data from the view and add it to mongodb
        let newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item', function (req, res){
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
            if (err) throw err;
            res.json(data)
        })
    });


};