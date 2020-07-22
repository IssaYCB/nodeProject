router.get('/index', (req, res) => {
    Employee.find((err, docs) => {
    
        res.render("employee/index", {
            viewTitle: 'Update Employee',
            employee: req.body

        });
    });
});
router.get('/index', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/index", {
                viewTitle: 'Update Employee',
                employee: req.body
    
            });
        }
        else {
            console.log('Error in retrieviving index :' + err);
        }
    });
});