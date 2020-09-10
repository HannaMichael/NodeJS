const blog = require('../models/blog')

const blog_details = (req, res) => {
  const id = req.params.id
  blog.findById(id)
    .then(result => {
      res.render('blogs/details', { title: 'detailed blog', blog: result })
    })
    .catch(err => {
      res.status(404).render('404', { title: 'Page Not Found' })
    })
}

const blog_delete = (req, res) => {
  const id = req.params.id
  blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' })
    })
    .catch((err) => console.log(err))
}

const blog_index = (req, res) => {
  blog.find().sort({ intro: -1 })
    .then((result) => {
      res.render('blogs/index', { title: 'blogs', blogs: result })

    })
    .catch((err) => {
      console.log(err)
    })
}

const blog_create_post = (req, res) => {
  const newblog = new blog(req.body)
  newblog.save()
    .then(res.redirect('/blogs'))
    .catch((err) => console.log(err))
}

const blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Create Blog' })

}
module.exports = {
  blog_details,
  blog_delete,
  blog_index,
  blog_create_post,
  blog_create_get,
}