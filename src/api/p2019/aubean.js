/*
P2019-aubean 模块
修改时间：2019-8-27

*/

import {
    getDefaultAxios
} from '@/api/index.js'

export async function auth_token(params, axios) {
    axios = axios || getDefaultAxios();
    const {
        data
    } = await axios.post('/api/au/token', params)
    sessionStorage.setItem('access_token', data.data[0].access_token);
    return data.data[0].access_token;
}

export async function getTokenInfo(params = {}, axios) {
    axios = axios || getDefaultAxios();
    return await axios.get('/api/au/token/info', {
        params
    });
}

export async function getUsers(params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.get('/api/au/users', {
        params
    });
}

export async function getUser(au_userid, params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.get('/api/au/users/' + au_userid, {
        params
    });
}

export async function getUserGroups(au_userid, params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.get('/api/au/users/' + au_userid + "/groups", {
        params
    });
}

export async function setUserGroups(au_userid, params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.put('/api/au/users/' + au_userid + "/groups", params);
}

export async function addUser(params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.post('/api/au/users', params)
}

export async function deleteUser(au_userid, params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.delete('/api/au/users/' + au_userid, params)
}

export async function updateUser(au_userid, params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.post('/api/au/users/' + au_userid, params)
}

export async function addGroup(params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.post('/api/au/groups', params)
}

export async function getGroup(au_groupid, params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.get('/api/au/groups/' + au_groupid, {
        params
    })
}

export async function getGroups(params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.get('/api/au/groups', {
        params
    });
}

export async function deleteGroup(params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.delete('/api/au/groups/' + params)
}

export async function updateGroup(au_groupid, params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.post('/api/au/groups/' + au_groupid, params)
}


/*
export async function addGroupUser(params, options, axios) {
    axios = axios || getDefaultAxios();
    return await axios.post('/api/au/' + params + '/groups_user/' + options)
}

export async function deleteGroupUser(params, options, axios) {
    axios = axios || getDefaultAxios();
    return await axios.delete('/api/au/' + params + '/groups_user/' + options)
}*/

export async function getRights(au_type, au_userid, params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.get('/api/au/rights/' + au_type + '/users/' + au_userid, {
        params
    })
}

export async function getRightsRes(au_type, res, params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.get('/api/au/rights/' + au_type + '/res/' + res, {
        params
    })
}

export async function setRights(params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.post('/api/au/rights', params)
}

export async function getGroupPermission(params, options, axios) {
    axios = axios || getDefaultAxios();
    return await axios.get('/api/au/groups/' + params + '/permissions')
}

export async function getUserPermission(params, options, axios) {
    axios = axios || getDefaultAxios();
    return await axios.get('/api/au/users/' + params + '/permissions')
}

export async function addPermission(params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.post('/api/au/permissions', params)
}

export async function getPermission(params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.get('/api/au/permissions/' + params)
}

export async function getPermissions(params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.get('/api/au/permissions', params);
}

export async function deletePermission(params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.delete('/api/au/permissions/' + params)
}

export async function updatePermission(params, options, axios) {
    axios = axios || getDefaultAxios();
    return await axios.put('/api/au/permissions/' + params, options)
}

export async function getInterfaces(params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.get('/api/au/interfaces', params);
}
// 验证唯一标识符
export async function getPerId(auth_code, params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.get('/api/au/permissions/' + auth_code + '/auth_code', {
        params
    });
}
// 导入权限
export async function importSetting(params, axios) {
    axios = axios || getDefaultAxios();
    return await axios.post('/api/au/permissions/import', params);
}