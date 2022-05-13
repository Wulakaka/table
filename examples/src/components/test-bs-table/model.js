export const columnsData = [
	{
		type: 'selection',
		width: 1,
		fixed: true,
	},
	{
		title: '序号',
		key: 'index',
		fixed: true,
		type: 'number',
		width: 1,
	},
	{
		title: '头像',
		key: 'pic',
		type: 'pic',
		width: 1.16,
		align: 'center',
		fixed: true,
		picStyle: {
			radius: '50%',
			width: '0.76rem',
			height: '0.76rem',
		},
	},
	{
		title: '姓名',
		key: 'name',
		action: true,
		align: 'center',
		// fixed: true,
		// width: 120,
	},

	{
		title: '地址',
		key: 'address',
		// width: 200,
	},
	// {
	// 	title: '工作岗位',
	// 	key: 'email',
	// 	width: 300,
	// 	type: 'select',
	// 	options: [
	// 		{
	// 			value: 'Web前端开发',
	// 			label: 'Web前端开发',
	// 		},
	// 		{
	// 			value: 'Java开发',
	// 			label: 'Java开发',
	// 		},
	// 		{
	// 			value: 'Python开发',
	// 			label: 'Python开发',
	// 		},
	// 		{
	// 			value: 'Php开发',
	// 			label: 'Php开发',
	// 		},
	// 	],
	// },
	// {
	// 	title: '月份',
	// 	key: 'month',
	// 	type: 'month',
	// 	width: 100,
	// },

	// {
	// 	title: '标题',
	// 	key: 'title',
	// 	width: 300,
	// },
	// {
	// 	title: '内容',
	// 	key: 'paragraph',
	// 	width: 300,
	// },
	// {
	// 	title: '链接',
	// 	key: 'url',
	// 	width: 200,
	// },
	// {
	// 	title: 'ip',
	// 	key: 'ip',
	// 	width: 200,
	// 	validate: (value) => {
	// 		const pattern =
	// 			/((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g;
	// 		return pattern.test(value);
	// 	},
	// },
	// {
	// 	title: '总金额',
	// 	key: 'sum',
	// 	width: 200,
	// },
	// {
	// 	title: 'ID',
	// 	key: 'id',
	// 	width: 200,
	// },
	// {
	// 	title: '色值',
	// 	key: 'color',
	// 	width: 200,
	// },
];
