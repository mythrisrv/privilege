let models = require("../model");
let moment = require("moment");
var ObjectId = require('mongodb').ObjectID;
getMenuList = (req) => {
    var id = req.query.id;
    return new Promise(async (resolve, reject) => {
      try {
        let privilege =  await models.Privilage.findOne({
            "_id":id
        });
        if(privilege)
        {
          var main_menu = privilege.alloted_mainmenus;
          var sub_menu = privilege.alloted_submenus;
          main_menu=main_menu.replace('[',"");
          main_menu= main_menu.replace(']',"");
          main_menu=main_menu.split(',');

          sub_menu=sub_menu.replace('[',"");
          sub_menu= sub_menu.replace(']',"");
          sub_menu=sub_menu.split(',');
          console.log(sub_menu);
          var menuwhereStatement = {main_status: 0};
          if(main_menu.length>0)
          {
            menuwhereStatement._id = { $in: main_menu }
          }

          let menu = await models.MainMenu.find(menuwhereStatement)
          .select('_id main_menuname main_link main_icon')
          .sort({'menu_order':1})
          var result=[];
         for(var j=0;j<menu.length;j++){

          var submenuwhereStatement = {sub_status: 0,sub_main_id : menu[j]._id};
          if(sub_menu.length>0)
          {
            submenuwhereStatement._id = { $in: sub_menu }
          }
              var submenu = await models.SubMenu.find(submenuwhereStatement)
              .select('_id sub_name sub_link sub_icon')
              .sort({'sub_order':1});
              menu[j].submenu=submenu;
              result.push(menu[j]);
         }
          resolve(result);
        }
        
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  module.exports = {
    getMenuList
  };