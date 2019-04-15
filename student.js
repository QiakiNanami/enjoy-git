/**
 * 操作学生相关方法
 */
var fs = require('fs')

var dbPath = './db.json'

/**
 * 获取所有学生列表
 * return []
 */
exports.find = function(callback){
	fs.readFile(dbPath,function(err,data){
		if(err){
			callback(err);
		}
		callback(null,JSON.parse(data).students)
	})
}

/**
 * 保存学生信息
 * @return {[type]} [description]
 */
exports.save = function(student,callback){
	fs.readFile(dbPath,function(err,data){
		if(err){
			callback(err);
		}
		var students = JSON.parse(data).students
		//处理ID
		student.id = students[students.length - 1].id + 1

		students.push(student)

		var ret = JSON.stringify({
			students : students
		})

		saveData(ret,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})
	})
}

/**
 * 更新用户
 * @param  {[type]}   student  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.updataById = function(student,callback){
	fs.readFile(dbPath,function(err,data){
		if(err){
			callback(err);
		}
		var students = JSON.parse(data).students

		var stu = students.find(function (item){
			return item.id === parseInt(student.id)
		})

		for(var key in student){
			stu[key] = student[key]
		}

		var fileData = JSON.stringify({
			students : students
		})

		saveData(fileData,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})

	})
}

/**
 * 保存用户方法
 * @param  {[type]}   ret      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function saveData(ret,callback){
		fs.writeFile(dbPath,ret,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})
}



/**
 * 根据ID 查找用户
 * @param  {[type]}   student  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.findById = function(id,callback){
	fs.readFile(dbPath,function(err,data){
		if(err){
			callback(err);
		}
		var students = JSON.parse(data).students

		var stu = students.find(function (item){
			return item.id === id
		})
		callback(null,stu)
	})
}


exports.deleteById = function(id,callback){
	fs.readFile(dbPath,function(err,data){
		if(err){
			callback(err);
		}
		var students = JSON.parse(data).students

		var stu = students.findIndex(function (item){
			return item.id === parseInt(id)
		})

		students.splice(stu)

		var fileData = JSON.stringify({
			students : students
		})

		saveData(fileData,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})

	})
}	
