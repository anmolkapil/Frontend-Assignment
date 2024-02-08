import FieldRenderer from './FieldRenderer'
import { useEffect, useState } from 'react'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import FieldLabel from './FieldLabel'

import { FormFieldProps } from '@/types/types'

const GroupField: React.FC<FormFieldProps> = ({
	fieldConfig,
	form,
	globalShowAdvanced,
}) => {
	if (!fieldConfig.subParameters) return

	let showToggle = fieldConfig.subParameters?.some(
		(f) => !f.validate.required && f.level > 0
	)

	const [groupToggle, setGroupToggle] = useState(false)

	useEffect(() => {
		if (globalShowAdvanced && showToggle) setGroupToggle(true)
		if (!showToggle) setGroupToggle(globalShowAdvanced)
	}, [globalShowAdvanced])

	return (
		<div>
			<FieldLabel fieldConfig={fieldConfig} />
			<Separator className='my-3' />
			<div className='space-y-4'>
				<FieldRenderer
					fields={fieldConfig.subParameters}
					form={form}
					parent={fieldConfig.jsonKey}
					globalShowAdvanced={globalShowAdvanced}
					groupToggle={groupToggle}
				/>
				{showToggle && (
					<div className='flex items-center space-x-2'>
						<Label htmlFor={fieldConfig.jsonKey}>Show advanced fields</Label>
						<Switch
							id={fieldConfig.jsonKey}
							checked={groupToggle}
							onCheckedChange={(e) => setGroupToggle(e)}
							className='data-[state=checked]:bg-indigo-600'
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default GroupField
