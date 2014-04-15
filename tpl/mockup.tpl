var mockup = require('{{{toolModule}}}');

exports.response = function (path, params) {
{{#eq type "session"}}
    return mockup.session(
        // {
        //     visitor: {
        //         username: '访问者',
        //         roleId: 1,
        //         id: 123
        //     },
        //     adOwner: {
        //         username: '广告主',
        //         roleId: 1,
        //         id: 124
        //     }
        // }
    );

    // return mockup.globalFail('无法读取用户信息！');
{{/eq}}{{#eq type "ok"}}
    return mockup.ok(
        {
            // id: 1
        }
    );
{{/eq}}{{#eq type "list"}}
    return mockup.list(
        // [
        //     {
        //         id: 1
        //     }
        // ],
        // {
        //     totalCount: page.totalCount || 100,
        //     pageNo: page.pageNo || 1,
        //     pageSize: page.pageSize || 15,
        //     orderBy: page.orderBy || 'id',
        //     order: page.order || 'desc',
        // }
    );
{{/eq}}{{#eq type "form"}}
    return mockup.ok(
        {
            // id: 1
        }
    );

    // return mockup.globalFail('提交失败！');

    // return mockup.fieldFail(
    //     {
    //         // name: '名称过长！'
    //     }
    // );
{{/eq}}{{#eq type "global"}}
    return mockup.globalFail('请求失败！');
{{/eq}}{{#eq type "field"}}
    return mockup.fieldFail(
        {
            // name: '名称过长！'
        }
    );
{{/eq}}
};