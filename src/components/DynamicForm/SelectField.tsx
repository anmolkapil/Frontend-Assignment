import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import { removeUnderscores } from '@/utils/utils'

const SelectField = ({ fieldConfig, form, parent, showAdvanced }) => (
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
			<FormItem className='grid grid-cols-2 items-center'>
				<FormLabel>
					{removeUnderscores(fieldConfig.label)}
					{fieldConfig.validate.required && (
						<span className='text-red-400'> *</span>
					)}
				</FormLabel>
				<Select
					onValueChange={field.onChange}
					defaultValue={field.value}
					{...field}
				>
					<FormControl>
						<SelectTrigger className='bg-sky-100 border-blue-200 focus:ring-indigo-200'>
							<SelectValue />
						</SelectTrigger>
					</FormControl>
					<SelectContent>
						{fieldConfig.validate.options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.value}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FormMessage />
			</FormItem>
		)}
	/>
)

export default SelectField
