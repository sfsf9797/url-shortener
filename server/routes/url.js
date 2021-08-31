const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')

const router = express.Router()

// import   database model
const Url = require('../models/UrlModel')



//  API base Url endpoint
const baseUrl = 'http:localhost:5000'

router.post('/shorten', async (req, res) => {
    const {
        longUrl
    } = req.body


    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }

    //  we create the url code
    const urlCode = shortid.generate()


    if (validUrl.isUri(longUrl)) {
        try {
            /*  check if the long URL was in the DB ,else  create it.
            */
            let url = await Url.findOne({
                longUrl
            })

            // url exist and return the respose
            if (url) {
                res.json(url.shortUrl)
            } else {
                // join the generated short code the the base url
                const shortUrl = baseUrl + '/' + urlCode

                // invoking the Url model and saving to the DB
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode
                })
                await url.save()
                res.json(url.shortUrl)
            }
        }
        // exception handler
        catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json({
          'longurl': longUrl
        })
    }
})

module.exports = router
