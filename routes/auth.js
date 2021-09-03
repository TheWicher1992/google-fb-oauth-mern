const express = require('express')
const router = express.Router()
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const axios = require('axios')

const verifyFacebookToken = async (accessToken, userId) => {
  try {

    const fbGraph = `https://graph.facebook.com/${userId}?fields=id,name,email,picture&access_token=${accessToken}`
    const res = await axios.get(fbGraph)

    return {
      profile: res.data,
      status: 'SUCCESS'
    }
  } catch (err) {
    return {
      status: "FAILIURE",
    }
  }
}

const verifyGoogleToken = async (tokenId) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    return {
      status: 'SUCCESS',
      profile: ticket.getPayload()
    }

  } catch (err) {
    return {
      status: 'FAILIURE'
    }
  }
}


router.post("/google", async (req, res) => {
  const {
    tokenId
  } = req.body
  const verificationResult = await verifyGoogleToken(tokenId)
  console.log(verificationResult)
  res.end()
})


router.post('/facebook', async (req, res) => {
  const { accessToken, userID } = req.body
  const verificationResult = await verifyFacebookToken(accessToken, userID)
  console.log(verificationResult)
  res.end()
})

module.exports = router
