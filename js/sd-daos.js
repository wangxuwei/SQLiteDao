var _SQLiteDb;
(function($){
	var databaseOptions = {
			fileName: "SQLiteDemo",
			version: "1.0",
			displayName: "SQLiteDemo",
			maxSize: 1024
	};
	
	_SQLiteDb = openDatabase(
			databaseOptions.fileName,
			databaseOptions.version,
			databaseOptions.displayName,
			databaseOptions.maxSize
	);		
	brite.registerDao("tag",new brite.dao.SQLiteDao("Tags","id",[{column:'name',dtype:'TEXT'}]));
	
})(jQuery);