let oracledb = require('oracledb');

class Conexao {

	connect() {
		let {user, password, connectString} = config['oracle'];
		oracledb.getConnection(
			{user, password, connectString}, (err, connection) => {
				if (err) {
					console.error(err.message);
					return;
				} else
					this.connection = connection;
			});
	}

	doRelease(connection) {
		connection.close(
			function (err) {
				if (err)
					console.error(err.message);
			});
	}
}

module.exports = Conexao;