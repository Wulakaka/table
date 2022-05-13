<template>
	<div
		class="bs-theader"
		:class="{
			fixed,
		}"
	>
		<div
			ref="tr"
			class="bs-tr"
			:style="{
				width: `${store.states.tableWidth}rem`,
				height: `${store.states.theaderHeight}rem`,
				transform: `translate3d(
          -${fixed ? 0 : store.states.tableBodyLeft}rem,
          0,
          0
        )`,
			}"
		>
			<div
				v-for="(th, index) in columns"
				:key="index"
				class="bs-th"
				:style="{
					width: `${columnsWidth[index]}rem`,
					'justify-content': th.align,
				}"
				:class="{
					selection: th.type === 'selection',
				}"
				:title="th.title"
				v-show="th.fixed || allShow"
			>
				<el-checkbox
					v-if="th.type === 'selection'"
					size="mini"
					v-model="checkedAll"
					@change="selectAll"
				></el-checkbox>
				<p
					class="bs-title"
					:class="{ active: isActive(columnsStatusList[index]) }"
					v-else
				>
					<span v-if="showIcon" class="icon" :class="iconClass(th.type)"></span>
					{{ th.title }}
				</p>
				<div
					v-if="th.type !== 'selection'"
					class="dropdown"
					:class="{ active: dropdown.index === index }"
					:style="{
						top: `${(store.states.theaderHeight - 0.28) / 2}rem`,
					}"
				>
					<i v-if="th.action" @click.stop="openDropdown(index)"></i>
				</div>
				<div
					v-if="th.type !== 'selection'"
					class="handler"
					@mousedown="handlerDown(index)"
				></div>
			</div>
		</div>
	</div>
</template>

<script>
import { Checkbox } from 'element-ui';

export default {
	components: {
		'el-checkbox': Checkbox,
	},
	props: {
		fixed: {
			type: Boolean,
			default: false,
		},
		showIcon: {
			type: Boolean,
			default: false,
		},
		allShow: Boolean,
		columnsWidth: {
			type: Array,
			default: () => [],
		},
		fixedCount: [String, Number],
		store: {
			required: true,
		},
	},
	data() {
		return {
			checkedAll: false,
			adjustWidthValue: 1.6,
			adjustWidthFlag: false,
			adjustWidthIndex: 0,
			adjustWidthType: '',
			mouseX: 0,
		};
	},
	computed: {
		columns() {
			return this.store.states.columns;
		},
		columnsStatusList() {
			return this.store.states.columnsStatusList;
		},
		dropdown() {
			return this.store.states.dropdown;
		},
		filters() {
			return this.store.states.filters;
		},
	},
	methods: {
		selectAll() {
			this.$parent.selectAll();
		},
		handlerDown(index) {
			this.adjustWidthFlag = true;
			this.adjustWidthIndex = index;
			this.store.states.adjustLineShow = true;
			window.addEventListener('mousemove', this.handlerMove);
			window.addEventListener('mouseup', this.handlerUp);
		},
		handlerMove(e) {
			if (this.adjustWidthFlag) {
				e = e || window.event;
				let width;
				if (this.fixedCount >= this.adjustWidthIndex + 1) {
					width =
						(e.pageX -
							this.$parent.excelPos.left -
							this.$refs.tr.children[this.adjustWidthIndex].offsetLeft) /
						window.tslSmartUIRem;
				} else {
					width =
						e.pageX / window.tslSmartUIRem +
						this.store.states.tableBodyLeft -
						this.$parent.excelPos.left / window.tslSmartUIRem -
						this.$refs.tr.children[this.adjustWidthIndex].offsetLeft /
							window.tslSmartUIRem;
				}
				if (width >= 1.6) {
					this.adjustWidthValue = width;
					this.store.states.adjustLineLeft =
						(e.pageX - this.$parent.excelPos.left) / window.tslSmartUIRem;
				}
			}
		},
		handlerUp() {
			this.$parent.adjustWidth(this.adjustWidthIndex, this.adjustWidthValue);
			this.adjustWidthFlag = false;
			this.store.states.adjustLineShow = false;
			window.removeEventListener('mousemove', this.handlerMove);
			window.removeEventListener('mouseup', this.handlerUp);
		},
		openDropdown(i) {
			this.store.openDropdown(i);
		},
		isActive(th) {
			if (!th) return false;
			// eslint-disable-next-line no-prototype-builtins
			if (this.filters.hasOwnProperty(th.key)) {
				return true;
			}
			if (th.sort) {
				return true;
			}
			return false;
		},
		iconClass(type) {
			let className;
			switch (type) {
				case 'number':
					className = 'number';
					break;
				case 'date':
					className = 'date';
					break;
				case 'month':
					className = 'date';
					break;
				case 'select':
					className = 'select';
					break;
				default:
					className = 'text';
			}
			return {
				[className]: true,
			};
		},
	},
};
</script>

<style lang="scss">
.bs-theader {
	position: relative;
	font-size: 0.24rem;
	user-select: none;
	overflow: hidden;
	z-index: 5;
	&.fixed {
		position: absolute;
		top: 0;
		left: 0;
		background-color: #000 !important;
		z-index: 6;
	}
	.bs-tr {
		display: flex;
		background-color: rgba(0, 0, 0, 0.4);
	}
	.bs-th {
		position: relative;
		display: flex;
		align-items: center;
		&.selection {
			justify-content: center;
		}
	}
	.dropdown {
		margin-left: 0.2rem;
		display: inline-block;
		i {
			display: inline-block;
			width: 0.2rem;
			height: 0.2rem;
			background: url('../assets/dropdown.png') center center no-repeat;
			cursor: pointer;
			transition: all 0.3s;
		}
		&.active {
			i {
				transform: rotateZ(180deg);
			}
		}
	}
	.handler {
		position: absolute;
		z-index: 1;
		top: 0;
		right: -0.16rem;
		width: 0.32rem;
		height: 0.6rem;
		cursor: col-resize;
		text-align: center;
	}
	.active {
		color: #2d8cf0;
	}

	.bs-title {
		height: 0.6rem;
		line-height: 0.6rem;
		text-indent: 0.08rem;
		font-family: 'Microsoft YaHei';
		font-style: normal;
		font-weight: 700;
		font-size: 0.32rem;
		color: #cccccc;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.icon {
		display: inline-block;
		width: 0.28rem;
		height: 0.28rem;
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
		vertical-align: text-bottom;
		margin-bottom: 0.02rem;
		&.text {
			background-image: url('../assets/text.png');
		}
		&.select {
			background-image: url('../assets/select.png');
		}
		&.date {
			background-image: url('../assets/date.png');
		}
		&.number {
			background-image: url('../assets/number.png');
		}
	}
}
</style>
