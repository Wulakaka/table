<template>
	<div
		class="bs-dropdown-wrapper"
		:class="{ active: parseInt(dropdown.index) >= 0 }"
		:style="{
			top: `${
				$parent.$refs.wrapper.offsetTop / rem + store.states.theaderHeight
			}rem`,
			left: left,
		}"
		ref="dropdown"
		v-clickoutside="openDropdown"
	>
		<div class="bs-sort">
			<span
				:class="{ active: dropdown.sort == 'ascending' }"
				@click="sort('ascending')"
				>升序</span
			>
			<span
				:class="{ active: dropdown.sort == 'descending' }"
				@click="sort('descending')"
				>降序</span
			>
		</div>
		<div class="bs-filter">
			<div class="title" v-if="false">名称<span>（计数）</span></div>
			<ul class="content">
				<li v-for="(item, key) in dropdown.list" :key="key">
					<el-checkbox
						size="mini"
						v-model="item.checked"
						style="margin-right: 0.04rem"
					>
					</el-checkbox>
					<p>
						<span :title="key">{{ key }}</span>
						<i v-if="false">（{{ item.count }}）</i>
					</p>
				</li>
			</ul>
			<div class="btns">
				<span @click="openDropdown">取消</span>
				<span @click="handleFilter">确认</span>
			</div>
		</div>
	</div>
</template>

<script>
import { Checkbox } from 'element-ui';
import clickoutside from '../directives/clickoutside';

export default {
	directives: { clickoutside },
	props: {
		columnsWidth: {
			type: Array,
			default: () => [],
		},
		fixedCount: [String, Number],
		value: {
			type: Object,
			default: () => ({}),
		},
		store: {
			required: true,
		},
	},
	components: {
		'el-checkbox': Checkbox,
	},
	data() {
		return {
			left: 0,
			rem: window.tslSmartUIRem,
		};
	},
	computed: {
		dropdown() {
			return this.store.states.dropdown;
		},
	},
	watch: {
		'dropdown.index': {
			handler(val) {
				if (!val) return;
				let left;
				if (this.dropdown.index < this.fixedCount) {
					left =
						this.store.states.tableBodyLeft +
						this.columnsWidth
							.filter((item, index) => index <= this.dropdown.index)
							.reduce((sum, item) => sum + item, 0);
				} else {
					left = this.columnsWidth
						.filter((item, index) => index <= this.dropdown.index)
						.reduce((sum, item) => sum + item, 0);
				}
				this.$nextTick(() => {
					left =
						left -
						this.$refs.dropdown.offsetWidth / window.tslSmartUIRem +
						this.$parent.$refs.wrapper.offsetLeft / window.tslSmartUIRem -
						this.store.states.tableBodyLeft;
					if (
						left <
						this.$parent.$refs.wrapper.offsetLeft / window.tslSmartUIRem
					) {
						left = this.$parent.$refs.wrapper.offsetLeft / window.tslSmartUIRem;
					}
					this.left = `${left}rem`;
				});
			},
		},
	},
	methods: {
		openDropdown() {
			this.store.openDropdown();
		},
		sort(type) {
			this.store.sort(type);
		},
		handleFilter() {
			let haveChecked = false;
			Object.keys(this.dropdown.list).forEach((key) => {
				if (this.dropdown.list[key].checked) {
					haveChecked = true;
				}
			});
			if (!haveChecked) {
				return this.resetFilter();
			}
			this.store.handleFilter();
			this.$parent.handleResize();
		},
		resetFilter() {
			this.store.resetFilter();
			this.$parent.handleResize();
		},
	},
};
</script>

<style lang="scss">
.bs-dropdown-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 30;
	min-width: 6.4rem;
	opacity: 0;
	transform: rotateX(90deg);
	transform-origin: top center;
	transition: transform 0.3s;
	border-radius: 0.04rem;
	background: rgba(0, 0, 0, 0.3);
	border: 0.02rem solid rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(1.08rem);
	overflow-y: auto;

	&.active {
		opacity: 1;
		transform: rotateX(0);
	}
}

.bs-sort {
	margin-left: 0.48rem;
	margin-top: 0.58rem;
	display: flex;
	font-family: 'Microsoft YaHei';
	font-style: normal;
	font-weight: 400;
	font-size: 0.28rem;
	span {
		display: flex;
		align-items: center;
		cursor: pointer;
		padding: 0.08rem 0.16rem;
		transition: all 0.3s;
		&.active {
			color: #bdffff;
		}
		&:hover {
			color: #bdffff;
		}
		&:before {
			content: '';
			display: inline-block;
			width: 0.28rem;
			height: 0.28rem;
			margin-right: 0.04rem;
		}
		&:first-child {
			&:before {
				background: url('../assets/ascending.png') center center no-repeat;
				background-size: contain;
			}
		}
		&:last-child {
			&:before {
				background: url('../assets/descending.png') center center no-repeat;
				background-size: contain;
			}
		}
	}
}

.bs-filter {
	padding: 0.08rem;
	.title {
		font-size: 0.26rem;
		padding: 0.04rem 0.12rem;
	}
	.content {
		margin-top: 0.5rem;
		margin-left: 0.26rem;
		margin-bottom: 0.08rem;
		overflow-y: auto;
		max-height: 6rem;

		li {
			width: 5.9rem;
			height: 0.8rem;
			display: flex;
			align-items: center;
			padding: 0.24rem;
			&:hover {
				color: #bdffff;
				background: rgba(255, 255, 255, 0.1);
				border-radius: 0.04rem;
			}
		}
		p {
			display: flex;
			margin-left: 0.24rem;
			span {
				display: inline-block;
				max-width: 4rem;
				font-family: 'Microsoft YaHei';
				font-style: normal;
				font-weight: 400;
				font-size: 0.28rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	.btns {
		margin-top: 0.52rem;
		margin-right: 0.48rem;
		margin-bottom: 0.56rem;
		font-size: 0.26rem;
		text-align: end;
		font-family: 'Microsoft YaHei';
		font-style: normal;
		font-weight: 400;
		span {
			display: inline-block;
			cursor: pointer;
			transition: all 0.5s;
			padding: 0.14rem 0.3rem;
			border-radius: 0.04rem;
			&:hover {
				color: #bdffff;
			}
			&:first-child {
				color: #7dffff;
				border: 1px solid #7dffff;
			}
			&:last-child {
				background: linear-gradient(271.51deg, #7dffff 1.97%, #9affdb 99.89%);
				color: #333333;
				margin-left: 0.32rem;
			}
		}
	}
}
</style>
