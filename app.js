const express = require("express");
const _ = require('lodash'); 

const homeStartingContent = "Crie suas notícias!"

const aboutContent = "Aqui é onde eu falo sobre esse site e blablabla..."

const contactContent = "Aqui é o contato e blablabla..."

const app = express();

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static("public"));

publicacoes = []

app.get('/', (req, res) => {
  res.render('home', {textoInicial: homeStartingContent})
});

app.get('/about', (req, res) => {
  res.render('about', {textoSobre: aboutContent})
});

app.get('/contact', (req, res) => {
  res.render('contact', {textoContato: contactContent})
});

app.get('/compose', (req, res) => {
  res.render('compose', {textoContato: contactContent})
});

app.post('/compose', (req, res) => {
  novaPublicacao = {
    titulo: req.body.titulo,
    texto: req.body.texto
  }
  publicacoes.push(novaPublicacao)
  res.redirect('/')
})

app.get('/post/:postID', (req, res) => {
  for (post in publicacoes) { 
    if (_.lowerCase(publicacoes[post].titulo) === _.lowerCase(req.params.postID)) {
      res.render('post', {
        tituloPublicacao: publicacoes[post].titulo,
        textoPublicacao: publicacoes[post].texto
      })
    }
  } 
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
