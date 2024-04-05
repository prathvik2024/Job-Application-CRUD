const queryExecuter = (tableName, values) =>{
    var tables = ["basic_info", "preferances", "school_result", "collage_result", "work_experience", "language_known", "technology_known", "reference_contact"];
    var tableColumns = [["fname", "lname", "designation", "email", "phone", "gender", "relationship_status", "address1", "address2", "city", "state", "zipcode", "dob"]];

    var insertStr = `insert into ${tableName} (${tableColumns[0].toString()}) values ("${Object.values(values).join('","')}")`;
    console.log(insertStr);
}
queryExecuter("basic_info", {"bd-fname":'prathvik',"bd-lname":'prathvik'});