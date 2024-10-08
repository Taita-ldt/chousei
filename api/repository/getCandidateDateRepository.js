const appRoot = require('app-root-path');
const db = require(appRoot + '/models/index.js');

module.exports = {
  /**
   * 指定した月の候補日データを返す。
   * @param {string} month - 'YYYYMM'の形式で年月を指定する。
   */
  getCandidateDate(month) {
    return db.sequelize.query(
      'SELECT '
      + 'T1.candidate_date, '
      + 'COUNT(T1.candidate_date_id) AS candidate_date_count, '
      + 'SUM(T1.status) AS status_sum '
      + 'FROM '
      + '( '
      + 'SELECT '
      + 'candidate_date.candidate_date, '
      + 'candidate_date_statuses.candidate_date_id AS candidate_date_id, '
      + 'candidate_date_statuses.status AS status '
      + 'FROM '
      + 'candidate_date AS candidate_date '
      + 'LEFT JOIN '
      + 'candidate_date_status AS candidate_date_statuses '
      + 'ON candidate_date.id = candidate_date_statuses.candidate_date_id '
      + 'WHERE '
      + 'candidate_date.candidate_month = :month '
      + 'AND '
      + 'candidate_date_statuses.status != 0 '
      + ') AS T1 '
      + 'GROUP BY '
      + 'T1.candidate_date, '
      + 'T1.candidate_date_id '
      + 'ORDER BY '
      + 'candidate_date_count DESC, '
      + 'status_sum DESC, '
      + 'T1.candidate_date ASC;',
      { raw: false, replacements: { month } }
    );
  },
}