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

import type { UseFormReturn } from 'react-hook-form'
import type { UIConfiguration } from '@/types/types'

interface FieldRendererProps {
	fields: UIConfiguration | null
	form: UseFormReturn<any>
	parent: string | null
	globalShowAdvanced: boolean
	groupToggle: boolean
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
	fields,
	form,
	parent,
	globalShowAdvanced,
	groupToggle,
}) => {
	return (
		<>
			{fields
				?.sort((a, b) => a.sort - b.sort)
				.map((field) => {
					// Dynamically select the component based on the field's uiType
					const FieldComponent = fieldComponents[field.uiType]
					if (!FieldComponent) {
						console.warn(`No component defined for type ${field.uiType}`)
						return null // Return null or a placeholder component for unsupported types
					}

					return (
						<div
							key={field.jsonKey}
							className={clsx({
								'p-4 border rounded border-sky-100 bg-sky-100/50':
									field.level === 0,
								hidden:
									(field.level > 0 || !globalShowAdvanced) &&
									!groupToggle &&
									!field.validate.required,
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
				})}
		</>
	)
}

export default FieldRenderer
