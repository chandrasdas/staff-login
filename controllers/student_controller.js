const mysql = require('mysql');
const {localPool, remotePool} = require('../models/dbConn');

const pool = remotePool;

/*Controller #1 index*/
const student_index = (req, res) => {
  const sql =
    'SELECT class, section, caste, count(caste) as total ' +
    'FROM basic_info ' +
    'GROUP BY class,section, caste ' +
    'ORDER BY class,section';
    pool.query(sql, (err, result) => {
    if (err)
      throw err;
    //console.log('data send from server are:', result);
    const data = resultToGrid(result);
    res.render('student/student_index', { data: data, title: 'Home' });
  })
}

/*Controller #2 Details*/
const student_details = (req, res) => {
  const id = req.params.id;
  const sql = mysql.format('select name, class, father from basic_info where portal_id = ?;', id);
  pool.query(sql, (err, result) => {
    if (err)
      throw err;
    console.log('data send from server are:', result);
    res.render('student/student_details', { data: result, title: 'Stu Details' });
  })
}

/*Controller #3 Search*/
const student_search = (req, res) => {
  //const item = req.query.searchText;
  const item = req.body.searchText;
  const len = item.length;
  if (len <= 2) {
    const msg = 'Search text should be at least 3 character long';
    res.render('student/student_search', { data: msg, title: 'Search' });
    return;
  }
  
  if (!isNaN(item * 0)) {
    if (len === 13 || len === 14) {
      res.redirect('/student/details/'+item);
    } else {
      const msg = 'Student ID Should be 14 digit long';
      res.render('student/student_search', { data: msg, title: 'Search' });
    }
  } else {
    let sql = 'Select portal_id, name, class, section, roll, dob, father From basic_info ';
    sql = sql + 'Where academic_year = 2020 ';
    sql = mysql.format(sql + 'and name like ?;', item + '%');
    pool.query(sql, (err, result) => {
      if (err)
        throw err;
      //console.log('data send from server are:', result);
      res.render('student/student_search', { data: result, sItem: item, title: 'search' });
    });
  }
}

module.exports = {
  student_index,
  student_details,
  student_search,
}

const resultToGrid = (data) => {
  let grid = [], classes = [];
  let classIndex;
  //console.log('length =', data.length);

  for (let i = 0; i < data.length; i++) {
    if (data[i].class === null) continue;
    classIndex = classes.findIndex(classs => data[i].class === classs);

    if (classIndex === -1) {
      classIndex = classes.push(data[i].class) - 1;
      grid[classIndex] = [];
      grid[classIndex]['CLASS'] = data[i].class;
    }
    switch (data[i].section) {
      case 'A':
        if (grid[classIndex][0] === undefined) {
          grid[classIndex][0] = [];
          grid[classIndex][0]['TOTAL'] = 0;
          grid[classIndex][0]['SECTION'] = 'A';
        }
        grid[classIndex][0][data[i].caste] = data[i].total;
        grid[classIndex][0]['TOTAL'] += data[i].total;
        break;
      case 'B':
        if (grid[classIndex][1] === undefined) {
          grid[classIndex][1] = [];
          grid[classIndex][1]['TOTAL'] = 0;
          grid[classIndex][1]['SECTION'] = 'B';
        }
        grid[classIndex][1][data[i].caste] = data[i].total;
        grid[classIndex][1]['TOTAL'] += data[i].total;
        break;
      case 'C':
        if (grid[classIndex][2] === undefined) {
          grid[classIndex][2] = [];
          grid[classIndex][2]['TOTAL'] = 0;
          grid[classIndex][2]['SECTION'] = 'C';
        }
        grid[classIndex][2][data[i].caste] = data[i].total;
        grid[classIndex][2]['TOTAL'] += data[i].total;
        break;
      case 'E':
        if (grid[classIndex][3] === undefined) {
          grid[classIndex][3] = [];
          grid[classIndex][3]['TOTAL'] = 0;
          grid[classIndex][3]['SECTION'] = 'E';
        }
        grid[classIndex][3][data[i].caste] = data[i].total;
        grid[classIndex][3]['TOTAL'] += data[i].total;
        break;
      default:
        console.log('!Error, Section =', data[i].section);
    }
  }
  return grid;
}
