// const mockdata = require('./mock/test.json');

// module.exports={
//   devServer: {
//     port:4000,
//     before(app){
//       app.get('/goods/list',(req,res,next)=>{
//         res.json(mockdata);
//       })
//     }
//   }
// }

const path = require('path');
const Mock = require('./mock/mock.js');

module.exports ={
    devServer: {
        contentBase: path.join(__dirname, 'mock'),
        compress: true,
        port: 4000,
        overlay: {
          warnings: false,
          errors: true
        },
        before(app){
          Mock(app)
        }
    }
}

//1.添加mock
//cnpm install mockjs 
//2.在packjson.同级下添加vue.config.js
//3.vue 新建mock