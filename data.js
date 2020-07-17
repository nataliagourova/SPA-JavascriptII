let kingdoms = [
    {name: 'animals',
    legs: 4,
    fluidtemp: 'hot',
    mobile: true    
    },
    {name: 'insects',
    legs: 6,
    fluidtemp: 'neutral',
    mobile: true,
    },
    {name: 'plants',
    legs: 0,
    fluidtemp: 'neutral',
    mobile: false   
    }, 
    {name: 'amphibia',
    legs: 0,
    fluidtemp: 'neutral',
    mobile: true    
    }, 
    {name: 'minerals',
    legs: 0,
    fluidtemp: 'neutral',
    mobile: false   
    }
];
exports.getAll = () => {
    return kingdoms;
}
exports.numberOfObjects = () => {
    return kingdoms.length;
}
exports.getItem = (name) => {
    return kingdoms.find((item) => {
        return item.name === name;
    });
}
exports.addItem = (newKingdom) => {
    let itemFound = false;
    kingdoms.forEach ((item) => {
        if (item.name == newKingdom.name) {
            itemFound = true;
        return;
        }
    });
    if (!itemFound) {
        kingdoms.push(newKingdom);
    }
    return {"added": !itemFound, "number of objects": kingdoms.length};
}
exports.deleteItem = (name) => {
    let deleted = false;
    kingdoms.forEach((item, index) => {
        if (item.name == name){
            kingdoms.splice(index,1);
            deleted = true;
        }       
    });
    return {"deleted": deleted, "number of objects": kingdoms.length};
}