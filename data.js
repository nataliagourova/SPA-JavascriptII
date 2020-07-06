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