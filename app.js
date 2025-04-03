const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const PORT = 3000;

let posts = [];
let idCounter = 1;

app.set("view engine", "ejs");

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post('/create', (req, res) => {  
  const { title, content } = req.body;  

  if (!title || !content) {
      return res.status(400).send("Title and content are required!");
  }

  const post = {  
      id: idCounter++,  
      title,  
      content,  
      createdAt: new Date().toLocaleString() // Add timestamp  
  };  

  posts.push(post);  
  res.redirect('/');  
});

app.get('/search', (req, res) => {
  const query = req.query.query?.toLowerCase();
  if (!query) return res.redirect('/');  // Redirect if query is empty

  const filteredPosts = posts.filter(post => 
      post.title.toLowerCase().includes(query)  // Filter posts by title
  );

  // Render the 'index' view with filtered posts
  res.render('index', { posts: filteredPosts });
});



app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render("post.ejs", { post });
}
);
app.post('/delete/:id', (req, res) => {  
  posts = posts.filter(post => post.id != req.params.id);  
  res.redirect('/');  
});
app.get('/edit/:id', (req, res) => {  
  const post = posts.find(p => p.id == req.params.id);  
  if (!post) return res.status(404).send('Post not found');  
  res.render('edit', { post });  
});
app.post('/update/:id', (req, res) => {  
  const post = posts.find(p => p.id == req.params.id);  
  if (!post) return res.status(404).send('Post not found');  

  post.title = req.body.title;  
  post.content = req.body.content;  

  res.redirect('/');  
});



app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
