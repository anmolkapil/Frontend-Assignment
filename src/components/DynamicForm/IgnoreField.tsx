import FieldRenderer from './FieldRenderer'

import type { FormFieldProps } from '@/types/types'

const IgnoreField: React.FC<FormFieldProps> = ({
	fieldConfig,
	form,
	parent,
	globalShowAdvanced,
}) => {
	if (!fieldConfig.subParameters || !fieldConfig.conditions) return

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
