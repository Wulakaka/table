<template>
	<div>
		<div
			class="bs-cell-editor"
			:style="cellEditorStyle"
			:class="{
				else: editor.editType != 'text' && editor.editType != 'number',
			}"
			@dblclick="setEditing"
			:title="editContent || editor.curEditorCoverValue"
			v-show="editor.editorShow"
		>
			<textarea
				ref="clipboard"
				class="bs-clipboard"
				@paste="clipboardToContent"
			>
			</textarea>
			<div style="flex: 1" v-show="editor.editing">
				<textarea
					v-if="editor.editType == 'text'"
					ref="text"
					v-model="editContent"
				>
				</textarea>
				<el-date-picker
					size="mini"
					v-model="editContent"
					value-format="yyyy-MM-dd"
					type="date"
					:style="{
						width: `${
							editor.curEditorWidth > 2.8 ? editor.curEditorWidth : 2.8
						}rem`,
					}"
					@blur="resetEditor"
					v-else-if="editor.editType === 'date'"
					ref="date"
				>
				</el-date-picker>
				<el-date-picker
					size="mini"
					v-model="editContent"
					value-format="yyyy-MM"
					type="month"
					:style="{
						width: `${
							editor.curEditorWidth > 2.8 ? editor.curEditorWidth : 2.8
						}rem`,
					}"
					@blur="resetEditor"
					v-else-if="editor.editType === 'month'"
					ref="month"
				>
				</el-date-picker>
				<el-select
					size="mini"
					:automatic-dropdown="true"
					v-model="editContent"
					:style="{ width: `${editor.curEditorWidth}rem` }"
					v-else-if="editor.editType === 'select'"
					placeholder="请选择"
					clearable
					ref="select"
				>
					<el-option
						v-for="item in editor.options"
						:value="item.value"
						:key="item.value"
						:label="item.label"
					>
					</el-option>
				</el-select>
				<textarea
					v-model="editContent"
					v-else-if="editor.editType === 'number'"
					ref="number"
					@input="limitNumber(editContent)"
					@paste="limitNumber(editContent)"
				>
				</textarea>
			</div>
		</div>
		<div
			ref="autofillHandler"
			class="bs-autofill-handler"
			:style="autofillHandlerStyle"
			@mousedown="handleAutofill"
			v-show="!editor.editing && editor.editorShow"
		></div>
		<div class="bs-cover-area selected" :style="selectedStyle"></div>
		<div class="bs-cover-area selected fixed" :style="fixedSelectedStyle"></div>
		<div class="bs-cover-area autofill" :style="autofillStyle"></div>
		<div class="bs-cover-area autofill fixed" :style="fixedAutofillStyle"></div>
	</div>
</template>

<script>
import { DatePicker, Select, Option } from 'element-ui';

export default {
	props: {
		columnsWidth: {
			type: Array,
			default: () => [],
		},
		fixedCount: [String, Number],
		store: {
			required: true,
		},
	},
	components: {
		'el-date-picker': DatePicker,
		'el-select': Select,
		'el-option': Option,
	},
	data() {
		return {
			editContent: '',
		};
	},
	computed: {
		// 编辑框
		cellEditorStyle() {
			let left;
			if (this.editor.editorIsFixed) {
				left = this.columnsWidth
					.filter((item, index) => index < this.editor.editorXIndex)
					.reduce((sum, item) => sum + item, 0);
			} else {
				left =
					this.columnsWidth
						.filter((item, index) => index < this.editor.editorXIndex)
						.reduce((sum, item) => sum + item, 0) -
					this.store.states.tableBodyLeft;
			}
			return {
				top: `${
					this.editor.editorYIndex * this.rowHeight -
					this.store.states.tableBodyTop +
					this.theaderHeight
				}rem`,
				left: `${left}rem`,
				width: `${this.columnsWidth[this.editor.editorXIndex]}rem`,
				height: `${this.rowHeight}rem`,
				'z-index': this.editor.editorIsFixed ? 4 : 1,
			};
		},
		// 自动填充按钮
		autofillHandlerStyle() {
			let left;
			if (
				this.editor.editorIsFixed &&
				this.selector.selectedYArr[0] === this.selector.selectedYArr[1]
			) {
				left = this.columnsWidth
					.filter((item, index) => index < this.autofill.autofillXIndex)
					.reduce((sum, item) => sum + item, 0);
			} else {
				left =
					this.columnsWidth
						.filter((item, index) => index < this.autofill.autofillXIndex)
						.reduce((sum, item) => sum + item, 0) -
					this.store.states.tableBodyLeft;
			}
			left = left + this.columnsWidth[this.autofill.autofillXIndex] - 0.1;
			return {
				top: `${
					(this.autofill.autofillYIndex + 1) * this.rowHeight -
					0.08 -
					this.store.states.tableBodyTop +
					this.theaderHeight
				}rem`,
				left: `${left}rem`,
				'z-index': this.fixedCount > this.autofill.autofillXIndex ? 4 : 1,
			};
		},
		// 选中区域
		selectedStyle() {
			return {
				top: `${
					this.selector.selectedYArr[0] * this.rowHeight -
					this.store.states.tableBodyTop +
					this.theaderHeight
				}rem`,
				left: `${
					this.columnsWidth
						.filter((item, index) => index < this.selector.selectedXArr[0])
						.reduce((sum, item) => sum + item, 0) -
					this.store.states.tableBodyLeft
				}rem`,
				width: `${this.columnsWidth
					.filter(
						(item, index) =>
							index <= this.selector.selectedXArr[1] &&
							index >= this.selector.selectedXArr[0]
					)
					.reduce((sum, item) => sum + item, 0)}rem`,
				height: `${
					(this.selector.selectedYArr[1] - this.selector.selectedYArr[0] + 1) *
					this.rowHeight
				}rem`,
			};
		},
		// 固定列选中区域
		fixedSelectedStyle() {
			return {
				top: `${
					this.selector.selectedYArr[0] * this.rowHeight -
					this.store.states.tableBodyTop +
					this.theaderHeight
				}rem`,
				left: `${this.columnsWidth
					.filter((item, index) => index < this.selector.selectedXArr[0])
					.reduce((sum, item) => sum + item, 0)}rem`,
				width: `${this.columnsWidth
					.filter(
						(item, index) =>
							index <= this.selector.selectedXArr[1] &&
							index >= this.selector.selectedXArr[0] &&
							this.columns[index].fixed
					)
					.reduce((sum, item) => sum + item, 0)}rem`,
				height: `${
					(this.selector.selectedYArr[1] - this.selector.selectedYArr[0] + 1) *
					this.rowHeight
				}rem`,
			};
		},
		// 自动填充区域
		autofillStyle() {
			return {
				top: `${
					this.autofill.autofillYArr[0] * this.rowHeight -
					this.store.states.tableBodyTop +
					this.theaderHeight
				}rem`,
				left: `${
					this.columnsWidth
						.filter((item, index) => index < this.selector.selectedXArr[0])
						.reduce((sum, item) => sum + item, 0) -
					this.store.states.tableBodyLeft
				}rem`,
				width: `${this.columnsWidth
					.filter(
						(item, index) =>
							index <= this.selector.selectedXArr[1] &&
							index >= this.selector.selectedXArr[0]
					)
					.reduce((sum, item) => sum + item, 0)}rem`,
				height: `${
					this.autofill.autofillYArr.length > 0
						? (this.autofill.autofillYArr[1] -
								this.autofill.autofillYArr[0] +
								1) *
						  this.rowHeight
						: 0
				}rem`,
			};
		},
		// 固定列自动填充区域
		fixedAutofillStyle() {
			return {
				top: `${
					this.autofill.autofillYArr[0] * this.rowHeight -
					this.store.states.tableBodyTop +
					this.theaderHeight
				}rem`,
				left: `${this.columnsWidth
					.filter((item, index) => index < this.selector.selectedXArr[0])
					.reduce((sum, item) => sum + item, 0)}rem`,
				width: `${this.columnsWidth
					.filter(
						(item, index) =>
							index <= this.selector.selectedXArr[1] &&
							index >= this.selector.selectedXArr[0] &&
							this.columns[index].fixed
					)
					.reduce((sum, item) => sum + item, 0)}rem`,
				height: `${
					this.autofill.autofillYArr.length > 0
						? (this.autofill.autofillYArr[1] -
								this.autofill.autofillYArr[0] +
								1) *
						  this.rowHeight
						: 0
				}rem`,
			};
		},
		theaderHeight() {
			return this.store.states.theaderHeight;
		},
		rowHeight() {
			return this.store.states.rowHeight;
		},
		columns() {
			return this.store.states.columns;
		},
		editor() {
			return this.store.states.editor;
		},
		selector() {
			return this.store.states.selector;
		},
		autofill() {
			return this.store.states.autofill;
		},
	},
	watch: {
		'editor.editing': {
			handler(val) {
				if (!val) {
					if (this.columns[this.editor.editorXIndex].type === 'number') {
						this.limitNumber(this.editContent, true);
					}
					this.store.getEditorContent(this.editContent);
					this.editContent = '';
				}
			},
		},
	},
	methods: {
		// 限制输入数字
		limitNumber(val, format) {
			let nVal;
			try {
				nVal = val.replace(/[^\d.-]/g, '');
			} catch (err) {
				return;
			}
			if (/^0\d+/.test(nVal)) {
				nVal = nVal.replace(/0/, '');
			}
			if (format && isNaN(nVal)) {
				nVal = '';
			}
			this.editContent = nVal;
		},
		setEditing() {
			this.$parent.setEditing();
		},
		clipboardToContent(e) {
			this.$parent.clipboardToContent(e);
		},
		handleAutofill() {
			this.store.handleAutofill();
			window.addEventListener(
				'mousemove',
				this.$parent.multiSelectAdjustPostion
			);
		},
		resetEditor() {
			this.store.resetEditor();
		},
	},
};
</script>

<style lang="scss">
// 编辑框
.bs-cell-editor {
	position: absolute;
	top: 0.6rem;
	left: 0;
	display: flex;
	width: 4rem;
	border: 0.02rem solid #57a3f3;
	z-index: 4;
	overflow: hidden;
	&.else {
		overflow: visible;
		border: none;
	}
	textarea {
		width: 100%;
		height: 1rem;
		line-height: 0.4rem;
		outline: 0;
		resize: none;
		padding: 0.08rem 0.12rem;
		white-space: pre;
		border: none;
	}
}

.bs-autofill-handler {
	position: absolute;
	top: 1.12rem;
	left: 3.92rem;
	width: 0.16rem;
	height: 0.16rem;
	border: 0.02rem solid #57a3f3;
	background-color: #fff;
	cursor: crosshair;
	z-index: 5;
}

.bs-clipboard {
	width: 0 !important;
	height: 0 !important;
	flex: 0 0 !important;
	padding: 0 !important;
}

.bs-cover-area {
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
	&.selected {
		background-color: rgba(74, 149, 235, 0.2);
	}
	&.autofill {
		background-color: rgba(127, 127, 127, 0.2);
	}
	&.fixed {
		z-index: 3;
	}
}
</style>
