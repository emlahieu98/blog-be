const axios = require('axios')

const sendMetadataInIPFS = async (value) => {
    const data = JSON.stringify({
        pinataOptions: {
            cidVersion: 1,
        },
        pinataMetadata: {
            name: value.name || 'No Name',
        },
        pinataContent: {
            name: value.name || '',
            description: value.description || '',
            image_url: value.image_url || '',
            attributes: value.attributes || [],
        },
    })
    const config = {
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        headers: {
            'Content-Type': 'application/json',
            pinata_api_key: `${process.env.PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.PINATA_API_SECRET}`,
        },
        data: data,
    }
    const res = await axios(config)
    const url_nft = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
    return url_nft
}
module.exports = { sendMetadataInIPFS }
