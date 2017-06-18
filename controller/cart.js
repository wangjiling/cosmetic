var driverApi = require('../driverApi');
var setting = require('../configuration').setting;

//购物车列表
exports.getCartList = function(req, res, renderFun){
    renderFun(req,res,{title:'购物车列表'},'cart_list');
};
