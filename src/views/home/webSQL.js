// openDatabase()方法打开已经存在的数据库，如果数据库不存在则会创建一个新的数据库
// 五个参数：数据库名、版本号、描述文本、数据库大小、创建回调；第五个参数创建回调会在创建数据库后调用
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
// 执行操作database.transaction()函数
db.transaction(function(tx) {
        // 执行此句会在mydb数据库创建一个LOGS表
        tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
        // 插入数据
        tx.executeSql('INSERT INTO LOGS(ID,LOG) VALUES(2,"菜鸟教程")');
        // 使用动态值来插入数据
        tx.executeSql('INSERT INTO LOGS(ID,LOG) VALUES(?,?)', [e_id, e_log]);
    })
    // 读取数据
db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM LOGS', [], function(tx, results) {
        var len = results.rows.length,
            i;
        msg = "<p>查询记录条数: " + len + "</p>";
        document.querySelector('#status').innerHTML += msg;

        for (i = 0; i < len; i++) {
            alert(results.rows.item(i).log);
        }

    }, null);
});