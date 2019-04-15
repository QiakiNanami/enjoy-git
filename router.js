var fs = require('fs')

var express = require('express')

var router = express.Router()

var bodyParser = require('body-parser')

var Student = require('./student')


//学生首页
router.get('/students',function(req,res){
	Student.find(function(err,data){
		if (err) {
			return res.status(500).send('Server error')
		}
		res.render('index.html', {
			fruits: [
				'苹果',
				'香蕉',
				'橘子'
			],
			students: data
		})	
	})
})

//新建学生页面
router.get('/students/new',function(req,res){
	res.render("./new.html")
})

//新增学生
router.post('/students/new',function(req,res){
	//将数据持久化
	var student = req.body
	Student.save(student,function(err){
		if(err){
			return res.status(500).send('Server error')			
		}
		res.redirect('/students')
	})
})

//修改学生页面
router.get('/students/edit',function(req,res){
	Student.findById(parseInt(req.query.id),function(err,student){
		if(err){
			return res.status(500).send('Server error')			
		}
		res.render('edit.html',{
			student : student
		})
	})
})

//修改学生
router.post('/students/edit',function(req,res){
	var student = req.body
	Student.updataById(student,function(err){
		if(err){
			return res.status(500).send('Server error')			
		}
		res.redirect('/students')
	})
})

//删除学生
router.get('/students/delete',function(req,res){
	Student.deleteById(parseInt(req.query.id),function(err){
		if(err){
			return res.status(500).send('Server error')			
		}
		res.redirect('/students')
	})

})


module.exports=router