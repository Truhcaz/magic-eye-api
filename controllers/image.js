import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '859ddfb975034a3fa7c6130e64626fae'
  })

const handleApiCall = (req, res) => {
    app.models.predict(
        {
            id: 'face-detection',
            name: 'face-detection',
            version: '6dc7e46bc9124c5c8824be4822abe105',
            type: 'visual-detector',
        }, req.body.input)
        .then(data => {
            res.json(data);
        })        
        .catch(err => res.status(400).json('unable to connect with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;

    db.select('*').from('users').where('id','=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(404).json('unable to get entries'))
}

export default {handleImage, handleApiCall};
