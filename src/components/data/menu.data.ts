export default {
	admin: [
		{
			path: '/home',
			name: 'Dashboard',
			children: [
				{
					path: '/home/test',
					name: '首页'
				}
			]
		},
		{
			path: '/home/usermanage',
			name: '用户管理',
			children: [
				{
					path: '/home/usermanage/userlist',
					name: '用户列表'
				}
			]
		}
	]
}
