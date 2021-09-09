//const pool = require('../models/dbConn');

const staff_index = (req, res) => {
//   const sql = 'select portal_id, name, class from basic_info limit 3;';
//   pool.query(sql, (err, result) => {
//     if (err)
//       throw err;
//     console.log('data send from server are:', result);
//  })
    res.render('staff/staff_index', { title: 'Staff Gist' });
  
}

module.exports = {
    staff_index,
  }