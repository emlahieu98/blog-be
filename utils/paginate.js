exports.getItems = (model, page, page_size) => {
    const query = {}
    const options = {
        lean: true,
        sort: { createdAt: -1 },
        page: page,
        limit: page_size,
        forceCountFn: true,
    }
    return new Promise((resolve, reject) => {
        model
            .paginate(query, options)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
