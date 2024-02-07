import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'

import { removeUnderscores } from '@/utils/utils'

const SwitchField = ({ fieldConfig, form, parent }) => {
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
							{...field}
						/>
					</FormControl>
					<FormLabel className='text-sm font-normal'>
						{removeUnderscores(fieldConfig.label)}
						{fieldConfig.validate.required && (
							<span className='text-red-400'> *</span>
						)}
					</FormLabel>
					<FormDescription>{fieldConfig.description}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default SwitchField
