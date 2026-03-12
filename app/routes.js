const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/application-type', function (req, res) {
  res.render('application-type')
})

router.post('/application-type', function (req, res) {
  const answer = req.session.data['application-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'application-type': 'Select who you are applying for' }
    return res.render('application-type')
  }
  if (answer === 'an-organisation') {
    return res.redirect('/ineligible-application-type')
  }
  res.redirect('/automatic-qualification')
})

router.get('/ineligible-application-type', function (req, res) {
  res.render('ineligible-application-type')
})

router.get('/automatic-qualification', function (req, res) {
  res.render('automatic-qualification')
})

router.post('/automatic-qualification', function (req, res) {
  const answer = req.session.data['automatic-qualification']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'automatic-qualification': 'Select yes if you get any of these benefits or allowances' }
    return res.render('automatic-qualification')
  }
  res.redirect('/mobility-difficulty')
})

router.get('/mobility-difficulty', function (req, res) {
  res.render('mobility-difficulty')
})

router.post('/mobility-difficulty', function (req, res) {
  const answer = req.session.data['mobility-difficulty']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'mobility-difficulty': 'Select yes if you have difficulty walking or cannot walk' }
    return res.render('mobility-difficulty')
  }
  res.redirect('/full-name')
})

router.get('/full-name', function (req, res) {
  res.render('full-name')
})

router.post('/full-name', function (req, res) {
  const answer = req.session.data['full-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'full-name': 'Enter your full name' }
    return res.render('full-name')
  }
  res.redirect('/date-of-birth')
})

router.get('/date-of-birth', function (req, res) {
  res.render('date-of-birth')
})

router.post('/date-of-birth', function (req, res) {
  const answer = req.session.data['date-of-birth']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'date-of-birth': 'Enter your date of birth' }
    return res.render('date-of-birth')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('BB')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
