const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
var bcrypt = require('bcryptjs');
const saltRound = 10;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const multer = require("multer");
const path = require('path');

app.use(express.json());
app.use(
	cors({
		origin: [ 'http://localhost:3000' ],
		methods: [ 'GET', 'POST', 'PUT' ],
		credentials: true
	})
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	session({
		key: 'userId',
		secret: 'subscribe',
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 60 * 60 * 24
		}
	})
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lastdatabase"
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
  },
  filename:  (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('قم باختيار صور ذات امتداد مما يلي: (jpeg, jpg, png, gif)')
  }
// storage: storage
});


//-------------Add New Activity  ----------------------------------------

app.post("/addactivity", upload.single("ActivityImage"), (req, res) => {
  const ActivityName = req.body.ActivityName;
  const Description = req.body.Description;
  const ActivityTime = req.body.ActivityTime;
  const ActivityDate = req.body.ActivityDate;
  const ActivityImage = req.file.originalname;

  db.query(
    `INSERT INTO activity(ActivityName, Description, ActivityTime, ActivityDate, Status, ActivityImage) VALUES (?, ?, ?, ?, 1, ?)`,
    [ActivityName, Description, ActivityTime, ActivityDate, ActivityImage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  )
})
////////////////Delete course////////////////////
app.post('/deletecourse', (req, res) => {
	const CourseID = req.body.CourseID;
	//console.log('SSN', SSN);
	db.query(
		'DELETE FROM course WHERE CourseID=?',
		[ CourseID ],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result)
				//console.log(result)
			}
		}
	);
});

//////////////EditStudentSect
app.put(`/editStudentSection`, (req, res) => {
  const SectionID= req.body.SectionSelected;
  const ChildSSN = req.body.ChildSSN;
console.log(SectionID)
  db.query(    
    `UPDATE childinfo SET SectionID = ? WHERE ChildSSN = ?`,
    [SectionID, ChildSSN],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values updated");
      }
    }
  )
})

app.put(`/deleteStudentFromSection`, (req, res) => {
  const ChildSSN = req.body.ChildSSN;
  db.query(    
    `UPDATE childinfo SET SectionID = NULL WHERE ChildSSN = ?`,
    [ChildSSN],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values updated");
      }
    }
  )
})


//-----------take course absent---------------------------------------

app.get("/takecourseabsent/:courseid", (req, res) => {
  const CourseID = req.params.courseid;
  db.query(
    `SELECT FullName, SSN FROM user WHERE SSN IN (SELECT UserSSN FROM coursemember WHERE CourseID = ${CourseID})`,
    [CourseID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
})
///////////////////////////AddSection////////////////////////////
app.post("/addSection", (req, res) => {
  db.query(`INSERT INTO sections(Semester, SectionType, TeacherSSN, SectionNameID)
        SELECT ? as Semester, ? as SectionType, user.SSN as TeacherSSN, sectionname.ID as SectionNameID
            FROM user, sectionname
           WHERE user.FullName = ? 
             AND sectionname.SectionName = ?`,
    [req.body.Semester, req.body.Type, req.body.TeacherName, req.body.SectionName],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
        console.log(result)
      }
    })
});

app.post("/addSectionType", (req, res) => {
  db.query(`INSERT INTO sectiontypes (Type) VALUES (?)`, [req.body.Type], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
      console.log(result)
    }
  })
});

app.get("/getTeachersNames", (req, res) => {
  db.query(`SELECT FullName FROM user WHERE SSN IN (SELECT SSN FROM usertype Where TypeID IN (SELECT TypeID FROM type WHERE Description="معلم"))`, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
      //console.log(result)
    }
  })
});

app.get("/getSectionsName", (req, res) => {
  db.query("SELECT SectionName FROM sectionname", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
      console.log(result)
    }
  })
});
////////////////////////ViewStudents////////////////////
app.put("/teacherName", (req, res) => {

  db.query(` SELECT FullName FROM user WHERE SSN IN (SELECT TeacherSSN FROM sections WHERE Semester = ? AND  SectionNameID IN (SELECT ID FROM sectionname WHERE  SectionName= ?) AND SectionType = ?);`, [req.body.Semester, req.body.SectionName, req.body.Type], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      var string = JSON.stringify(result);
			var json = JSON.parse(string);
			result = json[0].FullName;
			//console.log(result);
			res.json(result);
     // res.send(result)
    }
  })
});

app.put("/getStudentss", (req, res) => {

  db.query(`SELECT sections.ID, sections.Semester, sections.SectionType, sectionname.SectionName, user.FullName, childinfo.ChildSSN FROM sections INNER JOIN sectionname INNER JOIN childinfo INNER JOIN user on sectionname.ID = sections.SectionNameID AND sections.ID = childinfo.SectionID AND childinfo.ChildSSN = user.SSN AND sections.Semester = ? AND sectionname.SectionName = ? AND sections.SectionType = ?`, [req.body.Semester, req.body.SectionName, req.body.Type], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});



app.put("/getSectionTypes", (req, res) => {

  db.query(`SELECT SectionType FROM sections Where Semester = ? AND SectionNameID IN (SELECT ID FROM sectionname WHERE SectionName = ?)`, [req.body.Semester, req.body.SectionName], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

{/*
app.put("/getTeachers", (req, res) => {
  db.query(`SELECT FullName FROM user WHERE SSN IN (SELECT TeacherSSN FROM sections WHERE Semester = ? AND SectionNameID = (SELECT ID FROM sectionname WHERE SectionName = ?))`, [req.body.Semester, req.body.SectionName], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});
*/}

app.put("/getSectionsNames", (req, res) => {
  db.query("SELECT SectionName FROM sectionname WHERE ID IN (SELECT DISTINCT SectionNameID FROM sections WHERE Semester = ?)", [req.body.Semester], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});


app.get("/getSemesters", (req, res) => {
  //هون حكيت سيليكت ديستنكت يعني إنه ما يكرر قيمة معينة، إذا إلها بالداتا بيس اسمين أو صفين يختار بس واحد بدون تكرار
  db.query("SELECT DISTINCT Semester FROM sections", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});


//-------------Show Activity Images-------------------------

app.get("/showeventimages", (req, res) => {
  db.query(
    "SELECT * FROM activityimages WHERE ActivityName = 'اليوم المفتوح'", 
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
})
app.put("/fetchdataActivityImages", (req, res) => {
  ActivityID= req.body.ActivityID
    db.query(
      "SELECT * FROM activity WHERE ActivityID = ?", [ActivitID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    )
  })


//------------Add ImagesCourse---------------------------------------------

app.post("/addcourseimage", upload.array("images", 100), (req, res, err) => {
  const image = req.files;
  const CourseName = req.body.CourseName;

  for(let i=0; i< image.length; i++){
    db.query(
      " INSERT INTO courseimages(CourseName, Image) VALUES (?, ?)",
      [CourseName, image[i].originalname], (err, result) => {
        if (err) {
          console.log(err);
    res.sendStatus(500);
    return;
        }
        else if (result) {
          res.send({
            data: result,
            msg: 'تمّت إضافة الصور/ة بنجاح'
          });
        }
      });
    }
})

app.get("/addnewcourse", (req, res) => {
  db.query(
    "SELECT * FROM `course` WHERE CourseID= LAST_INSERT_ID()",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
})


//-------------Add ImagesActivity إن شاء الله ----------------------------------------




app.post("/addeventimage", upload.array("images", 100), (req, res, err) => {
    const image = req.files;
    const ActivityName = req.body.ActivityName;
    for(let i=0; i< image.length; i++){
    db.query(
      " INSERT INTO activityimages(ActivityName, image) VALUES (?, ?)",
      [ActivityName, image[i].originalname], (err, result) => {
        if (err) {
          console.log(err)
          res.send({
            msg: err
          });
        }
        else if (result) {
          res.send({
            data: result,
            msg: 'تمّت إضافة الصور/ة بنجاح'
          });
        }
      });
    }
})


app.get("/addnewevent", (req, res) => {
  db.query(
    "SELECT * FROM `activity` WHERE ActivityID= LAST_INSERT_ID()",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
})

///////////////////Add Students////////////////////////////////
app.get("/studentsnotinsections", (req, res) => {
  db.query("SELECT FullName, SSN FROM user WHERE SSN IN(SELECT ChildSSN FROM childinfo WHERE SectionID IS NULL)", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

app.get("/getSemesters", (req, res) => {
  db.query("SELECT DISTINCT Semester from sections", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

app.put("/getsections", (req, res) => {
  db.query("SELECT sections.ID, sections.Semester, sections.SectionType, sectionname.SectionName FROM sections INNER JOIN sectionname on sectionname.ID = sections.SectionNameID AND sections.Semester = ?", [req.body.SemesterSelected] ,(err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

app.post("/addStudentToSection", (req, res) => {
  var arr = [];
  arr = req.body.students;
  for (var i = 0; i < arr.length; i++) {
  db.query(`UPDATE childinfo set SectionID = ? WHERE ChildSSN = ?`,
    [req.body.SectionSelected, arr[i]],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
        console.log(result)
      }
    })
  }
});

//---------------Add New Activity---------------------------------------------------

app.post("/addevent", (req, res) => {
  const ActivityName = req.body.ActivityName;
  const Description = req.body.Description;
  const ActivityTime = req.body.ActivityTime;
  const ActivityDate = req.body.ActivityDate;

  db.query(
    `INSERT INTO activity(ActivityName, Description, ActivityTime, ActivityDate) VALUES (?,?,?,?)`,
    [ActivityName, Description, ActivityTime, ActivityDate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  )
})

//-----------------------------Add New Item------------------------------------------------------------------

app.post("/addnewitem",upload.single("ItemImage"), (req, res) => {
  const Name = req.body.Name;
  const Description = req.body.Description;
  const Price = req.body.Price;
  const Quantity = req.body.Quantity;
  const ProducerName = req.body.ProducerName;
  const ProducerPhone = req.body.ProducerPhone;
  const ItemImage = req.file.originalname;

  db.query(
    "INSERT INTO item(Name, Description, Price, Quantity, ProducerName, ProducerPhone, ItemImage) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [Name, Description, Price, Quantity, ProducerName, ProducerPhone, ItemImage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  )
})




//-------------Show Activity-------------------------
app.get("/showe", (req, res) => {
  db.query(
    "SELECT * FROM activity",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
})
//---------------------------------------------------------


//--------------------------------------------------


//-----------Show Coures---------------------------

app.get("/showc", (req, res) => {
  db.query(
      "SELECT * FROM course",
      (err, result) => {
          if (err) {
              console.log(err);
          } else {
              res.send(result);
          }
      }
  )
    })

//-----------------------------------------------------------------------------------------------


//-------------Add New Product ----------------------------------------

app.post("/addproducts", (req, res) => {
  const Name = req.body.Name;
  const Description = req.body.Description;
  const Price = req.body.Price;
  const Quantity = req.body.Quantity;
  const ProducerName = req.body.ProducerName;
  const ProducerPhone = req.body.ProducerPhone;

  db.query(
      "INSERT INTO item(Name, Description, Price, Quantity, ProducerName, ProducerPhone) VALUES (?, ?, ?, ?, ?, ?)",
      [UserSSN, Name, Description, Price, Quantity, ProducerName, ProducerPhone],
      (err, result) => {
          if (err) {
              console.log(err);
          } else {
              res.send("Values Inserted");
          }
      }
  )
})
//------------------------------------------------------------------------

//------------Show Product-----------------------------------------------
app.get("/store", (req, res) => {
  db.query(
      "SELECT * FROM item",
      (err, result) => {
          if (err) {
              console.log(err);
          } else {
              res.send(result);
          }
      }
  )
})
//-----------------------------------------------------------------------------------------------

//---------- Sign Up -----------------------
app.post('/signup', (req, res) => {
	const SSN = req.body.SSN;
	const UserName = req.body.UserName;
	const FullName = req.body.FullName;
	const Email = req.body.Email;
	const Password = req.body.Password;
	const Address = req.body.Address;
	const PlaceBirdth = req.body.PlaceBirdth;
	const Phone = req.body.Phone;
	const DateOfBirdth = req.body.DateOfBirdth;
	const ChildSSN = req.body.ChildSSN;
	const Diseases = req.body.Diseases;
	const Medication = req.body.Medication;
	const Access = req.body.Access;
	bcrypt.hash(Password, saltRound, (err, hash) => {
		if (err) {
			console.log(err);
		} else {
			db.query(
				'INSERT INTO user(SSN, UserName, FullName, Password, Email, Phone, Address,DateOfBirdth, PlaceBirdth) VALUES (?, ?, ?, ?,?, ?, ?, ?,?)',
				[ SSN, UserName, FullName, hash, Email, Phone, Address, DateOfBirdth, PlaceBirdth ],
				(err, result) => {
					if (err) {
						console.log(err);
					} else {
						const TypeID = req.body.TypeID;
						const SSN = req.body.SSN;
						db.query('INSERT INTO usertype(SSN,TypeID) VALUES (?, ?)', [ SSN, TypeID ], (err, result) => {
							if (err) {
								console.log(err);
							} else {
								if (TypeID == 2) {
									db.query(
										'INSERT INTO parentchild(ParentSSN,ChildSSN)VALUES(?,?)',
										[ SSN, ChildSSN ],
										(err, result) => {
											if (err) {
												console.log(err);
											} else {
												res.send(result);
											}
										}
									);
								}
								if (TypeID == 5) {
									db.query(
										'INSERT INTO childinfo(ChildSSN,Diseases,Medication,Access)VALUES(?,?,?,?)',
										[ SSN, Diseases, Medication, Access ],
										(err, result) => {
											if (err) {
												console.log(err);
											} else {
												res.send(result);
											}
										}
									);
								}
							}
						});
					}
					res.send(result);
				}
			);
		}
	});
});

//-----------------------------------------------
const verifyJWT = (req, res, next) => {
	const token = req.headers['x-access-token'];

	if (!token) {
		res.send('We need a token, please give it to us next time');
	} else {
		jwt.verify(token, 'jwtSecret', (err, decoded) => {
			if (err) {
				res.json({ auth: false, message: 'you are failed to authenticate' });
			} else {
				req.userId = decoded.id;
				next();
			}
		});
	}
};

//------------------------------------------------
app.get('/isUserAuth', verifyJWT, (req, res) => {
	res.send('You are authenticated Congrats:');
});
//------------------------------------------------------
app.put('/getRole', (req, res) => {
	const SSN = req.body.SSN;
	db.query('SELECT TypeID FROM usertype WHERE SSN = ?', [ SSN ], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log(result)
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			result = json[0].TypeID;
			//console.log(result);
			res.json(result);
		}
	});
});

//-------------------------------------------------
app.get('/login', (req, res) => {
	if (req.session.user) {
		res.send({ loggedIn: true, user: req.session.user });
	} else {
		res.send({ loggedIn: false });
	}
});

//-------------------------------------------------
app.post('/login', (req, res) => {
	const SSN = req.body.SSN;
	const Password = req.body.Password;

	db.query('SELECT * FROM user WHERE SSN=?', [ SSN ], (err, result) => {
		if (err) {
			console.log(err);
		}
		if (result.length > 0) {
			bcrypt.compare(Password, result[0].Password, (error, response) => {
				if (error) {
					console.log(error);
				}
				if (response) {
					const id = result[0].SSN;
					const token = jwt.sign({ id }, 'jwtSecret', {
						expiresIn: 3600
					});
					req.session.user = result;

					//    console.log(req.session.user);
					res.json({ auth: true, token: token, result: result });
				} else {
					res.json({ auth: false, message: 'خطأ في كلمة المرور' });
				}
			});
		} else {
			res.json({ auth: false, message: 'رقم الهوية غير مسجل' });
		}
	});
});
//-------------- Get Status of the account----------
app.put('/getStatus',(req,res)=>{
	const SSN = req.body.SSN;
	db.query('SELECT Status FROM user WHERE SSN = ? ',[SSN],(error,result)=>{
		if(error){
			console.log(error)
		}else{
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			result = json[0].Status;
			//console.log(result);
			res.json(result);
		}
	})
})
//-------------- Add Admin -------------------------
app.post('/AddAdmin', (req, res) => {
	const SSN = req.body.SSN;
	const UserName = req.body.UserName;
	const FullName = req.body.FullName;
	const Email = req.body.Email;
	const Password = req.body.Password;
	const Address = req.body.Address;
	const PlaceBirdth = req.body.PlaceBirdth;
	const Phone = req.body.Phone;
	const DateOfBirdth = req.body.DateOfBirdth;
	const TypeID = req.body.TypeID;
	bcrypt.hash(Password, saltRound, (err, hash) => {
		if (err) {
			console.log(err);
		} else {
			db.query(
				'INSERT INTO user(SSN, UserName, FullName, Password, Email, Phone, Address,DateOfBirdth, PlaceBirdth) VALUES (?, ?, ?, ?,?, ?, ?, ?,?)',
				[ SSN, UserName, FullName, hash, Email, Phone, Address, DateOfBirdth, PlaceBirdth ],
				(err, result) => {
					if (err) {
						console.log(err);
					} else {
						db.query('INSERT INTO usertype(SSN,TypeID) VALUES (?, ?)', [ SSN, TypeID ], (err, result) => {
							if (!err) {
								res.send(result);
							} else {
								console.log(err);
							}
						});
					}
				}
			);
		}
	});
});
//--------------Display Personal File for Trainee/Trainer/Admin --------------------
app.put('/PersonalFile1', (req, res) => {
	const SSN = req.body.SSN;
	//console.log('SSN', SSN);
	db.query(
		'SELECT SSN,UserName,FullName,Email,Phone,Address,DateOfBirdth,PlaceBirdth FROM user WHERE SSN = ?',
		[ SSN ],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result)
				//console.log(result)
			}
		}
	);
});
//----------------Display Personal Information For Child---------------
app.put('/ChildPersonalFile1', (req, res) => {
	const SSN = req.body.SSN;
console.log(SSN)
	db.query(
		'SELECT user.SSN, user.UserName, user.FullName, user.Email, user.Phone, user.Address, user.DateOfBirdth, user.PlaceBirdth ,childinfo.Diseases,childinfo.Medication,childinfo.Access, sectionname.SectionName,sections.SectionType FROM user INNER JOIN childinfo ON childinfo.ChildSSN = ? AND user.SSN = ? INNER JOIN sections ON sections.ID =childinfo.SectionID INNER JOIN sectionname ON sections.SectionNameID=sectionname.ID',[SSN,SSN],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result)
				console.log('result',result)
			}
		}
	);
});
//------------Display Personal Information For Parent--------------
app.put('/ParentPersonalFile1', (req, res) => {
	const SSN = req.body.SSN;

	db.query(
		`SELECT user.SSN, user.UserName, user.FullName,user.Email, user.Phone, user.Address, user.DateOfBirdth, user.PlaceBirdth ,parentChild.ChildSSN FROM user
  INNER JOIN parentChild ON parentChild.ParentSSN = ? AND user.SSN = ?`,[SSN,SSN],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result)
				console.log('result',result[0])
			}
		}
	);
});
//------------Edit Personal Information-------------------------
app.put('/PersonalFile', (req, res) => {
	const UserName = req.body.UserName;
	const FullName = req.body.FullName;
	const Email = req.body.Email;
	const Address = req.body.Address;
	const PlaceBirdth = req.body.PlaceBirdth;
	const Phone = req.body.Phone;
	const DateOfBirdth = req.body.DateOfBirdth;
	const SSN = req.body.SSN;
	db.query(
		'UPDATE user SET UserName = ? ,FullName = ? ,Email = ? ,Phone = ? ,Address = ? ,DateOfBirdth = ? ,PlaceBirdth = ?  WHERE SSN = ? ',
		[ UserName, FullName, Email, Phone, Address, DateOfBirdth, PlaceBirdth, SSN ],
		(err, result) => {
			if (!err) {
				res.send(result);
			} else {
				console.log(err);
			}
		}
	);
});
//------------Edit Child Personal Information-------------------------
app.put('/ChildPersonalFile', (req, res) => {
	const UserName = req.body.UserName;
	const FullName = req.body.FullName;
	const Email = req.body.Email;
	const Address = req.body.Address;
	const PlaceBirdth = req.body.PlaceBirdth;
	const Phone = req.body.Phone;
	const DateOfBirdth = req.body.DateOfBirdth;
	const SSN = req.body.SSN;
	const Diseases = req.body.Diseases;
	const Medication = req.body.Medication;
	const Access = req.body.Access;
	db.query(
		'UPDATE user SET UserName = ? ,FullName = ? ,Email = ? ,Phone = ? ,Address = ? ,DateOfBirdth = ? ,PlaceBirdth = ?  WHERE SSN = ? ',
		[ UserName, FullName, Email, Phone, Address, DateOfBirdth, PlaceBirdth, SSN ],
		(err, result) => {
			if (!err) {
				db.query(
					'UPDATE childinfo SET Diseases = ? , Medication = ? , Access = ? WHERE ChildSSN = ?',
					[ Diseases, Medication, Access, SSN ],
					(err, result) => {
						if (!err) {
							res.send(result);
						} else {
							console.log(err);
						}
					}
				);
			} else {
				console.log(err);
			}
		}
	);
});
//------------Edit Parent Personal Information-------------------------
app.put('/ParentPersonalFile', (req, res) => {
	const UserName = req.body.UserName;
	const FullName = req.body.FullName;
	const Email = req.body.Email;
	const Address = req.body.Address;
	const PlaceBirdth = req.body.PlaceBirdth;
	const Phone = req.body.Phone;
	const DateOfBirdth = req.body.DateOfBirdth;
	const SSN = req.body.SSN;

	db.query(
		'UPDATE user SET UserName = ? ,FullName = ? ,Email = ? ,Phone = ? ,Address = ? ,DateOfBirdth = ? ,PlaceBirdth = ?  WHERE SSN = ? ',
		[ UserName, FullName, Email, Phone, Address, DateOfBirdth, PlaceBirdth, SSN ],
		(err, result) => {
			if (!err) {
				res.send(result);
			} else {
				console.log(err);
			}
		}
	);
});



////////تعديل شعب الطلاب////////////////////
app.put(`/fetchStudentData`,(req, res) => {
  const id = req.body.ChildSSN;
  //const name = req.params.name;
  console.log(id);
  db.query(`SELECT DISTINCT sections.ID, sections.Semester, sections.SectionType, sectionname.SectionName, user.FullName FROM sections INNER JOIN sectionname INNER JOIN childinfo INNER JOIN user on sectionname.ID = sections.SectionNameID AND sections.ID = childinfo.SectionID AND childinfo.ChildSSN = user.SSN AND sections.ID = ? AND childinfo.ChildSSN = ?`,
	[req.body.SectionID, id], 
	(err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});



//------------------------------------------------------------------
app.post('/getType', (req, res) => {
	const SSN = req.body.SSN;
	db.query(
		`SELECT Description FROM type WHERE TypeID IN(SELECT TypeID FROM usertype WHERE SSN= ? )`,
		[ SSN ],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});
//-----------------------------------------------------------------
app.post('/getChild', (req, res) => {
	const SSN = req.body.SSN;
	db.query(
		`SELECT FullName FROM user WHERE SSN IN(SELECT ChildSSN FROM parentchild WHERE ParentSSN = ?)`,
		[ SSN ],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
			//	console.log(result);
				res.send(result);
			}
		}
	);
});
//-----------------Update Status------------------------
app.put("/updateStatus", (req, res) => {
  const Status= req.body.Status;
  console.log(Status)
  db.query( `UPDATE user SET Status=true WHERE Status=false`, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send("Values updated");
    }
  })
});

//--------------------------------------------------------
app.put("/getStudents", (req, res) => {
  const Type= req.body.Type;
  console.log(Type)
  db.query( `SELECT FullName FROM user WHERE SSN IN (SELECT ChildSSN FROM childinfo Where SectionID IN (SELECT SectionID FROM sectiontype WHERE Type="${Type}"))`, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

//----------------------------------------------------

app.put("/getSectionTypes", (req, res) => {
  const SectionName= req.body.SectionName;
  console.log(SectionName)
  db.query( `SELECT Type FROM sectiontype WHERE SectionID IN (SELECT SectionID FROM section Where SectionNameID IN (SELECT ID FROM sectionname WHERE SectionName="${SectionName}"))`, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

//-----------------------------------------------------------------
app.put("/getTeacherSections", (req, res) => {
  const TeacherSSN = req.body.TeacherSSN;
  db.query("SELECT SectionName FROM sectionname INNER JOIN sections on sectionname.ID = sections.SectionNameID AND sections.TeacherSSN = ?",[TeacherSSN], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});


app.put("/getTeacherTypes", (req, res) => {
  const TeacherSSN = req.body.TeacherSSN;
  const SectionName = req.body.SectionName;
  db.query("SELECT SectionType FROM sectionname INNER JOIN sections on sectionname.ID = sections.SectionNameID AND sections.TeacherSSN = ? AND sectionname.SectionName = ?",[TeacherSSN, SectionName], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

app.put("/getTeacherStudents", (req, res) => {
  const TeacherSSN = req.body.TeacherSSN;
  const SectionName = req.body.SectionName;
  const Type = req.body.Type;
  db.query("SELECT FullName FROM user INNER JOIN childinfo INNER JOIN sections INNER JOIN sectionname on sectionname.ID = sections.SectionNameID AND childinfo.SectionID = sections.ID AND user.SSN = sections.TeacherSSN AND sections.TeacherSSN = ? AND sectionname.SectionName = ? AND sections.SectionType = ?",[TeacherSSN, SectionName, Type], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

/////////////////
app.put(`/fetchproductdata`,(req, res) => {
  const id = req.body.ItemID;
  //const name = req.params.name;
  console.log(id);
  db.query(`SELECT * FROM item WHERE ItemID= ?`,
	[id], 
	(err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});
//
/////////////////
app.put(`/fetchactivitydata`,(req, res) => {
  const id = req.body.ActivityID;
  //const name = req.params.name;
  console.log(id);
  db.query(`SELECT * FROM activity WHERE ActivityID= ?`,
	[id], 
	(err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});
//-----------------------------------------------------------------
app.put(`/fetchcoursedata`,(req, res) => {
  const id = req.body.CourseID;
  //const name = req.params.name;
  console.log(id);
  db.query(`SELECT * FROM course INNER JOIN user on course.TeacherSSN = user.SSN AND CourseID= ?`,
	[id], 
	(err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

///------------Add Course ---------------------------------------

app.post("/addcourse", upload.single("CourseImage"), (req, res) => {
  const TeacherSSN = req.body.TeacherSSN;
  const Name = req.body.Name;
  const Description = req.body.Description;
  const CourseTime = req.body.CourseTime;
  const CourseDate = req.body.CourseDate;
  const CourseImage = req.file.originalname;

  db.query(
    "INSERT INTO course(TeacherSSN, Name, Description, CourseTime, CourseDate, Status, CourseImage) VALUES (?, ?, ?, ?, ?, 1, ?)",
    [TeacherSSN, Name, Description, CourseTime, CourseDate, CourseImage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  )
})

app.get("/getCoachesNames", (req, res) => {
  db.query(`SELECT FullName, SSN FROM user WHERE SSN IN (SELECT SSN FROM usertype Where TypeID = 4)`, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
      //console.log(result)
    }
  })
});
///////////////
app.put(`/editproduct`, (req, res) => {
  //const id = req.params.id;
  const ItemID= req.body.ItemID;
  const Name = req.body.text;
  const Description = req.body.Description;
  const Price = req.body.Price;
  const Quantity = req.body.Quantity;
  const ProducerName = req.body.ProducerName;
  const ProducerPhone = req.body.ProducerPhone;

  db.query(    
    `UPDATE item SET Name = ?, Description = ?, Price = ?, Quantity = ?, ProducerName = ?, ProducerPhone = ? WHERE ItemID= ?`,
    [Name, Description, Price, Quantity, ProducerName, ProducerPhone, ItemID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values updated");
      }
    }
  )
})
///////////////////////
app.put(`/editevent`, (req, res) => {
  //const id = req.params.id;
  const ActivityID= req.body.ActivityID;
  const Name = req.body.text;
  const Description = req.body.Description;
  const ActivityTime= req.body.ActivityTime;
  const ActivityDate = req.body.ActivityDate;

  db.query(    
    `UPDATE activity SET ActivityName = ?, Description = ?, ActivityTime = ?, ActivityDate = ?, Status = 1 WHERE ActivityID= ?`,
    [Name, Description, ActivityTime, ActivityDate, ActivityID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values updated");
      }
    }
  )
})
//-----------------------------------------------------------------

app.put(`/editcourse`, (req, res) => {
  //const id = req.params.id;
  const CourseID= req.body.CourseID;
  const Name = req.body.text;
  const Description = req.body.Description;
  const TeacherSSN = req.body.TeacherSSN;
  const CourseTime= req.body.CourseTime;
  const CourseDate = req.body.CourseDate;
  //const CourseImage = req.body.CourseImage;


  db.query(    
    `UPDATE course SET TeacherSSN = ?, Name = ?, Description = ?, CourseTime = ?, CourseDate = ?, Status = 1 WHERE CourseID= ?`,
    [TeacherSSN, Name, Description, CourseTime, CourseDate, CourseID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values updated");
      }
    }
  )
})

app.get("/editnewcourse", (req, res) => {
  db.query(
    "SELECT * FROM `course` WHERE CourseID= @LastUpdateID",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
})

///////////EditProductTable///
app.get("/producttable", (req, res) => {
  db.query("SELECT * FROM item", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});



/////////////// EditEventTable///
app.get("/activitytable", (req, res) => {
  db.query("SELECT * FROM activity", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});


//////////////delete
app.post('/deletecourse', (req, res) => {
	const CourseID = req.body.CourseID;
	//console.log('SSN', SSN);
	db.query(
		'DELETE FROM course WHERE CourseID=?',
		[ CourseID ],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result)
				//console.log(result)
			}
		}
	);
});
////////////

//////////////////////////////////////

app.post('/deleteevent', (req, res) => {
	const ActivityID = req.body.ActivityID;
	//console.log('SSN', SSN);
	db.query(
		'DELETE FROM activity WHERE ActivityID=?',
		[ ActivityID ],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result)
				//console.log(result)
			}
		}
	);
});
//////////////////////////
app.post('/getRole', (req, res) => {
	const SSN = req.body.SSN;
	if (SSN === null) {
		res.send('0');
	} else {
		db.query('SELECT TypeID FROM usertype WHERE SSN = ?', [ SSN ], (err, result) => {
			if (err) {
				console.log(err);
			} else {
				var string = JSON.stringify(result);
				var json = JSON.parse(string);
				result = json[0].TypeID;
				//	console.log(result);
				res.json(result);
			}
		});
	}
});

///////////////////////////

app.post('/deleteproduct', (req, res) => {
	const ItemID = req.body.ItemID;
	//console.log('SSN', SSN);
	db.query(
		'DELETE FROM item WHERE ItemID=?',
		[ ItemID ],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result)
				//console.log(result)
			}
		}
	);
});
//-----------------------------------------------------------------
app.get("/coursestable", (req, res) => {
  db.query("SELECT CourseID, Name, TeacherSSN, Description FROM course", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

app.delete("/deletecourse", (req, res) => {
  const CourseID = req.body.CourseID;
  const Name = req.body.Name;
  db.query(`DELETE FROM course WHERE CourseID="${CourseID}" AND Name="${Name}"`, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

//---------------Accounts---------------------------------------------
app.post("/activateAccount", (req, res) => {
  db.query(`UPDATE user SET Status = 1 WHERE user.SSN = ?`, [req.body.UserSSN], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
      console.log(result)
    }
  })
});

app.get("/accountsNotActive", (req, res) => {
  db.query("SELECT * FROM user INNER JOIN usertype INNER JOIN type on user.SSN = usertype.SSN AND usertype.TypeID = type.TypeID AND user.Status = 0", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

app.post("/unActiveAccount", (req, res) => {
  db.query(`UPDATE user SET Status = 0 WHERE user.SSN = ?`, [req.body.UserSSN], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
      console.log(result)
    }
  })
});


app.get("/parents", (req, res) => {
  db.query("SELECT * FROM user WHERE SSN IN (SELECT SSN FROM usertype WHERE TypeID = 2) AND Status = 1", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

//-----------------------------------------------------------------

app.get("/teachers", (req, res) => {
  db.query("SELECT * FROM user WHERE SSN IN (SELECT SSN FROM usertype WHERE TypeID = 3) AND Status = 1", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

//-----------------------------------------------------------------
app.get("/trainees", (req, res) => {
  db.query("SELECT * FROM user WHERE SSN IN (SELECT SSN FROM usertype WHERE TypeID = 4) AND Status = 1", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

//-----------------------------------------------------------------
app.get("/students", (req, res) => {
  db.query("SELECT * FROM user WHERE SSN IN (SELECT SSN FROM usertype WHERE TypeID = 5) AND Status = 1", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

app.get("/trainers", (req, res) => {
  db.query("SELECT * FROM user WHERE SSN IN (SELECT SSN FROM usertype WHERE TypeID = 6) AND Status = 1", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
});

//-----------Teachers------------------------------------------------------
app.get("/reports1", (req, res) => {
   db.query("SELECT COUNT(SSN) as count FROM usertype WHERE TypeID = 3", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      result = json[0].count;
      console.log(result);
      res.json(result);
    }
  })
});
//---------------Students--------------------------------------------------
app.get("/reports2", (req, res) => {
  db.query("SELECT COUNT(SSN) as count FROM usertype WHERE TypeID = 5 ", (err, result) => {
   if (err) {
     console.log(err)
   } else {
    var string = JSON.stringify(result);
    var json = JSON.parse(string);
    result = json[0].count;
    console.log(result);
    res.json(result);
   }
 })
});
//--------------Trainee---------------------------------------------------
app.get("/reports3", (req, res) => {
  db.query("SELECT COUNT(SSN) as count FROM usertype WHERE TypeID = 4 ", (err, result) => {
   if (err) {
     console.log(err)
   } else {
    var string = JSON.stringify(result);
    var json = JSON.parse(string);
    result = json[0].count;
    console.log(result);
    res.json(result);
   }
 })
});
//-----------------------------------------------------------------
app.get("/reports4", (req, res) => {
  db.query("SELECT COUNT(ActivityID) as count FROM activity", (err, result) => {
   if (err) {
     console.log(err)
   } else {
    var string = JSON.stringify(result);
    var json = JSON.parse(string);
    result = json[0].count;
    console.log(result);
    res.json(result);
   }
 })
});
//-----------------------------------------------------------------
app.listen(3003, () => {
  console.log("running on port 3003");
});



//اختيار كل اشي عن الطالب، بيانات شعبته واسمه هو

{/*
SELECT DISTINCT sections.ID, sections.Semester, sections.SectionType, sectionname.SectionName, user.FullName FROM sections INNER JOIN sectionname INNER JOIN childinfo INNER JOIN user on sectionname.ID = sections.SectionNameID AND sections.ID = childinfo.SectionID AND childinfo.ChildSSN = user.SSN AND sections.ID = 65 AND childinfo.ChildSSN = 121212121;
*/}