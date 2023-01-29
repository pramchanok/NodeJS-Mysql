const express = require("express");
const router  = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  return res
    .header("Content-Type", "application/json")
    .status(200)
    .json({massages : "Wellcom to my ExpressJS"});
});

/* router.get('/', async function(req, res, next) {

  res.set('Content-Type', 'application/json');
  //const jsonContent = JSON.stringify({ data: "Not found data." });
  let sql = 'SELECT * FROM cas_user '
  db.query(sql,(error, results, fields)=>{
    if(error) return res.status(500).json({
        "status": 500,
        "message": "Internal Server Error"
    })
    const result = {
        "status": 200,
        "data": results
    }
    return res.json(result)       
    //const jsonContent = JSON.stringify(results);
    //res.end(jsonContent);
  })
});

router.get('/posts', async function(req, res, next) {
  let id            = (req.query.id ? `/${req.query.id}` : '');
  const response    = await fetch(`https://jsonplaceholder.typicode.com/posts${id}`);
  const data        = await response.json();
  const jsonContent = JSON.stringify(data);
  //res.json(jsonContent);
  res.set('Content-Type', 'application/json');
  res.end(jsonContent);
});

router.get('/posts/:id', async (req, res, next) => {
  let param = req.params.id;
  const response    = await fetch(`https://jsonplaceholder.typicode.com/posts/${param}`);
  const data        = await response.json();
  const jsonContent = JSON.stringify(data);
  //res.json(jsonContent);
  res.set('Content-Type', 'application/json');
  res.end(jsonContent);
})

router.get('/comments', async (req, res, next) => {
  const response    = await fetch('https://jsonplaceholder.typicode.com/comments');
  const data        = await response.json();
  const jsonContent = JSON.stringify(data);
  console.log(data);
  //res.json(jsonContent);
  res.set('Content-Type', 'application/json');
  res.end(jsonContent);
}) */

module.exports = router;
