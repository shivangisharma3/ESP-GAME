var glob={count: 0};
module.exports ={
    setCount: function(newVal)
    {
        glob.count=newVal;
    },
    getCount: function()
    {
        return glob.count;
    }
};