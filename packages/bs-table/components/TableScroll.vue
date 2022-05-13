<template>
	<div class="bs-scroll-wrap" :class="barType">
		<div class="bs-scroll-box" @mousedown="handleDown" :style="boxStyle"></div>
	</div>
</template>

<script>
const tableLength = {
	x: 'tableWidth',
	y: 'tableHeight',
};
const mainLength = {
	x: 'mainWidth',
	y: 'mainHeight',
};
const pagePos = {
	x: 'pageX',
	y: 'pageY',
};
const barLength = {
	x: 'xWidth',
	y: 'yHeight',
};
const barPos = {
	x: 'posX',
	y: 'posY',
};
const scrollDir = {
	x: 'tableBodyLeft',
	y: 'tableBodyTop',
};

export default {
	props: {
		store: {
			required: true,
		},
		barType: {
			type: String,
		},
	},
	data() {
		return {
			canScroll: false,
			oriMousePos: 0,
		};
	},
	computed: {
		scrollbar() {
			return this.store.states.scrollbar;
		},
		boxStyle() {
			const length = `${this.scrollbar[barLength[this.barType]]}rem`;
			if (this.barType === 'x') {
				return {
					width: length,
					transform: `translateX(${this.scrollbar[barPos[this.barType]]}rem)`,
				};
			}
			if (this.barType === 'y') {
				return {
					height: length,
					transform: `translateY(${this.scrollbar[barPos[this.barType]]}rem)`,
				};
			}
			return {};
		},
	},
	methods: {
		handleDown(e) {
			this.canScroll = true;
			this.oriMousePos =
				e[pagePos[this.barType]] / window.tslSmartUIRem -
				this.scrollbar[barPos[this.barType]];
			window.addEventListener('mouseup', this.handleUp);
			window.addEventListener('mousemove', this.handleMove);
		},
		handleMove(e) {
			const { states } = this.store;
			const { barType } = this;
			if (this.canScroll) {
				const scrollBarPos =
					e[pagePos[barType]] / window.tslSmartUIRem - this.oriMousePos;
				if (scrollBarPos <= 0) {
					states.scrollbar[barPos[barType]] = 0;
				} else if (
					scrollBarPos >=
					states[mainLength[barType]] - states.scrollbar[barLength[barType]]
				) {
					states.scrollbar[barPos[barType]] =
						states[mainLength[barType]] - states.scrollbar[barLength[barType]];
				} else {
					states.scrollbar[barPos[barType]] = scrollBarPos;
				}
				states[scrollDir[barType]] =
					(this.scrollbar[barPos[barType]] /
						(states[mainLength[barType]] -
							this.scrollbar[barLength[barType]])) *
					(states[tableLength[barType]] - states[mainLength[barType]]);
			}
		},
		handleUp() {
			this.canScroll = false;
			window.removeEventListener('mouseup', this.handleUp);
			window.removeEventListener('mousemove', this.handleMove);
		},
	},
};
</script>

<style lang="scss">
.bs-scroll-wrap {
	position: absolute;
	z-index: 20;
	background-color: transparent;
	&.x {
		bottom: 0;
		left: 0;
		width: 100%;
		height: 0.08rem;
		.bs-scroll-box {
			height: 0.08rem;
		}
	}
	&.y {
		top: 0;
		right: 0;
		width: 0.08rem;
		height: 100%;
		.bs-scroll-box {
			width: 0.08rem;
		}
	}
}

.bs-scroll-box {
	background: #eeeeee;
	opacity: 0.2;
	border-radius: 0.12rem;
	transition: all 0.3s;
	user-select: none;
	&:hover {
		background-color: #80848f;
	}
}
</style>
