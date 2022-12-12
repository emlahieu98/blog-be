const axios = require('axios')
const Moralis = require('moralis').default
const { EvmChain } = require('@moralisweb3/common-evm-utils')

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
            external_link: value.external_link || '',
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
const getNFTsByAddress = async (wallet_address) => {
    const options = {
        method: 'GET',
        url: 'https://deep-index.moralis.io/api/v2/address/nft',
        headers: {
            accept: 'application/json',
            'X-API-Key': process.env.MORALIS_API_KEY,
        },
        params: {
            address: wallet_address,
            chain: '0x61',
        },
    }
    const result = await axios.request(options)

    return result.data
}
module.exports = { sendMetadataInIPFS, getNFTsByAddress }
