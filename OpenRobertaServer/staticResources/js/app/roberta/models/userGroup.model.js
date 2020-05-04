/**
 * Rest calls to the server related to userGroup operations (create user, login ...)
 * 
 * @module rest/program
 */
define([ 'exports', 'comm', 'guiState.model' ], function(exports, COMM, GUI) {


    /**
     * Retrieves userGroup with specified name from the server, if the currently logged in user is its owner
     * 
     * @param groupName
     *            {String} - name of the userGroup
     * @param successFn
     *            {Function} - a callback that is called when the creation succeeds. Needs to take one parameter "data"
     */
    function loadUserGroup(groupName, successFn) {
        COMM.json("/userGroup/getUserGroup", {
            "cmd" : "getUser",
            "groupName" : groupName,
        }, successFn, 'Got all information of the usergroup "' + groupName + '" of the user "' + GUI.user.accountName + '" from the server.');
    }

    exports.loadUserGroup = loadUserGroup;

    /**
     * Retrieves all userGroups from the server, for which the currently logged in user is the owner.
     * 
     * @param successFn
     *            {Function} - a callback that is called when the creation succeeds. Needs to take one parameter "data"
     */
    function loadUserGroupList(successFn) {
        COMM.json("/userGroup/getUserGroupList", null, successFn, 'Got the list of usergroups for the user "' + GUI.user.accountName + '" from the server.');
    }
    exports.loadUserGroupList = loadUserGroupList;

    /**
     * Retrieves all members of the usergroup of the provided name from the server, for which the currently logged in user is the owner.
     * 
     * @param groupName
     *            {String} - name of the userGroup
     * @param successFn
     *            {Function} - a callback that is called when the creation succeeds. Needs to take one parameter "data"
     */
    function loadUserGroupMemberList(groupName, successFn) {
        COMM.json("/userGroup/getUserGroupMemberList", null, successFn, 'Got the list of members for the usergroup "' + groupName + '" of the user "' + GUI.user.accountName + '" from the server.');
    }
    exports.loadUserGroupMemberList = loadUserGroupMemberList;

    /**
     * Create a usergroup on the server.
     * 
     * @param groupName
     *            {String} - name of the userGroup
     * @param successFn
     *            {Function} - a callback that is called when the creation succeeds. Needs to take one parameter "data"
     * 
     */
    function createUserGroup(groupName, successFn) {
        COMM.json("/userGroup/createUserGroup", {
            cmd : 'createUserGroup',
            groupName : groupName,
        }, function (data) {successFn(data);}, 'Create usergroup "' + groupName + '" for user "' + GUI.user.accountName + '" on server.');
    }

    exports.createUserGroup = createUserGroup;
    
    function deleteUserGroup(groupName, successFn) {
        COMM.json("/userGroup/deleteUserGroup", {
            cmd : 'deleteUserGroup',
            groupName : groupName,
        }, function (data) {successFn(data);}, 'Delete usergroup "' + groupName + '" of user "' + GUI.user.accountName + '" on server.');
    }
    exports.deleteUserGroup = deleteUserGroup;

});
