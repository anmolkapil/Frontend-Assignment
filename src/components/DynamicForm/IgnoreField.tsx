import FieldRenderer from './FieldRenderer'

const IgnoreField = ({ fieldConfig, form, parent, globalShowAdvanced }) => {
	let isVisible = true
	const { jsonKey, op, value } = fieldConfig.conditions[0]
	switch (op) {
		case '==':
			if (form.watch(jsonKey) == value) isVisible = true
			else isVisible = false
			break
		default:
			isVisible = true
	}

	return (
		isVisible && (
			<FieldRenderer
				key={fieldConfig.jsonKey}
				fields={fieldConfig.subParameters}
				form={form}
				parent={parent}
				globalShowAdvanced={globalShowAdvanced}
				groupToggle={false}
			/>
		)
	)
}

export default IgnoreField
