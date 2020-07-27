const Kingdom = require('./models/kingdom');

//export MongoDB mothods as promise functions
exports.getAll = () => {
    //find all records
    console.log("getAll");
    return Kingdom
        .find(
            {},
            (err, kingdoms) => err ? { error: err } : kingdoms)
        .lean();
};

exports.get = (requestedName) => {
    return Kingdom
        .find(
            { name: requestedName },
            (err, kingdoms) => err ? { error : err } : kingdoms[0])
        .lean();
};

exports.delete = (requestedName) => {
    //record array length before and after the operation
    const oldSize = Kingdom.length;
    let prom = Kingdom.deleteOne(
        {'name': requestedName});
        // .then(result => console.log('Deleted ', result.deletedCount, ' items.'))
        // .catch(err => console.error('Delete dailed with error: ', err));
        // (err, obj) => {
        //     if(err) {
        //         throw err;
        //     }
        //     console.log ('one document deleted: ', oldSize !== kingdoms.length);
        //     return { deleted: requestedName, total: Kingdom.length};
        // });
    return prom;
};

exports.add = (newKingdom) => {
    const oldSize = kingdoms.length;
    //verify the item is not duplicate
    const found = kingdoms.get(newKingdom.title);
    if(!found) {
        kingdoms.push(newKingdom);
    }
    //use array size to verify add
    console.log('item added: ', oldSize !== kingdoms.length, 'total: ', kingdoms.length);
    return {added: oldSize !==kingdoms.size, total: kingdoms.length};
};