import InputField from './InputField'
import RadioField from './RadioField'
import SelectField from './SelectField'
import SwitchField from './SwitchField'
import GroupField from './GroupField'
import IgnoreField from './IgnoreField'

const fieldComponents = {
	Input: InputField,
	Select: SelectField,
	Radio: RadioField,
	Switch: SwitchField,
	Group: GroupField,
	Ignore: IgnoreField,
}

import clsx from 'clsx'

const FieldRenderer = ({
	fields,
	form,
	parent,
	globalShowAdvanced,
	groupToggle,
}) => {
	return (
		<>
			{fields
				.sort((a, b) => a.sort - b.sort)
				.map((field) => {
					// Handle Group type separately for recursive rendering
					// Dynamically select the component based on the field's uiType
					const FieldComponent = fieldComponents[field.uiType]
					if (!FieldComponent) {
						console.warn(`No component defined for type ${field.uiType}`)
						return null // Return null or a placeholder component for unsupported types
					}

					return (
						((field.level === 0 && globalShowAdvanced) ||
							groupToggle ||
							field.validate.required) && (
							<div
								key={field.jsonKey}
								className={clsx({
									'p-4 border rounded border-sky-100 bg-sky-100/50':
										field.level === 0,
								})}
							>
								<FieldComponent
									fieldConfig={field}
									form={form}
									parent={parent}
									globalShowAdvanced={globalShowAdvanced}
								/>
							</div>
						)
					)
				})}
		</>
	)
}

export default FieldRenderer
