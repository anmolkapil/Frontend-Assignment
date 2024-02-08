import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import FieldLabel from './FieldLabel'
import { Checkbox } from '@/components/ui/checkbox'

import type { FormFieldProps } from '@/types/types'

const SwitchField: React.FC<FormFieldProps> = ({
	fieldConfig,
	form,
	parent,
}) => {
	return (
		<FormField
			control={form.control}
			name={
				fieldConfig.level > 0
					? `${parent}.${fieldConfig.jsonKey}`
					: fieldConfig.jsonKey
			}
			defaultValue={fieldConfig.validate.defaultValue}
			shouldUnregister={true}
			render={({ field }) => (
				<FormItem className='flex flex-row items-center space-x-3 space-y-0'>
					<FormControl>
						<Checkbox
							checked={field.value}
							onCheckedChange={field.onChange}
							disabled={fieldConfig.validate?.immutable}
							{...field}
						/>
					</FormControl>
					<FieldLabel fieldConfig={fieldConfig} />
					<FormDescription>{fieldConfig.description}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default SwitchField
