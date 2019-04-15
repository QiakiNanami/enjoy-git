const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const Cat = mongoose.model('Cat', { name: String });

var a = 'dfdaf'


const kitty = new Cat({ name: 'Zildjian' });

kitty.save().then(() => console.log('meow'));

Cat.find({},function(err,data){
	console.log('111')
})

