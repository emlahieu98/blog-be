const ethers = require('ethers')
const {
    CONTRACT_ABI_NFT_BSC,
    CONTRACT_ADDRESS_NFT_BSC,
} = require('../config/smart_contract')
const BSC_provider = new ethers.providers.JsonRpcProvider(
    'https://data-seed-prebsc-1-s1.binance.org:8545/'
)
const CHAIN_TYPE = {
    BSC: 'bsc',
}
const getGasPrice = async (chain) => {
    if (chain === CHAIN_TYPE.BSC) {
        return (await BSC_provider.getGasPrice()) * 7
    }
}

const optionsTx = async (chain) => {
    return {
        gasPrice: await getGasPrice(chain),
        gasLimit: 500000,
    }
}

const connectSMC = async ({ CONTRACT_ABI_SM, CONTRACT_ADDRESS_SM, signer }) => {
    try {
        return new ethers.Contract(CONTRACT_ADDRESS_SM, CONTRACT_ABI_SM, signer)
    } catch (error) {
        throw new Error(error.message)
    }
}

/* mint NFT in BSC */
const callSMCMintNFT = async (wallet_address, tokenURI) => {
    try {
        const options = {
            CONTRACT_ABI_SM: CONTRACT_ABI_NFT_BSC,
            CONTRACT_ADDRESS_SM: CONTRACT_ADDRESS_NFT_BSC,
            signer: new ethers.Wallet(
                process.env.DEV_PRIVATE_KEY,
                BSC_provider
            ),
        }

        const contract = await connectSMC(options)

        /* call sm mint nft in BSC*/

        const config = await optionsTx(CHAIN_TYPE.BSC)

        const txn = await contract.mintNFT(wallet_address, tokenURI, config)

        console.log('🚀 bsc_txt_hash', txn.hash)

        return txn.hash
    } catch (error) {
        console.log('err', error)
    }
}

module.exports = { connectSMC, callSMCMintNFT }
