const appRoot = require('app-root-path');
const db = require(appRoot + '/models/index.js');

module.exports = {
    /**
     * 指定した月の上位1日の応募日を返す。
     * @param {string} month - 'YYYYMM'の形式で年月を指定する。
     */
    getApplicationDate(month) {
      return db.sequelize.query(
        'SELECT '
        + 'T4.candidate_time_from AS application_date_from, '
        + 'T4.candidate_time_to AS application_date_to '
        + 'FROM '
        + '('
        + 'SELECT '
        + 'T1.id, '
        + 'T1.candidate_date, '
        + 'T3.candidate_time_from, '
        + 'T3.candidate_time_to, '
        + 'count(T2.status) AS status_count, '
        + 'sum(T2.status) AS status_sum, '
        + 'T3.lottery_status_magnification '
        + 'FROM '
        + 'candidate_date AS T1 '
        + 'INNER JOIN '
        + 'candidate_date_status AS T2 '
        + 'ON T1.id = T2.candidate_date_id '
        + 'INNER JOIN '
        + 'lottery_status AS T3 '
        + 'ON T1.id = T3.candidate_date_id '
        + 'WHERE '
        + 'T1.candidate_month = :month '
        + 'AND '
        + 'T2.status != 0 '
        + 'GROUP BY '
        + 'T1.id, '
        + 'T1.candidate_date, '
        + 'T3.candidate_time_from, '
        + 'T3.candidate_time_to, '
        + 'T3.lottery_status_magnification '
        + ') AS T4 '
        + 'ORDER BY '
        + 'T4.status_count DESC, '
        + 'T4.status_sum DESC, '
        + 'T4.lottery_status_magnification ASC, '
        + 'T4.candidate_date ASC '
        + 'LIMIT 1;',
        { raw: false, replacements: { month } }
    );
  },
}