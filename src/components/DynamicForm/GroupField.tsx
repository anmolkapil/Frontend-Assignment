import FieldRenderer from './FieldRenderer'
import { useEffect, useState } from 'react'

import { removeUnderscores } from '@/utils/utils'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const GroupField = ({ fieldConfig, form, globalShowAdvanced }) => {
	let showToggle = fieldConfig.subParameters.some(
		(f) => !f.validate.required && f.level > 0
	)

	const [groupToggle, setGroupToggle] = useState(false)

	useEffect(() => {
		if (globalShowAdvanced && showToggle) setGroupToggle(true)
		if (!showToggle) setGroupToggle(globalShowAdvanced)
	}, [globalShowAdvanced])

	return (
		<div>
			<Label>
				{removeUnderscores(fieldConfig.label)}
				{fieldConfig.validate.required && (
					<span className='text-red-400'> *</span>
				)}
			</Label>
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
