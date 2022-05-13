(function (designWidth) {
	let doc = document;
	let win = window;
	let docEl = doc.documentElement;
	let remStyle = document.createElement('style');
	let tid;
	function refreshRem() {
		let width = docEl.getBoundingClientRect().width;

		let rem = (width * 100) / designWidth;
		remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
		console.log('width', width);
		console.log('rem-----', rem);
		document.getElementsByTagName('html')[0].style.fontSize = rem + 'px';
	}

	refreshRem();
	win.addEventListener(
		'resize',
		function () {
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		},
		false
	);
	win.addEventListener(
		'pageshow',
		function (e) {
			if (e.persisted) {
				clearTimeout(tid);
				tid = setTimeout(refreshRem, 300);
			}
		},
		false
	);

	// 给body font-size 赋值,防止字体继承于body,全局使用rem不会触发该逻辑
	if (doc.readyState === 'complete') {
		doc.body.style.fontSize = '16px';
	} else {
		doc.addEventListener(
			'DOMContentLoaded',
			function () {
				doc.body.style.fontSize = '16px';
			},
			false
		);
	}
})(1920, 1920);
