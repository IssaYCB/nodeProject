
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const e = require('express');
const Employee = mongoose.model('Employee');

///////////////
// router.get("/", function(req, res){
//     var noMatch = null;
//     if(req.query.search) {
//         const regex = new RegExp(escapeRegex(req.query.search), 'gi');
//         // Get all employee from DB
//         Employee.find({myWord: regex}, function(err, allEmployees){
//            if(err){
//                console.log(err);
//            } else {
//               if(allEmployees.length < 1) {
//                   noMatch = "No employee match that query, please try again.";
//               }
//               res.render("employee/index",{employee:allEmployees, myWord, noMatch: noMatch});
//            }
//         });
//     } else {
//         // Get all employee from DB
//         Employee.find({}, function(err, allEmployees){
//            if(err){
//                console.log(err);
//            } else {
//               res.render("employee/index",{employee:allEmployees, noMatch: noMatch});
//            }
//         });
//     }
// });
// ///////////////
router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
    });
});
router.get('/index', (req, res) => {
            res.render("employee/index", {
    
        }
    );
});

router.get('/', (req, res) => {
    if(req.query.search) {
        res.render('employee/addOrEditndex')
    }
    else {
        res.render('employee/addOrEditndex')
    }
    
});





router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
        
});


function insertRecord(req, res) {
    var employee = new Employee();
    employee.myName = req.body.myName;
    employee.category = req.body.categoy
    employee.myWord = req.body.myWord;
    employee.myDefinition = req.body.myDefinition;
    employee.mySource = req.body.mySource;
    employee.myReferenceMaterials = req.body.myReferenceMaterials;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') { 
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            const context = {
                list: docs.map(doc => {
                    return {
                        _id: doc._id,
                        myName: doc.myName,
                        category: doc.category,
                        myWord : doc.myWord,
                        myDefinition : doc.myDefinition,
                        mySource : doc.mySource,
                        myReferenceMaterials : doc.myReferenceMaterials

                    }
                })
            }

            res.render('employee/list', {
                list: context.list
            })
            // res.render("employee/list", {
            //     list: doc
            // });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});




function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                employee: doc.toJSON() 
            });
        }
        else { console.log('Error in employee delete :' + err); 
        res.end()}
    });
});
router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;

