var searchData = require("../mockupdata/search.json");

exports.getSearchList = function(req,res,renderFun){
    if(req.params.searchStr){
        renderFun(req,res,{
            title:'搜索',
            searchData:searchData.getSearchList,
            searchStr:req.params.searchStr
        },'search');
    }else{
        renderFun(req,res,{
            title:'搜索',
            searchData:{},
            searchStr:''
        },'search');
    }
};