const express = require("express");
const db = require("../config/db");
const { body, check, validationResult } = require("express-validator");
const router = express.Router();

/* GET users listing. */
router
  .route("/?")
  .get(async (req, res, next) => {
    res.set("Content-Type", "application/json");
    let sql = "SELECT * FROM users ";
    db.query(sql, (error, results, fields) => {
      if (error)
        return res.status(500).json({
          status: 500,
          message: "Internal Server Error",
        });
      if (results.length > 0) {
        const result = {
          status: 200,
          data: results,
        };
        return res.json(result);
      } else {
        const result = {
          status: 204,
          data: "Data not found!",
        };
        return res.json(result);
      }
    });
  })
  .post([
    check('email', 'Email is not valid').isEmail(),
    check('username', 'Username field is required').not().isEmpty(),
    check('password', 'Password field is required').not().isEmpty(),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars long'),
    check('password').matches(/\d/).withMessage('Password must contain a number'),
  ], async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
    };
    let sql = "INSERT INTO users SET ? ";
    db.query(sql, user, (error, results, fields) => {
      console.log(error);
      if (error)
        return res.status(500).json({
          status: 500,
          message: "Internal Server Error",
        });
      user = [{ id: results.insertId, ...user }];
      const result = {
        status: 200,
        data: user,
      };
      return res.json(result);
    });
  });

router
  .route("/:id")
  .all((req, res, next) => {
    let sql = " SELECT * FROM users WHERE id = ? ";
    db.query(sql, [req.params.id], (error, results, fields) => {
      if (error)
        return res.status(500).json({
          status: 500,
          message: "Internal Server Error",
        });
      if (results.length === 0)
        return res.status(400).json({
          status: 400,
          message: "Not found user with the given ID",
        });
      res.user = results;
      next();
    });
  })
  .get((req, res, next) => {
    const result = {
      status: 200,
      data: res.user,
    };
    return res
      .header("Content-Type", "application/json")
      .status(200)
      .json(result);
  })
  .put([check('name', 'Name field is required').not().isEmpty(),],(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = {
      //username: req.body.username,
      //password: req.body.password,
      name: req.body.name,
      updated_at: req.timestamp.format(),
      //email: req.body.email,
    };
    let sql = " UPDATE users SET ? WHERE id = ? ";
    let query = db.query(
      sql,
      [user, req.params.id],
      (error, results, fields) => {
        if (error)
          return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
          });
        if (results.affectedRows > 0) {
          user = Object.assign(res.user[0], user);
        } else {
          user = res.user;
        }
        const result = {
          status: 200,
          data: user,
        };
        return res.json(result);
      }
    );
    //console.log(qy.sql);
  })
  .delete((req, res, next) => {
    let sql = " DELETE FROM users WHERE id = ? ";
    db.query(sql, [req.params.id], (error, results, fields) => {
      if (error)
        return res.status(500).json({
          status: 500,
          message: "Internal Server Error",
        });
      const result = {
        status: 200,
        data: res.user,
      };
      return res.json(result);
    });
  });

module.exports = router;
